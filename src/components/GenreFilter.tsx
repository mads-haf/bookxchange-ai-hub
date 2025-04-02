
import React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

type GenreFilterProps = {
  genres: string[];
  activeGenre: string;
  onGenreChange: (genre: string) => void;
};

const GenreFilter = ({ genres, activeGenre, onGenreChange }: GenreFilterProps) => {
  return (
    <div className="w-full mb-8">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-2 p-1">
          <Button
            variant={activeGenre === 'all' ? 'default' : 'outline'}
            className={`rounded-full px-4 py-2 ${
              activeGenre === 'all'
                ? 'bg-bookxchange-primary text-white'
                : 'text-bookxchange-dark hover:text-bookxchange-primary'
            }`}
            onClick={() => onGenreChange('all')}
          >
            All Books
          </Button>
          
          {genres.map((genre) => (
            <Button
              key={genre}
              variant={activeGenre === genre ? 'default' : 'outline'}
              className={`rounded-full px-4 py-2 ${
                activeGenre === genre
                  ? 'bg-bookxchange-primary text-white'
                  : 'text-bookxchange-dark hover:text-bookxchange-primary'
              }`}
              onClick={() => onGenreChange(genre)}
            >
              {genre}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default GenreFilter;
