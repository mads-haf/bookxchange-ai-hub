
import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

type BookCardProps = {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  price: number;
  condition: string;
  genre: string;
};

const BookCard = ({
  id,
  title,
  author,
  coverImage,
  price,
  condition,
  genre,
}: BookCardProps) => {
  return (
    <Card className="book-card h-full flex flex-col">
      <div className="book-cover">
        <div className="book-spine"></div>
        <img
          src={coverImage}
          alt={`${title} by ${author}`}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="flex-grow pt-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="bg-bookxchange-light text-bookxchange-primary font-normal">
            {genre}
          </Badge>
          <Badge variant="outline" className="bg-bookxchange-muted text-bookxchange-secondary font-normal">
            {condition}
          </Badge>
        </div>
        <h3 className="font-serif font-bold text-lg line-clamp-2 mb-1 text-bookxchange-dark">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">by {author}</p>
        <p className="text-lg font-bold text-bookxchange-primary">₹{price}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild className="w-full bg-bookxchange-secondary hover:bg-bookxchange-secondary/90">
          <Link to={`/book/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
