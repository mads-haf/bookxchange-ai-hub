
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, SendHorizontal, X, Minimize2, Maximize2 } from 'lucide-react';
import { getBotResponse } from '@/utils/ai/chatbotService';
import { useToast } from '@/components/ui/use-toast';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m BookWorm, your AI assistant. How can I help you find books today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getBotResponse(input);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting bot response:', error);
      toast({
        title: "Error",
        description: "Sorry, I couldn't process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button 
          onClick={toggleOpen}
          className="rounded-full w-16 h-16 bg-bookxchange-primary hover:bg-bookxchange-primary/90 shadow-lg"
        >
          <Brain className="h-8 w-8" />
        </Button>
      ) : (
        <Card className={`w-80 shadow-lg transition-all duration-300 ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
          <div className="bg-bookxchange-primary text-white p-3 flex items-center justify-between cursor-pointer" onClick={isMinimized ? toggleMinimize : undefined}>
            <div className="flex items-center">
              <Brain className="h-5 w-5 mr-2" />
              <h3 className="font-medium">BookWorm Assistant</h3>
            </div>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-bookxchange-primary/80" onClick={toggleMinimize}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-bookxchange-primary/80" onClick={toggleOpen}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <CardContent className="p-0 flex flex-col h-[calc(500px-56px)]">
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-bookxchange-primary text-white rounded-tr-none'
                          : 'bg-gray-100 text-bookxchange-dark rounded-tl-none'
                      }`}
                    >
                      <p>{message.content}</p>
                      <div 
                        className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}
                      >
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-bookxchange-dark rounded-lg rounded-tl-none p-3 max-w-[85%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-75"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-300 animate-pulse delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t">
                <div className="flex">
                  <Input
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="ml-2 bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                    disabled={isLoading}
                  >
                    <SendHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </CardContent>
          )}
        </Card>
      )}
    </div>
  );
};

export default AIChatbot;
