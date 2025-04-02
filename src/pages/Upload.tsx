
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

const GENRES = [
  'Fiction', 'Non-Fiction', 'Science Fiction', 'Mystery', 
  'Romance', 'Biography', 'History', 'Poetry', 'Self-Help',
  'Fantasy', 'Horror', 'Thriller', 'Children', 'Young Adult',
  'Classics', 'Science', 'Technology', 'Business', 'Travel'
];

const CONDITIONS = [
  'Like New', 'Very Good', 'Good', 'Fair', 'Acceptable'
];

const LANGUAGES = [
  'English', 'Hindi', 'Bengali', 'Marathi', 'Tamil',
  'Telugu', 'Kannada', 'Malayalam', 'Gujarati', 'Urdu',
  'Punjabi', 'Odia', 'French', 'German', 'Spanish'
];

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    language: '',
    price: '',
    condition: '',
    name: '',
    phone: '',
    email: '',
    upi: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Success!",
        description: "Your book has been uploaded successfully.",
        variant: "default",
      });
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="rounded-full bg-bookxchange-primary/10 w-16 h-16 flex items-center justify-center mr-4">
              <Upload className="h-8 w-8 text-bookxchange-primary" />
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark">
              Upload Your Book
            </h1>
          </div>
          
          <p className="text-center text-bookxchange-dark/70 mb-8">
            Fill in the details below to list your book for trade or sale on BookXchange.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-serif font-bold text-bookxchange-dark">
                  Book Details
                </h2>
                <div className="border-t border-bookxchange-primary/10 pt-4"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="title">Book Title *</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter the full title of the book"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author Name *</Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Enter the author's name"
                  value={formData.author}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description & Condition Details *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the book and its condition (marks, highlights, missing pages, etc.)"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="genre">Genre *</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('genre', value)}
                  required
                >
                  <SelectTrigger id="genre">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENRES.map(genre => (
                      <SelectItem key={genre} value={genre}>
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language">Language *</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('language', value)}
                  required
                >
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(language => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="condition">Condition *</Label>
                <Select
                  onValueChange={(value) => handleSelectChange('condition', value)}
                  required
                >
                  <SelectTrigger id="condition">
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONDITIONS.map(condition => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="1"
                  placeholder="Enter the price in rupees"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label>Book Cover Image *</Label>
                <div className="border-2 border-dashed border-bookxchange-primary/20 rounded-lg p-4 text-center">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Book cover preview"
                        className="mx-auto h-64 object-contain"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-2 right-2 bg-bookxchange-primary/80 text-white p-1 rounded-full"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-bookxchange-primary/10 w-12 h-12 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-bookxchange-primary" />
                        </div>
                      </div>
                      <p className="text-bookxchange-dark/70 mb-2">
                        Drag and drop your image here, or click to browse
                      </p>
                      <p className="text-xs text-bookxchange-dark/50">
                        PNG, JPG or JPEG (max. 5MB)
                      </p>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                        required={!imagePreview}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="mt-4"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Select Image
                      </Button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 md:col-span-2">
                <h2 className="text-xl font-serif font-bold text-bookxchange-dark">
                  Contact Details
                </h2>
                <div className="border-t border-bookxchange-primary/10 pt-4"></div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="upi">UPI ID (for payments)</Label>
                <Input
                  id="upi"
                  name="upi"
                  placeholder="Enter your UPI ID"
                  value={formData.upi}
                  onChange={handleChange}
                />
              </div>
              
              <div className="md:col-span-2 flex justify-end space-x-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-bookxchange-primary hover:bg-bookxchange-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Uploading...' : 'Upload Book'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Upload;
