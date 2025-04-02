
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Brain, Sparkles, MessageSquare, BookOpen, History, BookUp, RefreshCw } from 'lucide-react';
import BookCard from '@/components/BookCard';

// Sample book data
const RECOMMENDED_BOOKS = [
  {
    id: '5',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 310,
    condition: 'Good',
    genre: 'Non-Fiction'
  },
  {
    id: '6',
    title: 'Dune',
    author: 'Frank Herbert',
    coverImage: 'https://images.unsplash.com/photo-1518744928471-f130df1f5100?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 270,
    condition: 'Good',
    genre: 'Science Fiction'
  },
  {
    id: '9',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    coverImage: 'https://images.unsplash.com/photo-1490633874781-1c63cc424610?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 240,
    condition: 'Like New',
    genre: 'Fiction'
  },
  {
    id: '14',
    title: 'Becoming',
    author: 'Michelle Obama',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 340,
    condition: 'Like New',
    genre: 'Biography'
  }
];

const BASED_ON_HISTORY = [
  {
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 220,
    condition: 'Good',
    genre: 'Mystery'
  },
  {
    id: '11',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 320,
    condition: 'Like New',
    genre: 'Fiction'
  },
  {
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 220,
    condition: 'Good',
    genre: 'Romance'
  },
  {
    id: '15',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 230,
    condition: 'Good',
    genre: 'Self-Help'
  }
];

const TRENDING_BOOKS = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 280,
    condition: 'Good',
    genre: 'Fiction'
  },
  {
    id: '2',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    coverImage: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 350,
    condition: 'Like New',
    genre: 'Non-Fiction'
  },
  {
    id: '10',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 290,
    condition: 'Good',
    genre: 'Self-Help'
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 190,
    condition: 'Acceptable',
    genre: 'Fiction'
  }
];

const CHAT_RESPONSES = [
  {
    id: 'response1',
    question: "I'm looking for a mystery book with a psychological twist.",
    answer: "Based on your interest in psychological mysteries, I'd recommend 'The Silent Patient' by Alex Michaelides. It's a gripping thriller with unexpected twists. It's available on BookXchange in 'Good' condition for ₹220."
  },
  {
    id: 'response2',
    question: "Can you suggest a book about developing good habits?",
    answer: "For building good habits, 'Atomic Habits' by James Clear is an excellent choice. It provides practical strategies for forming good habits and breaking bad ones. Someone is selling it in 'Good' condition for ₹290 on BookXchange."
  }
];

const RecommendationPage = () => {
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState(CHAT_RESPONSES);
  
  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // In a real app, this would call an AI model
    const newResponse = {
      id: `response${chatHistory.length + 1}`,
      question: chatInput,
      answer: "Based on your question, I'd recommend exploring our 'Fiction' and 'Science Fiction' categories. We have several books that match your interests, including 'Dune' by Frank Herbert which explores complex themes in a rich sci-fi setting."
    };
    
    setChatHistory([...chatHistory, newResponse]);
    setChatInput('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-serif font-bold text-bookxchange-dark">
            AI Book Recommendations
          </h1>
          <Badge className="bg-bookxchange-primary font-normal px-3 py-1">
            <Brain className="w-4 h-4 mr-1" />
            BERT + SVD Hybrid System
          </Badge>
        </div>
        
        <Card className="mb-8 bg-gradient-to-r from-bookxchange-paper to-bookxchange-light border-none">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="md:w-2/3">
                <h2 className="text-xl font-serif font-bold mb-2 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-bookxchange-primary" />
                  Ask BookWorm, Your AI Book Assistant
                </h2>
                <p className="text-bookxchange-dark/80 mb-4">
                  Our AI assistant combines natural language understanding with a knowledge of books and your reading preferences to offer personalized recommendations.
                </p>
                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <Input 
                    placeholder="Ask about book recommendations, genres, or specific titles..." 
                    className="flex-grow"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                  />
                  <Button type="submit" className="bg-bookxchange-primary hover:bg-bookxchange-primary/90">
                    Ask AI
                  </Button>
                </form>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="w-32 h-32 rounded-full bg-bookxchange-primary/10 flex items-center justify-center">
                  <img 
                    src="/lovable-uploads/93a7e185-254e-4523-a323-aac5cc60a9fe.png" 
                    alt="BookWorm AI Assistant"
                    className="w-20 h-20"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {chatHistory.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-serif font-semibold mb-4 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-bookxchange-secondary" />
              Recent Conversations
            </h2>
            <div className="space-y-4">
              {chatHistory.map((chat) => (
                <Card key={chat.id} className="overflow-hidden">
                  <div className="bg-bookxchange-light p-3 border-b">
                    <p className="font-medium">{chat.question}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start">
                      <div className="bg-bookxchange-primary/10 rounded-full p-2 mr-3">
                        <Brain className="h-5 w-5 text-bookxchange-primary" />
                      </div>
                      <p className="text-bookxchange-dark/80">{chat.answer}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <div className="mb-12">
          <Tabs defaultValue="personalized" className="w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <BookOpen className="h-6 w-6 mr-2 text-bookxchange-primary" />
                Book Recommendations
              </h2>
              <TabsList>
                <TabsTrigger value="personalized" className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-1" />
                  For You
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                  <History className="h-4 w-4 mr-1" />
                  Based on History
                </TabsTrigger>
                <TabsTrigger value="trending" className="flex items-center">
                  <BookUp className="h-4 w-4 mr-1" />
                  Trending
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="personalized">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {RECOMMENDED_BOOKS.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {BASED_ON_HISTORY.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trending">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {TRENDING_BOOKS.map((book) => (
                  <BookCard key={book.id} {...book} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" className="flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Recommendations
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <Card className="p-6 bg-bookxchange-light/50">
            <h2 className="text-xl font-serif font-semibold mb-4">How Our AI Recommendation System Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Badge className="mr-2 bg-bookxchange-primary">BERT</Badge>
                  Content-Based Filtering
                </h3>
                <p className="text-sm text-bookxchange-dark/70">
                  Our system uses BERT to analyze book descriptions and content, understanding the themes, 
                  style, and subject matter to match books based on your specific reading preferences.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Badge className="mr-2 bg-bookxchange-secondary">SVD</Badge>
                  Collaborative Filtering
                </h3>
                <p className="text-sm text-bookxchange-dark/70">
                  We use Singular Value Decomposition (SVD) to analyze patterns in user behavior, 
                  identifying books that similar readers have enjoyed to expand your reading horizons.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center">
                  <Badge className="mr-2 bg-bookxchange-accent">Hybrid</Badge>
                  Combined Approach
                </h3>
                <p className="text-sm text-bookxchange-dark/70">
                  By combining both methods with a weighted algorithm, we deliver recommendations 
                  that are both relevant to your tastes and help you discover new books you might not 
                  have found otherwise.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RecommendationPage;
