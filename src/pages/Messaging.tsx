
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MessagingCenter from '@/components/messaging/MessagingCenter';

const MessagingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto flex-grow px-4 py-8">
        <MessagingCenter />
      </div>
      <Footer />
    </div>
  );
};

export default MessagingPage;
