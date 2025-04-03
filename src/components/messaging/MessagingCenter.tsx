
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Send, User, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConversationList from './ConversationList';
import MessageThread from './MessageThread';
import { 
  getConversations,
  getMessages,
  sendMessage,
  markConversationAsRead
} from '@/utils/firebase/messagingService';
import { Conversation, Message } from '@/types/messaging';

const MessagingCenter: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    const loadConversations = async () => {
      setLoading(true);
      try {
        const userConversations = await getConversations(currentUser.uid);
        setConversations(userConversations);
      } catch (error) {
        console.error('Error loading conversations:', error);
        toast({
          title: "Error",
          description: "Could not load your conversations. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [currentUser, navigate, toast]);

  useEffect(() => {
    if (selectedConversation) {
      const loadMessages = async () => {
        setLoading(true);
        try {
          const conversationMessages = await getMessages(selectedConversation.id);
          setMessages(conversationMessages);
          
          // Mark as read if there are unread messages
          if (selectedConversation.unreadCount > 0 && selectedConversation.lastMessageSenderId !== currentUser?.uid) {
            await markConversationAsRead(selectedConversation.id, currentUser?.uid || '');
            
            // Update the conversation in the list
            setConversations(prevConversations => 
              prevConversations.map(conv => 
                conv.id === selectedConversation.id 
                  ? { ...conv, unreadCount: 0 } 
                  : conv
              )
            );
          }
        } catch (error) {
          console.error('Error loading messages:', error);
          toast({
            title: "Error",
            description: "Could not load messages. Please try again later.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      };

      loadMessages();
    }
  }, [selectedConversation, currentUser, toast]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !currentUser) return;

    try {
      const sentMessage = await sendMessage(
        selectedConversation.id,
        currentUser.uid,
        newMessage
      );
      
      // Add the new message to the thread
      setMessages(prev => [...prev, sentMessage]);
      
      // Update the conversation preview
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation.id 
            ? { 
                ...conv, 
                lastMessage: newMessage,
                lastMessageTimestamp: new Date(),
                lastMessageSenderId: currentUser.uid
              } 
            : conv
        )
      );
      
      // Clear the input
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredConversations = conversations.filter(conversation => 
    conversation.otherUserName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (conversation.lastMessage && conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (!currentUser) {
    return (
      <Card className="w-full max-w-4xl mx-auto my-8">
        <CardContent className="p-6">
          <div className="text-center">
            <MessageSquare className="h-12 w-12 mx-auto text-bookxchange-primary mb-4" />
            <h2 className="text-xl font-semibold mb-2">Messaging Center</h2>
            <p className="mb-4">Please log in to access your messages.</p>
            <Button onClick={() => navigate('/login')}>
              Log In
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-6xl mx-auto my-8 shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-bookxchange-primary" />
          Messaging Center
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="messages" className="w-full">
          <div className="border-b px-6 py-2">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="messages" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 h-[600px]">
              <div className="border-r">
                <div className="p-3 border-b">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <ConversationList
                  conversations={filteredConversations}
                  selectedConversation={selectedConversation}
                  onSelectConversation={setSelectedConversation}
                  currentUserId={currentUser.uid}
                  loading={loading}
                />
              </div>
              
              <div className="col-span-2 flex flex-col h-full">
                {selectedConversation ? (
                  <>
                    <div className="p-3 border-b flex items-center">
                      <div className="h-8 w-8 rounded-full bg-bookxchange-light flex items-center justify-center mr-3">
                        <User className="h-4 w-4" />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedConversation.otherUserName}</h3>
                        <p className="text-xs text-muted-foreground">
                          About: {selectedConversation.bookTitle || "General conversation"}
                        </p>
                      </div>
                    </div>
                    
                    <MessageThread
                      messages={messages}
                      currentUserId={currentUser.uid}
                      loading={loading}
                    />
                    
                    <form onSubmit={handleSendMessage} className="mt-auto p-3 border-t">
                      <div className="flex">
                        <Input
                          placeholder="Type a message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="flex-grow"
                        />
                        <Button type="submit" className="ml-2 bg-bookxchange-primary hover:bg-bookxchange-primary/90">
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center p-6">
                      <MessageSquare className="h-12 w-12 mx-auto text-bookxchange-primary/30 mb-4" />
                      <h3 className="font-medium text-lg mb-2">No conversation selected</h3>
                      <p className="text-muted-foreground">
                        Select a conversation from the list to view messages
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0 p-6">
            <div className="text-center p-6">
              <h3 className="font-medium text-lg mb-2">Notifications</h3>
              <p className="text-muted-foreground mb-4">
                You'll see notifications about your listings, purchases, and account here.
              </p>
              <Button variant="outline" className="mx-auto">
                View All Notifications
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MessagingCenter;
