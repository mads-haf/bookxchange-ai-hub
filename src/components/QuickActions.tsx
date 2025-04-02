
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Upload, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const QuickActions = () => {
  return (
    <section className="container mx-auto px-4 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-bookxchange-light p-6 rounded-lg text-center">
          <div className="mx-auto rounded-full bg-bookxchange-primary/10 w-16 h-16 flex items-center justify-center mb-4">
            <Book className="h-8 w-8 text-bookxchange-primary" />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2">Browse Books</h3>
          <p className="text-bookxchange-dark/70 mb-4">
            Explore our vast collection of second-hand books from various genres.
          </p>
          <Button asChild variant="outline" className="border-bookxchange-primary text-bookxchange-primary hover:bg-bookxchange-primary hover:text-white">
            <Link to="/browse">Explore Now</Link>
          </Button>
        </div>
        
        <div className="bg-bookxchange-light p-6 rounded-lg text-center">
          <div className="mx-auto rounded-full bg-bookxchange-secondary/10 w-16 h-16 flex items-center justify-center mb-4">
            <Upload className="h-8 w-8 text-bookxchange-secondary" />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2">Upload Book</h3>
          <p className="text-bookxchange-dark/70 mb-4">
            List your used books for trade or sale on our platform.
          </p>
          <Button asChild variant="outline" className="border-bookxchange-secondary text-bookxchange-secondary hover:bg-bookxchange-secondary hover:text-white">
            <Link to="/upload">Upload Now</Link>
          </Button>
        </div>
        
        <div className="bg-bookxchange-light p-6 rounded-lg text-center">
          <div className="mx-auto rounded-full bg-bookxchange-accent/10 w-16 h-16 flex items-center justify-center mb-4">
            <RefreshCw className="h-8 w-8 text-bookxchange-accent" />
          </div>
          <h3 className="text-xl font-serif font-bold mb-2">Trade Books</h3>
          <p className="text-bookxchange-dark/70 mb-4">
            Exchange your books with others and build your collection.
          </p>
          <Button asChild variant="outline" className="border-bookxchange-accent text-bookxchange-accent hover:bg-bookxchange-accent hover:text-white">
            <Link to="/how-it-works">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
