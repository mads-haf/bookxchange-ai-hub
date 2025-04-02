
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Book, Search, Upload, ShoppingCart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-bookxchange-primary/10 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Book className="h-8 w-8 text-bookxchange-primary" />
          <div>
            <h1 className="text-2xl font-serif font-bold text-bookxchange-primary">BookXchange</h1>
            <p className="text-xs text-bookxchange-muted">AI-driven Book Trade Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors">
            Home
          </Link>
          <Link to="/browse" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors">
            Browse
          </Link>
          <Link to="/upload" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors">
            Upload Book
          </Link>
          <Link to="/trades" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors">
            My Trades
          </Link>
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/search">
              <Search className="h-5 w-5" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white">
              <DropdownMenuItem asChild>
                <Link to="/login" className="w-full">Login</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/register" className="w-full">Register</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/profile" className="w-full">My Profile</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          
          <Button asChild className="bg-bookxchange-primary hover:bg-bookxchange-primary/90">
            <Link to="/upload">
              <Upload className="h-4 w-4 mr-2" />
              Upload Book
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-bookxchange-primary" />
          ) : (
            <Menu className="h-6 w-6 text-bookxchange-primary" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-bookxchange-primary/10 px-4 py-2">
          <nav className="flex flex-col space-y-3 py-3">
            <Link to="/" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/browse" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Browse
            </Link>
            <Link to="/upload" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Upload Book
            </Link>
            <Link to="/trades" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              My Trades
            </Link>
            <Link to="/login" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              Login / Register
            </Link>
            <Link to="/profile" className="text-bookxchange-dark hover:text-bookxchange-primary transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
              My Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
