
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Upload, RefreshCw } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookSlider from '@/components/BookSlider';
import BookCard from '@/components/BookCard';
import GenreFilter from '@/components/GenreFilter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Sample data
const FEATURED_SLIDES = [
  {
    url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Discover Hidden Literary Treasures',
    link: '/browse'
  },
  {
    url: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Trade Books, Share Stories',
    link: '/how-it-works'
  },
  {
    url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'AI-Powered Book Recommendations',
    link: '/recommendations'
  }
];

const GENRES = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 
  'Romance', 'Biography', 'History', 'Poetry', 'Self-Help'
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
    id: '3',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 220,
    condition: 'Good',
    genre: 'Mystery'
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    coverImage: 'https://images.unsplash.com/photo-1551029506-0807df4e2031?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 190,
    condition: 'Acceptable',
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
    id: '7',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://images.unsplash.com/photo-1509460913899-515f1df34fea?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 220,
    condition: 'Good',
    genre: 'Romance'
  },
  {
    id: '8',
    title: 'The Art of War',
    author: 'Sun Tzu',
    coverImage: 'https://images.unsplash.com/photo-1511108690759-009324a90311?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 180,
    condition: 'Acceptable',
    genre: 'History'
  }
];

const RECENTLY_ADDED_BOOKS = [
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
    id: '10',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 290,
    condition: 'Good',
    genre: 'Self-Help'
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
    id: '12',
    title: 'Educated',
    author: 'Tara Westover',
    coverImage: 'https://images.unsplash.com/photo-1533669955142-6a73332af4db?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 270,
    condition: 'Good',
    genre: 'Biography'
  }
];

const Index = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books by genre if a genre is selected
  const filteredTrendingBooks = activeGenre === 'all'
    ? TRENDING_BOOKS
    : TRENDING_BOOKS.filter(book => book.genre === activeGenre);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section with Book Slider */}
        <section className="mb-12">
          <BookSlider images={FEATURED_SLIDES} />
        </section>
        
        {/* Search Bar */}
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookxchange-muted" />
                <Input 
                  type="text" 
                  placeholder="Search by title, author, or ISBN..." 
                  className="pl-10 py-6 bg-white border-bookxchange-primary/20 focus-visible:ring-bookxchange-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-bookxchange-primary hover:bg-bookxchange-primary/90 py-6">
                Search
              </Button>
            </div>
          </div>
        </section>
        
        {/* Quick Actions */}
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
        
        {/* Trending Books Section */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark">
              Trending Books
            </h2>
            <Link to="/browse" className="text-bookxchange-primary hover:underline">
              View All
            </Link>
          </div>
          
          <GenreFilter
            genres={GENRES}
            activeGenre={activeGenre}
            onGenreChange={setActiveGenre}
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredTrendingBooks.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
        
        {/* Recently Added Books */}
        <section className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark">
              Recently Added
            </h2>
            <Link to="/browse" className="text-bookxchange-primary hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {RECENTLY_ADDED_BOOKS.map((book) => (
              <BookCard key={book.id} {...book} />
            ))}
          </div>
        </section>
        
        {/* How It Works */}
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
        
        {/* Testimonials */}
        <section className="container mx-auto px-4 mb-16">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-bookxchange-primary text-white flex items-center justify-center font-bold mr-3">
                  S
                </div>
                <div>
                  <h4 className="font-bold">Shreya M.</h4>
                  <p className="text-sm text-bookxchange-dark/70">Delhi</p>
                </div>
              </div>
              <p className="text-bookxchange-dark/80 italic">
                "BookXchange has transformed how I read. I've traded over 30 books and saved thousands of rupees while meeting fellow book lovers!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-bookxchange-secondary text-white flex items-center justify-center font-bold mr-3">
                  R
                </div>
                <div>
                  <h4 className="font-bold">Rahul T.</h4>
                  <p className="text-sm text-bookxchange-dark/70">Mumbai</p>
                </div>
              </div>
              <p className="text-bookxchange-dark/80 italic">
                "The AI recommendations are spot on! I've discovered so many books I wouldn't have found otherwise. Great community too."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-bookxchange-accent text-white flex items-center justify-center font-bold mr-3">
                  P
                </div>
                <div>
                  <h4 className="font-bold">Priya K.</h4>
                  <p className="text-sm text-bookxchange-dark/70">Bangalore</p>
                </div>
              </div>
              <p className="text-bookxchange-dark/80 italic">
                "As a college student, BookXchange has been a lifesaver for finding textbooks and novels at affordable prices. Easy to use and reliable!"
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
