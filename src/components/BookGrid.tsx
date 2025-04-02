
import React from 'react';
import BookCard from '@/components/BookCard';
import { Button } from '@/components/ui/button';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  condition: string;
  genre: string;
};

type BookGridProps = {
  books: Book[];
  resetAllFilters: () => void;
};

const BookGrid = ({ books, resetAllFilters }: BookGridProps) => {
  return (
    <div className="mb-8">
      {books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} {...book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-bookxchange-light/50 rounded-lg">
          <h3 className="text-xl font-serif font-bold text-bookxchange-dark mb-2">
            No Books Found
          </h3>
          <p className="text-bookxchange-dark/70 mb-4">
            Try adjusting your search or filter criteria.
          </p>
          <Button 
            variant="outline" 
            className="border-bookxchange-primary text-bookxchange-primary hover:bg-bookxchange-primary hover:text-white"
            onClick={resetAllFilters}
          >
            Reset All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookGrid;
