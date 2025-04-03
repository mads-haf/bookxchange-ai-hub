
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getXGBoostPriceSuggestion } from '@/utils/ai/pricingEngine';

const UploadPage = () => {
  const { toast } = useToast();
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [condition, setCondition] = useState('');
  const [language, setLanguage] = useState('');
  const [price, setPrice] = useState('');
  const [publishYear, setPublishYear] = useState<string>('');
  const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateSuggestedPrice = () => {
    if (condition && genre) {
      // Use the AI pricing engine to get a price suggestion
      const suggestedPrice = getXGBoostPriceSuggestion({
        condition,
        genre,
        publishYear: publishYear ? parseInt(publishYear) : undefined,
        isPopular: Math.random() > 0.5, // Simulated popularity factor
        supplyCount: Math.floor(Math.random() * 50), // Simulated supply count
        demandScore: Math.floor(Math.random() * 70 + 30) // Simulated demand score
      });
      
      setSuggestedPrice(suggestedPrice);
      toast({
        title: "AI Price Suggestion",
        description: `Based on book condition, genre, and current market demand, we suggest ₹${suggestedPrice} as a competitive price.`,
        duration: 5000,
      });
    } else {
      toast({
        title: "Cannot calculate price",
        description: "Please select both condition and genre to get a price suggestion.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Book Listed Successfully",
      description: "Your book has been listed on BookXchange. You will be notified when someone is interested.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-serif font-bold text-bookxchange-dark mb-8">
          Upload Your Book
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-xl font-serif font-semibold">Book Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="bookTitle" className="text-sm font-medium">Book Title</label>
                      <Input 
                        id="bookTitle" 
                        placeholder="Enter book title" 
                        required 
                        value={bookTitle}
                        onChange={(e) => setBookTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="author" className="text-sm font-medium">Author</label>
                      <Input 
                        id="author" 
                        placeholder="Enter author name" 
                        required 
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="description" className="text-sm font-medium">Description</label>
                    <Textarea 
                      id="description" 
                      placeholder="Enter book description and condition details" 
                      required 
                      className="min-h-[100px]"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="genre" className="text-sm font-medium">Genre</label>
                      <Select value={genre} onValueChange={setGenre}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fiction">Fiction</SelectItem>
                          <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                          <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                          <SelectItem value="Mystery">Mystery</SelectItem>
                          <SelectItem value="Romance">Romance</SelectItem>
                          <SelectItem value="Biography">Biography</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Poetry">Poetry</SelectItem>
                          <SelectItem value="Self-Help">Self-Help</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="condition" className="text-sm font-medium">Condition</label>
                      <Select value={condition} onValueChange={setCondition}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Condition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Like New">Like New</SelectItem>
                          <SelectItem value="Very Good">Very Good</SelectItem>
                          <SelectItem value="Good">Good</SelectItem>
                          <SelectItem value="Fair">Fair</SelectItem>
                          <SelectItem value="Acceptable">Acceptable</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="language" className="text-sm font-medium">Language</label>
                      <Input 
                        id="language" 
                        placeholder="e.g., English, Hindi" 
                        required 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="publishYear" className="text-sm font-medium">Publication Year</label>
                      <Input 
                        id="publishYear" 
                        type="number" 
                        placeholder="e.g., 2010" 
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="price" className="text-sm font-medium">Your Price (₹)</label>
                      <div className="flex space-x-2">
                        <Input 
                          id="price" 
                          type="number" 
                          placeholder="Enter your price" 
                          required 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={calculateSuggestedPrice}
                        >
                          Get AI Price Suggestion
                        </Button>
                      </div>
                      {suggestedPrice && (
                        <div className="text-sm text-bookxchange-primary font-medium">
                          Suggested competitive price: ₹{suggestedPrice}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-xl font-serif font-semibold">Upload Book Image</h2>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-bookxchange-primary/30 rounded-lg p-6 bg-bookxchange-light/30">
                    {imagePreview ? (
                      <div className="mb-4">
                        <img 
                          src={imagePreview} 
                          alt="Book cover preview" 
                          className="max-h-48 object-contain" 
                        />
                      </div>
                    ) : (
                      <UploadCloud className="h-12 w-12 text-bookxchange-primary/50 mb-2" />
                    )}
                    
                    <p className="text-sm text-center text-bookxchange-dark/70 mb-4">
                      {imagePreview 
                        ? "Click below to change the image"
                        : "Upload a high-quality image of your book cover"
                      }
                    </p>
                    
                    <Input
                      id="bookImage"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('bookImage')?.click()}
                    >
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </Button>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <div className="flex flex-col sm:flex-row justify-end gap-4">
                    <Button 
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      className="bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                    >
                      List Book
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          </div>
          
          <div>
            <Card className="p-6 sticky top-6">
              <h2 className="text-xl font-serif font-semibold mb-4">AI-Powered Features</h2>
              
              <div className="space-y-4">
                <div className="bg-bookxchange-light/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Badge className="mr-2 bg-bookxchange-primary">AI</Badge>
                    XGBoost Dynamic Pricing
                  </h3>
                  <p className="text-sm text-bookxchange-dark/70">
                    Our AI analyzes book condition, genre, and market demand to suggest optimal pricing for faster trades.
                  </p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Badge className="mr-2 bg-bookxchange-secondary">AI</Badge>
                    Hybrid Recommendations
                  </h3>
                  <p className="text-sm text-bookxchange-dark/70">
                    BERT content analysis combined with collaborative filtering connects your books with interested readers.
                  </p>
                </div>
                
                <div className="bg-bookxchange-light/50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2 flex items-center">
                    <Badge className="mr-2 bg-bookxchange-accent">AI</Badge>
                    Isolation Forest Security
                  </h3>
                  <p className="text-sm text-bookxchange-dark/70">
                    Advanced fraud detection identifies suspicious transactions, ensuring a safe trading environment.
                  </p>
                </div>
              </div>
              
              <div className="mt-6 p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2" />
                  <div>
                    <h4 className="font-semibold text-yellow-800">Tips for a Successful Listing</h4>
                    <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                      <li>Use clear, high-quality images of your book</li>
                      <li>Describe the condition honestly and in detail</li>
                      <li>Mention any highlights, notes, or damage</li>
                      <li>Consider the AI price suggestion for faster trades</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UploadPage;
