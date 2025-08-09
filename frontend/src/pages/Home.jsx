
import React, { useState, useEffect } from 'react';

export default function Home() {
  const childrenPhotos = [
    '/children1.jpg',
    '/children2.jpg',
    '/children3.jpg',
    '/children4.jpg',
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Effect for automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prevSlide => (prevSlide + 1) % childrenPhotos.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [childrenPhotos.length]);

  // Effect to scroll to the correct slide
  useEffect(() => {
    const slideId = `slide${currentSlide + 1}`;
    const element = document.getElementById(slideId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSlide]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full p-4">
      <div className="flex-1 md:w-1/2 p-4">
        <div className="carousel w-full rounded-lg shadow-xl scroll-smooth">
          {childrenPhotos.map((photo, index) => (
            <div key={index} id={`slide${index + 1}`} className="carousel-item w-full">
              <img src={photo} className="w-full object-cover h-64 md:h-96" />
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 md:w-1/2 p-4 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">A foundation where learning knows no boundaries.</h1>
        <p className="py-6 text-lg">
          We are dedicated to providing educational opportunities and support to those in need. Join us as a volunteer or intern and help make a difference.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a href="/register" className="btn btn-primary text-white">Apply Now</a>
          <a href="/admin" className="btn btn-outline btn-primary">Admin Login</a>
        </div>
      </div>
    </div>
  );
}