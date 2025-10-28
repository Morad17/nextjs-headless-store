"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import "./category-slider.scss";

// Define interfaces for type safety
interface Category {
  id: number;
  name: string;
  slug: string;
}

interface CategorySliderProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategorySelect: (categoryId: number) => void;
}

export default function CategorySlider({
  categories,
  selectedCategoryId,
  onCategorySelect,
}: CategorySliderProps) {
  // Drag functionality state
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position to enable/disable nav buttons
  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);

    // Add visual feedback to the slider
    sliderRef.current.style.cursor = "grabbing";
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setDraggedCard(null);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedCard(null);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;

    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Touch drag handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;

    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setDraggedCard(null);
  };

  // Card-specific drag handlers
  const handleCardMouseDown = (e: React.MouseEvent, cardId: string) => {
    setDraggedCard(cardId);
    handleMouseDown(e);
  };

  const handleCardTouchStart = (e: React.TouchEvent, cardId: string) => {
    setDraggedCard(cardId);
    handleTouchStart(e);
  };

  // Handle card click (only if not dragging)
  const handleCardClick = (categoryId: number) => {
    if (!isDragging) {
      onCategorySelect(categoryId);
    }
  };

  // Update scroll position on resize
  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check initial scroll position when categories change
  useEffect(() => {
    checkScrollPosition();
  }, [categories]);

  return (
    <div
      ref={sliderRef}
      className="categories-slider"
      onScroll={checkScrollPosition}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? "grabbing" : "grab" }}
    >
      {categories.map((cat, key) => {
        const isSelected = selectedCategoryId === cat.id;
        const isBeingDragged = draggedCard === cat.id.toString();

        return (
          <motion.div
            key={cat.id}
            className={`category-card ${isSelected ? "selected" : ""} ${
              isBeingDragged ? "dragging" : ""
            }`}
            onClick={() => handleCardClick(cat.id)}
            onMouseDown={(e) => {
              e.stopPropagation();
              handleCardMouseDown(e, cat.id.toString());
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              handleCardTouchStart(e, cat.id.toString());
            }}
            whileHover={
              !isDragging
                ? {
                    y: -4,
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }
                : {}
            }
            whileTap={!isDragging ? { scale: 0.98 } : {}}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: isBeingDragged ? 1.05 : 1,
            }}
            transition={{
              duration: 0.3,
              delay: key * 0.05,
              ease: "easeOut",
            }}
            drag={false}
          >
            <div className="category-card-background-wrapper"></div>
            <div className="category-card-image-div">
              <Image
                src={`/assets/images/categories/${cat.slug}.png`}
                className="category-card-image"
                alt={cat.name}
                width={160}
                height={160}
                onError={(e) => {
                  e.currentTarget.src = "/assets/icons/default.png";
                }}
                draggable={false}
              />
            </div>
            <div className="category-card-name-div">
              <p className="category-card-name">{cat.name}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
