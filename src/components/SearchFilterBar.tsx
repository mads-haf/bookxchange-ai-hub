
import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
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
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type SearchFilterBarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
  selectedConditions: string[];
  handleConditionChange: (condition: string) => void;
  resetFilters: () => void;
};

const SearchFilterBar = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedConditions,
  handleConditionChange,
  resetFilters,
}: SearchFilterBarProps) => {
  return (
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
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default SearchFilterBar;
