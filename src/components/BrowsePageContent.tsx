
import React from 'react';
import GenreFilter from '@/components/GenreFilter';
import SearchFilterBar from '@/components/SearchFilterBar';
import BookGrid from '@/components/BookGrid';

type Book = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  condition: string;
  genre: string;
};

type BrowsePageContentProps = {
  books: Book[];
  genres: string[];
  activeGenre: string;
  setActiveGenre: (genre: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedConditions: string[];
  handleConditionChange: (condition: string) => void;
  resetFilters: () => void;
  resetAllFilters: () => void;
};

const BrowsePageContent = ({
  books,
  genres,
  activeGenre,
  setActiveGenre,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedConditions,
  handleConditionChange,
  resetFilters,
  resetAllFilters,
}: BrowsePageContentProps) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-bookxchange-dark mb-8">
        Browse Books
      </h1>
      
      {/* Search and Filter Bar */}
      <SearchFilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedConditions={selectedConditions}
        handleConditionChange={handleConditionChange}
        resetFilters={resetFilters}
      />
      
      {/* Genre Filter */}
      <GenreFilter
        genres={genres}
        activeGenre={activeGenre}
        onGenreChange={setActiveGenre}
      />
      
      {/* Books Grid */}
      <BookGrid books={books} resetAllFilters={resetAllFilters} />
    </main>
  );
};

export default BrowsePageContent;
