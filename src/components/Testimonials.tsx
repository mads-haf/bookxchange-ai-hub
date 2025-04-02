
import React from 'react';

const Testimonials = () => {
  return (
    <section className="container mx-auto px-4 mb-16">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-bookxchange-dark text-center mb-12">
        What Our Users Say
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-bookxchange-primary text-white flex items-center justify-center font-bold mr-3">
              S
            </div>
            <div>
              <h4 className="font-bold">Shreya M.</h4>
              <p className="text-sm text-bookxchange-dark/70">Delhi</p>
            </div>
          </div>
          <p className="text-bookxchange-dark/80 italic">
            "BookXchange has transformed how I read. I've traded over 30 books and saved thousands of rupees while meeting fellow book lovers!"
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-bookxchange-secondary text-white flex items-center justify-center font-bold mr-3">
              R
            </div>
            <div>
              <h4 className="font-bold">Rahul T.</h4>
              <p className="text-sm text-bookxchange-dark/70">Mumbai</p>
            </div>
          </div>
          <p className="text-bookxchange-dark/80 italic">
            "The AI recommendations are spot on! I've discovered so many books I wouldn't have found otherwise. Great community too."
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded-full bg-bookxchange-accent text-white flex items-center justify-center font-bold mr-3">
              P
            </div>
            <div>
              <h4 className="font-bold">Priya K.</h4>
              <p className="text-sm text-bookxchange-dark/70">Bangalore</p>
            </div>
          </div>
          <p className="text-bookxchange-dark/80 italic">
            "As a college student, BookXchange has been a lifesaver for finding textbooks and novels at affordable prices. Easy to use and reliable!"
          </p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
