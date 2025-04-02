
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  MessageCircle, 
  ShoppingCart, 
  Share2, 
  Heart,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import BookSuggestions from '@/components/BookSuggestions';

// Sample book data (in a real app, this would come from an API)
const BOOKS = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 280,
    condition: 'Good',
    genre: 'Fiction',
    description: 'A classic novel set in the American South during the 1930s. The book follows the story of Scout Finch and her father, lawyer Atticus Finch, who defends a Black man accused of raping a white woman. The book explores themes of racial injustice, moral growth, and the loss of innocence.',
    seller: {
      name: 'Rahul M.',
      rating: 4.7,
      reviewCount: 23,
      location: 'Mumbai',
      responseTime: '1-2 hours'
    },
    publishYear: 1960,
    language: 'English',
    pages: 281,
    isFlagged: false
  }
];

const BookDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  // Find the book based on the ID
  const book = BOOKS.find(b => b.id === id) || BOOKS[0]; // Fallback to first book if not found
  
  const handleContactSeller = () => {
    toast({
      title: "Message Sent",
      description: `Your message has been sent to ${book.seller.name}. They typically respond within ${book.seller.responseTime}.`,
      duration: 5000,
    });
  };
  
  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${book.title} has been added to your cart.`,
      duration: 5000,
    });
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${book.title} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`,
      duration: 3000,
    });
  };
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API
    toast({
      title: "Link Copied",
      description: "Book link has been copied to clipboard.",
      duration: 3000,
    });
  };
  
  const handleReportBook = () => {
    toast({
      title: "Book Reported",
      description: "Thank you for your feedback. Our team will review this listing.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Image and Actions */}
          <div className="md:col-span-1">
            <div className="sticky top-8">
              <Card className="overflow-hidden">
                <div className="aspect-[3/4] relative bg-bookxchange-light">
                  <img 
                    src={book.coverImage} 
                    alt={book.title} 
                    className="w-full h-full object-cover"
                  />
                  {book.isFlagged && (
                    <div className="absolute top-4 right-4 bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4 space-y-4">
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={handleAddToCart}
                      className="w-full bg-bookxchange-primary hover:bg-bookxchange-primary/90 flex items-center"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Buy for ₹{book.price}
                    </Button>
                    
                    <Button 
                      onClick={handleContactSeller}
                      variant="outline" 
                      className="w-full border-bookxchange-secondary text-bookxchange-secondary hover:bg-bookxchange-secondary hover:text-white flex items-center"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact Seller
                    </Button>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleToggleWishlist}
                      className={`flex items-center ${isWishlisted ? 'text-red-500' : 'text-gray-500'}`}
                    >
                      <Heart className="mr-1 h-4 w-4" fill={isWishlisted ? "currentColor" : "none"} />
                      Wishlist
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleShare}
                      className="flex items-center text-gray-500"
                    >
                      <Share2 className="mr-1 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">Seller Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-bookxchange-dark/70">Seller</span>
                        <span className="font-medium">{book.seller.name}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-bookxchange-dark/70">Rating</span>
                        <span className="flex items-center">
                          <span className="font-medium mr-1">{book.seller.rating}</span>
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-bookxchange-dark/70">Location</span>
                        <span className="font-medium">{book.seller.location}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-bookxchange-dark/70">Response Time</span>
                        <span className="font-medium">{book.seller.responseTime}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={handleContactSeller}
                    >
                      Contact Seller
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          {/* Book Details */}
          <div className="md:col-span-2">
            <div className="mb-2 flex items-center space-x-2">
              <Badge variant="outline" className="bg-bookxchange-light text-bookxchange-primary font-normal">
                {book.genre}
              </Badge>
              <Badge variant="outline" className="bg-bookxchange-muted text-bookxchange-secondary font-normal">
                {book.condition}
              </Badge>
              <Badge variant="outline" className="bg-bookxchange-paper text-bookxchange-dark font-normal">
                {book.language}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-bookxchange-dark mb-2">
              {book.title}
            </h1>
            
            <p className="text-xl mb-4">by <span className="font-medium">{book.author}</span></p>
            
            <div className="flex items-center mb-6">
              <p className="text-2xl font-bold text-bookxchange-primary mr-4">₹{book.price}</p>
              {book.condition === 'Like New' && (
                <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-sm">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Verified Excellent Condition
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-serif font-semibold mb-2">Description</h2>
                <p className="text-bookxchange-dark/80 leading-relaxed">{book.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-bookxchange-light/50 p-3 rounded-lg">
                  <p className="text-bookxchange-dark/70 text-sm">Published</p>
                  <p className="font-medium">{book.publishYear}</p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-3 rounded-lg">
                  <p className="text-bookxchange-dark/70 text-sm">Language</p>
                  <p className="font-medium">{book.language}</p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-3 rounded-lg">
                  <p className="text-bookxchange-dark/70 text-sm">Pages</p>
                  <p className="font-medium">{book.pages}</p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-3 rounded-lg">
                  <p className="text-bookxchange-dark/70 text-sm">Condition</p>
                  <p className="font-medium">{book.condition}</p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-3 rounded-lg">
                  <p className="text-bookxchange-dark/70 text-sm">Genre</p>
                  <p className="font-medium">{book.genre}</p>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-serif font-semibold mb-2">AI-Powered Book Analysis</h2>
                <Card className="p-4 bg-gradient-to-r from-bookxchange-paper to-bookxchange-light">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Badge className="mr-2 bg-bookxchange-primary">AI</Badge>
                        Price Analysis
                      </h3>
                      <p className="text-sm text-bookxchange-dark/80 mt-1">
                        XGBoost pricing model indicates this book is priced competitively based on condition, 
                        genre, and current market demand. The fair market value range is ₹260 - ₹300.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Badge className="mr-2 bg-bookxchange-secondary">AI</Badge>
                        Book Quality Verification
                      </h3>
                      <p className="text-sm text-bookxchange-dark/80 mt-1">
                        Based on the seller's history and description analysis, this listing has a 
                        96% trustworthiness score. The condition appears to be accurately described.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium flex items-center">
                        <Badge className="mr-2 bg-bookxchange-accent">AI</Badge>
                        Transaction Safety
                      </h3>
                      <p className="text-sm text-bookxchange-dark/80 mt-1">
                        Our Isolation Forest algorithm has verified this listing as legitimate with 
                        no unusual patterns detected. Safe to proceed with the transaction.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
              
              <div>
                <h2 className="text-xl font-serif font-semibold mb-4">You Might Also Like</h2>
                <BookSuggestions bookId={book.id} genre={book.genre} />
              </div>
              
              <div className="border-t pt-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={handleReportBook}
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Report this listing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetailsPage;
