
import React, { useRef, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Message } from '@/types/messaging';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageThreadProps {
  messages: Message[];
  currentUserId: string;
  loading: boolean;
}

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  currentUserId,
  loading
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[80%] ${i % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
              <Skeleton className={`h-12 w-40 ${i % 2 === 0 ? 'rounded-tl-lg rounded-bl-lg rounded-tr-lg' : 'rounded-tr-lg rounded-br-lg rounded-tl-lg'}`} />
              <Skeleton className="h-2 w-16 mt-1 ml-auto" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-muted-foreground mb-1">No messages yet</p>
          <p className="text-xs text-muted-foreground">
            Start the conversation by sending a message below
          </p>
        </div>
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = message.timestamp.toDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="flex-grow p-4 overflow-y-auto bg-slate-50">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          <div className="flex justify-center my-3">
            <div className="bg-gray-200 rounded-full px-3 py-1 text-xs text-gray-600">
              {new Date().toDateString() === date ? 'Today' : date}
            </div>
          </div>
          
          {dateMessages.map((message) => {
            const isSentByCurrentUser = message.senderId === currentUserId;
            
            return (
              <div 
                key={message.id} 
                className={`flex mb-4 ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 ${
                    isSentByCurrentUser
                      ? 'bg-bookxchange-primary text-white rounded-tl-lg rounded-bl-lg rounded-tr-lg' 
                      : 'bg-white border rounded-tr-lg rounded-br-lg rounded-tl-lg'
                  }`}
                >
                  <p>{message.content}</p>
                  <div className={`text-xs mt-1 text-right ${isSentByCurrentUser ? 'text-white/70' : 'text-gray-500'}`}>
                    {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageThread;
