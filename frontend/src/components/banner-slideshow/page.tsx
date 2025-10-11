"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./bannerSlideshow.scss";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  caption: string;
  pcImage: string;
  slideImage: string;
  alt: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Game With Style",
    caption: "Create your own PC and elevate your Gaming Experience now",
    pcImage: "/assets/images/gaming-pc.png",
    slideImage: "/assets/images/slide-bg-1.jpg",
    alt: "Gaming PC",
  },
  {
    id: 2,
    title: "Performance Unleashed",
    caption: "Experience ultimate performance with cutting-edge components",
    pcImage: "/assets/images/gaming-pc.png",
    slideImage: "/assets/images/slide-bg-2.jpg",
    alt: "High Performance PC",
  },
  {
    id: 3,
    title: "Only The Best",
    caption:
      "Hand pick from our selection of components, with full specs of each component on display",
    pcImage: "/assets/images/gaming-pc.png",
    slideImage: "/assets/images/slide-bg-3.jpg",
    alt: "Premium Components",
  },
  {
    id: 4,
    title: "Buy With Confidence",
    caption:
      "Prices are displayed at each step of the way, so the cost is fully transparent",
    pcImage: "/assets/images/gaming-pc.png",
    slideImage: "/assets/images/slide-bg-4.jpg",
    alt: "Transparent Pricing",
  },
];

export default function BannerSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [direction, setDirection] = useState(0); // Add direction tracking

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setDirection(1); // Always forward for auto-advance
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  // Vertical slides (up/down)
  const verticalSlideVariants = {
    enter: (direction: number) => ({
      y: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: 300,
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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide}
            className="banner-slide"
            custom={direction}
            variants={verticalSlideVariants}
            style={{
              backgroundImage: `url(${slides[currentSlide].slideImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              y: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div className="slide-overlay"></div>

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
                src={slides[currentSlide].pcImage}
                alt={slides[currentSlide].alt}
                width={300}
                height={200}
                priority
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
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
