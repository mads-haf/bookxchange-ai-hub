
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { startConversation } from '@/utils/firebase/messagingService';

interface MessageButtonProps {
  sellerId: string;
  sellerName: string;
  bookId: string;
  bookTitle: string;
}

const MessageButton: React.FC<MessageButtonProps> = ({
  sellerId,
  sellerName,
  bookId,
  bookTitle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setMessage('');
    }
  };

  const handleSendMessage = async () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to message sellers",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (!message.trim()) {
      toast({
        title: "Empty Message",
        description: "Please write a message to the seller",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { conversationId } = await startConversation(
        currentUser.uid,
        sellerId,
        bookId,
        bookTitle,
        message
      );
      
      toast({
        title: "Message Sent",
        description: "Your message has been sent to the seller",
      });
      
      // Close the dialog and navigate to the conversation
      setIsOpen(false);
      navigate('/messages', { state: { conversationId } });
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to message sellers",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    setIsOpen(true);
  };

  // Don't show message button if the seller is the current user
  if (currentUser && sellerId === currentUser.uid) {
    return null;
  }

  return (
    <>
      <Button
        onClick={handleButtonClick}
        variant="outline"
        className="flex items-center gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        Message Seller
      </Button>
      
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Message to {sellerName}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-3">
              Regarding book: <span className="font-medium">{bookTitle}</span>
            </p>
            <Textarea
              placeholder="Write your message here..."
              className="min-h-[120px]"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading || !message.trim()}
              onClick={handleSendMessage}
              className="bg-bookxchange-primary hover:bg-bookxchange-primary/90"
            >
              {isLoading ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MessageButton;
