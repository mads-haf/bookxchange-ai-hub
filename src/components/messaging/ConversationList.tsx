
import React from 'react';
import { User, Check, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Conversation } from '@/types/messaging';
import { Skeleton } from '@/components/ui/skeleton';

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  currentUserId: string;
  loading: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  selectedConversation,
  onSelectConversation,
  currentUserId,
  loading
}) => {
  if (loading) {
    return (
      <div className="overflow-y-auto h-[calc(600px-49px)]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-3 border-b flex items-center">
            <Skeleton className="h-10 w-10 rounded-full mr-3" />
            <div className="flex-grow">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-32" />
            </div>
            <Skeleton className="h-3 w-12 ml-2" />
          </div>
        ))}
      </div>
    );
  }

  if (conversations.length === 0) {
    return (
      <div className="flex items-center justify-center h-[calc(600px-49px)]">
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-2">No conversations yet</p>
          <p className="text-xs text-muted-foreground">
            Start chatting with sellers from book details pages
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(600px-49px)]">
      {conversations.map((conversation) => {
        const isUnread = conversation.unreadCount > 0 && conversation.lastMessageSenderId !== currentUserId;
        const isSelected = selectedConversation?.id === conversation.id;
        
        return (
          <div
            key={conversation.id}
            className={`p-3 border-b flex items-center cursor-pointer hover:bg-muted/50 ${
              isSelected ? 'bg-muted' : ''
            }`}
            onClick={() => onSelectConversation(conversation)}
          >
            <div className="h-10 w-10 rounded-full bg-bookxchange-light flex items-center justify-center mr-3 relative">
              <User className="h-5 w-5" />
              {isUnread && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-bookxchange-secondary rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {conversation.unreadCount}
                </span>
              )}
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h4 className={`font-medium truncate ${isUnread ? 'font-semibold' : ''}`}>
                  {conversation.otherUserName}
                </h4>
                <span className="text-xs text-muted-foreground flex items-center whitespace-nowrap ml-2">
                  {conversation.lastMessageTimestamp && formatDistanceToNow(conversation.lastMessageTimestamp, { addSuffix: false })}
                </span>
              </div>
              
              <div className="flex items-center">
                {conversation.lastMessageSenderId === currentUserId && (
                  <span className="mr-1 flex items-center text-muted-foreground">
                    {conversation.lastMessageRead ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                  </span>
                )}
                <p className={`text-sm truncate ${isUnread ? 'font-medium text-bookxchange-dark' : 'text-muted-foreground'}`}>
                  {conversation.lastMessageSenderId === currentUserId ? 'You: ' : ''}
                  {conversation.lastMessage || 'Start a conversation'}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationList;
