
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import GenreFilter from '@/components/GenreFilter';
import { Input } from '@/components/ui/input';
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

// Sample data
const GENRES = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 
  'Romance', 'Biography', 'History', 'Poetry', 'Self-Help'
];

const ALL_BOOKS = [
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
  },
  {
    id: '13',
    title: 'The Song of Achilles',
    author: 'Madeline Miller',
    coverImage: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 260,
    condition: 'Very Good',
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
  },
  {
    id: '15',
    title: 'The Subtle Art of Not Giving a F*ck',
    author: 'Mark Manson',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 230,
    condition: 'Good',
    genre: 'Self-Help'
  },
  {
    id: '16',
    title: 'Milk and Honey',
    author: 'Rupi Kaur',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 200,
    condition: 'Good',
    genre: 'Poetry'
  }
];

const Browse = () => {
  const [activeGenre, setActiveGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('newest');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Filter books by genre, search query, price range, and condition
  const filteredBooks = ALL_BOOKS.filter(book => {
    // Filter by genre
    if (activeGenre !== 'all' && book.genre !== activeGenre) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !book.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !book.author.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (book.price < priceRange[0] || book.price > priceRange[1]) {
      return false;
    }
    
    // Filter by condition
    if (selectedConditions.length > 0 && !selectedConditions.includes(book.condition)) {
      return false;
    }
    
    return true;
  });
  
  // Sort books
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === 'price-low') {
      return a.price - b.price;
    } else if (sortBy === 'price-high') {
      return b.price - a.price;
    } else if (sortBy === 'oldest') {
      return parseInt(a.id) - parseInt(b.id);
    } else {
      // newest
      return parseInt(b.id) - parseInt(a.id);
    }
  });

  const handleConditionChange = (condition: string) => {
    setSelectedConditions(prev => {
      if (prev.includes(condition)) {
        return prev.filter(c => c !== condition);
      } else {
        return [...prev, condition];
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-bookxchange-dark mb-8">
          Browse Books
        </h1>
        
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bookxchange-muted" />
            <Input 
              type="text" 
              placeholder="Search by title, author..." 
              className="pl-10 py-6 bg-white border-bookxchange-primary/20 focus-visible:ring-bookxchange-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Books</SheetTitle>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <div className="space-y-3">
                    <h3 className="font-medium">Price Range</h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 500]}
                        min={0}
                        max={500}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm">₹{priceRange[0]}</p>
                        <p className="text-sm">₹{priceRange[1]}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-medium">Condition</h3>
                    <div className="space-y-2">
                      {['Like New', 'Very Good', 'Good', 'Fair', 'Acceptable'].map((condition) => (
                        <div key={condition} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`condition-${condition}`} 
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={() => handleConditionChange(condition)}
                          />
                          <Label htmlFor={`condition-${condition}`}>{condition}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                    onClick={() => {
                      // Reset filters
                      setPriceRange([0, 500]);
                      setSelectedConditions([]);
                      setActiveGenre('all');
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        
        {/* Genre Filter */}
        <GenreFilter
          genres={GENRES}
          activeGenre={activeGenre}
          onGenreChange={setActiveGenre}
        />
        
        {/* Books Grid */}
        <div className="mb-8">
          {sortedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedBooks.map((book) => (
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
                onClick={() => {
                  setSearchQuery('');
                  setActiveGenre('all');
                  setPriceRange([0, 500]);
                  setSelectedConditions([]);
                }}
              >
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Browse;
