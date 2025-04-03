
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  getDoc,
  doc,
  addDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  onSnapshot,
  writeBatch,
} from 'firebase/firestore';
import { db } from './config';
import { Conversation, Message } from '@/types/messaging';

// Get all conversations for a user
export const getConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    const q = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', userId),
      orderBy('lastMessageTimestamp', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const conversations: Conversation[] = [];
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const otherUserId = data.participants.find((id: string) => id !== userId) || '';
      
      // Get other user's name
      let otherUserName = 'Unknown User';
      try {
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        if (userDoc.exists()) {
          otherUserName = userDoc.data().displayName || userDoc.data().email || 'Unknown User';
        }
      } catch (error) {
        console.error('Error fetching other user data:', error);
      }
      
      conversations.push({
        id: docSnapshot.id,
        participants: data.participants,
        bookId: data.bookId,
        bookTitle: data.bookTitle,
        lastMessage: data.lastMessage,
        lastMessageTimestamp: data.lastMessageTimestamp?.toDate(),
        lastMessageSenderId: data.lastMessageSenderId,
        lastMessageRead: data.lastMessageRead,
        unreadCount: data.unreadCount?.[userId] || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        otherUserId,
        otherUserName
      });
    }
    
    return conversations;
  } catch (error) {
    console.error('Error getting conversations:', error);
    throw new Error('Failed to fetch conversations');
  }
};

// Get messages for a specific conversation
export const getMessages = async (conversationId: string): Promise<Message[]> => {
  try {
    const q = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      orderBy('timestamp', 'asc')
    );
    
    const querySnapshot = await getDocs(q);
    const messages: Message[] = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        conversationId: data.conversationId,
        senderId: data.senderId,
        content: data.content,
        timestamp: data.timestamp.toDate(),
        read: data.read
      };
    });
    
    return messages;
  } catch (error) {
    console.error('Error getting messages:', error);
    throw new Error('Failed to fetch messages');
  }
};

// Send a new message
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message> => {
  try {
    // Get the conversation to update unread count for recipient
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationDoc = await getDoc(conversationRef);
    
    if (!conversationDoc.exists()) {
      throw new Error('Conversation not found');
    }
    
    const conversationData = conversationDoc.data();
    const recipientId = conversationData.participants.find((id: string) => id !== senderId);
    
    // Create new message
    const messageData = {
      conversationId,
      senderId,
      content,
      timestamp: Timestamp.now(),
      read: false
    };
    
    const messageRef = await addDoc(collection(db, 'messages'), messageData);
    
    // Update conversation with last message data
    const unreadCount = { ...conversationData.unreadCount } || {};
    unreadCount[recipientId] = (unreadCount[recipientId] || 0) + 1;
    
    await updateDoc(conversationRef, {
      lastMessage: content,
      lastMessageTimestamp: Timestamp.now(),
      lastMessageSenderId: senderId,
      lastMessageRead: false,
      unreadCount
    });
    
    return {
      id: messageRef.id,
      ...messageData,
      timestamp: messageData.timestamp.toDate()
    };
  } catch (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }
};

// Mark a conversation as read
export const markConversationAsRead = async (
  conversationId: string, 
  userId: string
): Promise<void> => {
  try {
    const conversationRef = doc(db, 'conversations', conversationId);
    const conversationDoc = await getDoc(conversationRef);
    
    if (!conversationDoc.exists()) {
      throw new Error('Conversation not found');
    }
    
    // Get all unread messages in the conversation
    const unreadQuery = query(
      collection(db, 'messages'),
      where('conversationId', '==', conversationId),
      where('read', '==', false),
      where('senderId', '!=', userId)
    );
    
    const unreadMessages = await getDocs(unreadQuery);
    
    // Use batch to update all messages at once
    const batch = writeBatch(db);
    unreadMessages.docs.forEach(messageDoc => {
      batch.update(messageDoc.ref, { read: true });
    });
    
    // Update the conversation unread count
    const conversationData = conversationDoc.data();
    const unreadCount = { ...conversationData.unreadCount };
    unreadCount[userId] = 0;
    
    batch.update(conversationRef, {
      unreadCount,
      lastMessageRead: true
    });
    
    await batch.commit();
  } catch (error) {
    console.error('Error marking conversation as read:', error);
    throw new Error('Failed to mark conversation as read');
  }
};

// Start a new conversation
export const startConversation = async (
  currentUserId: string,
  otherUserId: string,
  bookId?: string,
  bookTitle?: string,
  initialMessage?: string
): Promise<{ conversationId: string, messageId?: string }> => {
  try {
    // Check if conversation already exists between these users
    const existingQuery = query(
      collection(db, 'conversations'),
      where('participants', 'array-contains', currentUserId)
    );
    
    const querySnapshot = await getDocs(existingQuery);
    let existingConversation = null;
    
    querySnapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.participants.includes(otherUserId) && (!bookId || data.bookId === bookId)) {
        existingConversation = { id: doc.id, ...data };
      }
    });
    
    // If conversation exists, return it (optionally with a new message)
    if (existingConversation) {
      if (initialMessage) {
        const message = await sendMessage(existingConversation.id, currentUserId, initialMessage);
        return { conversationId: existingConversation.id, messageId: message.id };
      }
      return { conversationId: existingConversation.id };
    }
    
    // Create a new conversation
    const conversationData = {
      participants: [currentUserId, otherUserId],
      bookId,
      bookTitle,
      createdAt: Timestamp.now(),
      lastMessageTimestamp: Timestamp.now(),
      unreadCount: {
        [otherUserId]: initialMessage ? 1 : 0
      }
    };
    
    const conversationRef = await addDoc(collection(db, 'conversations'), conversationData);
    
    // If there's an initial message, send it
    if (initialMessage) {
      const message = await sendMessage(conversationRef.id, currentUserId, initialMessage);
      return { conversationId: conversationRef.id, messageId: message.id };
    }
    
    return { conversationId: conversationRef.id };
  } catch (error) {
    console.error('Error starting conversation:', error);
    throw new Error('Failed to start conversation');
  }
};

// Get real-time conversation updates
export const subscribeToConversations = (
  userId: string, 
  callback: (conversations: Conversation[]) => void
) => {
  const q = query(
    collection(db, 'conversations'),
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTimestamp', 'desc')
  );
  
  return onSnapshot(q, async (querySnapshot) => {
    const conversations: Conversation[] = [];
    
    for (const docSnapshot of querySnapshot.docs) {
      const data = docSnapshot.data();
      const otherUserId = data.participants.find((id: string) => id !== userId) || '';
      
      // Get other user's name (this could be optimized in a production app)
      let otherUserName = 'Unknown User';
      try {
        const userDoc = await getDoc(doc(db, 'users', otherUserId));
        if (userDoc.exists()) {
          otherUserName = userDoc.data().displayName || userDoc.data().email || 'Unknown User';
        }
      } catch (error) {
        console.error('Error fetching other user data:', error);
      }
      
      conversations.push({
        id: docSnapshot.id,
        participants: data.participants,
        bookId: data.bookId,
        bookTitle: data.bookTitle,
        lastMessage: data.lastMessage,
        lastMessageTimestamp: data.lastMessageTimestamp?.toDate(),
        lastMessageSenderId: data.lastMessageSenderId,
        lastMessageRead: data.lastMessageRead,
        unreadCount: data.unreadCount?.[userId] || 0,
        createdAt: data.createdAt?.toDate() || new Date(),
        otherUserId,
        otherUserName
      });
    }
    
    callback(conversations);
  });
};
