
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HowItWorks = () => {
  return (
    <section className="bg-bookxchange-paper py-16 mb-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark text-center mb-12">
          How BookXchange Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg text-center relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-bookxchange-primary text-white flex items-center justify-center font-bold text-xl">
              1
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 pt-2">List Your Books</h3>
            <p className="text-bookxchange-dark/70">
              Upload photos and details of the books you want to trade or sell.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-bookxchange-primary text-white flex items-center justify-center font-bold text-xl">
              2
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 pt-2">Connect with Readers</h3>
            <p className="text-bookxchange-dark/70">
              Our AI matches your books with interested readers in your area.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg text-center relative">
            <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-bookxchange-primary text-white flex items-center justify-center font-bold text-xl">
              3
            </div>
            <h3 className="text-xl font-serif font-bold mb-4 pt-2">Trade or Sell</h3>
            <p className="text-bookxchange-dark/70">
              Arrange to meet or ship the book and complete your transaction.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button asChild className="bg-bookxchange-primary hover:bg-bookxchange-primary/90">
            <Link to="/how-it-works">Learn More About BookXchange</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
