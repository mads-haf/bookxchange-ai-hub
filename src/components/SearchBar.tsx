
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  return (
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
  );
};

export default SearchBar;
