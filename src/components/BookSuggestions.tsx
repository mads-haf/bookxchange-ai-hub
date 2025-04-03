import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { getBookById } from '@/utils/firebase/bookService';
import { getSimilarBooksRecommendations, getMockUserPreferences } from '@/utils/ai/recommendationEngine';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  condition: string;
  genre: string;
};

type BookSuggestionsProps = {
  bookId: string;
  genre: string;
};

const BookSuggestions = ({ bookId, genre }: BookSuggestionsProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const bookDetails = await getBookById(bookId);
        
        if (bookDetails) {
          const mockUserPreferences = getMockUserPreferences();
          
          const RELATED_BOOKS = [
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
              id: '7',
              title: 'Pride and Prejudice',
              author: 'Jane Austen',
              coverImage: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              price: 220,
              condition: 'Good',
              genre: 'Romance'
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
            }
          ];
          
          const recommendations = getSimilarBooksRecommendations(
            RELATED_BOOKS,
            bookId,
            genre || (bookDetails.genre as string),
            mockUserPreferences,
            3
          );
          
          setRecommendedBooks(recommendations);
        } else {
          const mockUserPreferences = getMockUserPreferences();
          
          const RELATED_BOOKS = [
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
              id: '7',
              title: 'Pride and Prejudice',
              author: 'Jane Austen',
              coverImage: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              price: 220,
              condition: 'Good',
              genre: 'Romance'
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
            }
          ];
          
          const recommendations = getSimilarBooksRecommendations(
            RELATED_BOOKS,
            bookId,
            genre,
            mockUserPreferences,
            3
          );
          
          setRecommendedBooks(recommendations);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        toast({
          title: "Error",
          description: "Failed to load book recommendations. Using default suggestions instead.",
          variant: "destructive",
        });
        
        const RELATED_BOOKS = [
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
            id: '7',
            title: 'Pride and Prejudice',
            author: 'Jane Austen',
            coverImage: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            price: 220,
            condition: 'Good',
            genre: 'Romance'
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
          }
        ];
        
        const recommendations = getSimilarBooksRecommendations(
          RELATED_BOOKS,
          bookId,
          genre,
          mockUserPreferences,
          3
        );
        
        setRecommendedBooks(recommendations);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [bookId, genre, toast]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden h-full flex flex-col animate-pulse">
            <div className="aspect-[3/4] bg-gray-200"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {recommendedBooks.map((book) => (
        <Link to={`/book/${book.id}`} key={book.id}>
          <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
            <div className="aspect-[3/4] relative">
              <img 
                src={book.coverImage} 
                alt={`${book.title} by ${book.author}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <Badge variant="outline" className="bg-white/90 font-normal">
                  {book.genre}
                </Badge>
              </div>
            </div>
            <div className="p-3 flex-grow flex flex-col">
              <h3 className="font-medium text-bookxchange-dark line-clamp-2 flex-grow">{book.title}</h3>
              <p className="text-sm text-bookxchange-dark/70">by {book.author}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-bold text-bookxchange-primary">₹{book.price}</span>
                <Badge variant="outline" className="bg-bookxchange-muted text-bookxchange-secondary font-normal text-xs">
                  {book.condition}
                </Badge>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default BookSuggestions;
