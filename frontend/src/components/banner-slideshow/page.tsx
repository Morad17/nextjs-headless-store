"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./bannerSlideshow.scss";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  caption: string;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Game With Style",
    caption: "Create your own PC and elevate your Gaming Experience now",
    image: "/assets/images/gaming-pc.png",
    alt: "Gaming PC",
  },
  {
    id: 2,
    title: "Performance Unleashed",
    caption: "Experience ultimate performance with cutting-edge components",
    image: "/assets/images/gaming-pc.png",
    alt: "High Performance PC",
  },
  {
    id: 3,
    title: "Only The Best",
    caption:
      "Hand pick from our selection of components, with full specs of each component on display",
    image: "/assets/images/gaming-pc.png",
    alt: "Premium Components",
  },
  {
    id: 4,
    title: "Buy With Confidence",
    caption:
      "Prices are displayed at each step of the way, so the cost is fully transparent",
    image: "/assets/images/gaming-pc.png",
    alt: "Transparent Pricing",
  },
];

export default function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const textVariants = {
    enter: {
      y: 20,
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
    },
  };

  return (
    <div
      className="banner-slideshow"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="slideshow-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="banner-slide"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <motion.div
              className="banner-text"
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <h2 className="banner-title">{slides[currentSlide].title}</h2>
              <p className="banner-caption">{slides[currentSlide].caption}</p>
            </motion.div>

            <motion.div
              className="banner-image-container"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Image
                className="banner-image"
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                width={300}
                height={200}
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="slide-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <motion.div
          className="progress-bar"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, ease: "linear" }}
          key={currentSlide}
        />
      </div>
    </div>
  );
}
