import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BrowsePageContent from '@/components/BrowsePageContent';

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

  const resetFilters = () => {
    setPriceRange([0, 500]);
    setSelectedConditions([]);
    setActiveGenre('all');
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveGenre('all');
    setPriceRange([0, 500]);
    setSelectedConditions([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <BrowsePageContent 
        books={sortedBooks}
        genres={GENRES}
        activeGenre={activeGenre}
        setActiveGenre={setActiveGenre}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedConditions={selectedConditions}
        handleConditionChange={handleConditionChange}
        resetFilters={resetFilters}
        resetAllFilters={resetAllFilters}
      />
      
      <Footer />
    </div>
  );
};

export default Browse;
