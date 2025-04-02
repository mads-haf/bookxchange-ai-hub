
import React from 'react';
import BookSlider from './BookSlider';

type SlideType = {
  url: string;
  title: string;
  link: string;
};

type HeroProps = {
  slides: SlideType[];
};

const Hero = ({ slides }: HeroProps) => {
  return (
    <section className="mb-12">
      <BookSlider images={slides} />
    </section>
  );
};

export default Hero;
