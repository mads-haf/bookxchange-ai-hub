
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  bookId?: string;
  bookTitle?: string;
  lastMessage?: string;
  lastMessageTimestamp?: Date;
  lastMessageSenderId?: string;
  lastMessageRead?: boolean;
  unreadCount: number;
  createdAt: Date;
  // Derived fields for UI
  otherUserId: string;
  otherUserName: string;
}
