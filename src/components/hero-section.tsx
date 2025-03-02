"use client";
import Link from "next/link"
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Fundraiser } from '../app/fundraisers/page';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1920&h=600", 
    title: "We Need Your Powerful Hands To Change The World",
    description: "Your small help can make a big difference in someone's life",
  },
  {
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&h=600", 
    title: "Quick Fund Disbursement",
    description: "We ensure your help reaches those who need it, fast and secure",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[400px] sm:h-[500px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image Component */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-500/50 via-transparent to-blue-500/50" />
          {/* Content */}
          <div className="container relative z-10 flex h-full items-center">
            <Card className="max-w-lg bg-white/90 p-6 shadow-lg">
              <h1 className="mb-4 text-4xl sm:text-4xl  font-extrabold text-gray-800">
                {slide.title}
              </h1>
              <p className="mb-6 text-base sm:text-lg text-gray-600">
                {slide.description}
              </p>
              <div className="flex gap-4">
              <Link href="/start-fundraiser">
            <Button className="bg-green-500 text-white hover:bg-green-300 transition-all shadow-lg hover:shadow-xl rounded-lg">
              Start a Fundraiser
            </Button>
          </Link>
          <Link href="/fundraisers">
          <Button
                  size="lg"
                  variant="outline"
                  className="border-green-500 text-green-500 hover:bg-green-100"
                >
                  Donate Now
                </Button>
          </Link>
               
                
         
              </div>
            </Card>
          </div>
        </div>
      ))}
   
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all duration-400 ${
              currentSlide === index ? "bg-green-500 scale-110" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
