
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Mail, Phone, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bookxchange-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Book className="h-6 w-6 text-bookxchange-accent" />
              <h2 className="text-xl font-serif font-bold">BookXchange</h2>
            </div>
            <p className="text-bookxchange-muted text-sm mb-6">
              An AI-driven hub for trading second-hand books, connecting readers and promoting sustainability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-bookxchange-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-bookxchange-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-bookxchange-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-bookxchange-muted hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-bookxchange-muted hover:text-white transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-bookxchange-muted hover:text-white transition-colors">
                  Upload Book
                </Link>
              </li>
              <li>
                <Link to="/trades" className="text-bookxchange-muted hover:text-white transition-colors">
                  My Trades
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-bookxchange-muted hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-2 mt-0.5 text-bookxchange-accent" />
                <span className="text-bookxchange-muted">support@bookxchange.com</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-2 mt-0.5 text-bookxchange-accent" />
                <span className="text-bookxchange-muted">+123-456-7890</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-serif font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-bookxchange-muted hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-bookxchange-muted hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-bookxchange-muted hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-bookxchange-muted text-sm">
          <p>&copy; {new Date().getFullYear()} BookXchange. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
