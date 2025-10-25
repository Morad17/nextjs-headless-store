"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Product } from "@/lib/types";
import "./product-info-modal.scss";
import placeholder from "../../../public/assets/images/placeholder-image.png";

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!product) return null;

  // const getImageUrl = () => {
  //   if (
  //     product.images &&
  //     Array.isArray(product.images) &&
  //     product.images.length > 0
  //   ) {
  //     const firstImage = product.images[0];
  //     if (firstImage && firstImage.url) {
  //       if (firstImage.url.startsWith("http")) {
  //         return firstImage.url;
  //       }
  //       return `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImage.url}`;
  //     }
  //   }
  //   return placeholder;
  // };
  const imageUrl = product.specifications?.imageUrl || placeholder;

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format specifications - updated to handle nested objects and exclude imageUrl
  const formatSpecifications = (specs: any) => {
    if (!specs) return [];

    const formatValue = (value: any): string => {
      if (value === null || value === undefined) {
        return "N/A";
      }

      // If it's an object, format it nicely
      if (typeof value === "object" && !Array.isArray(value)) {
        return Object.entries(value)
          .map(([k, v]) => `${k}: ${String(v)}`)
          .join(", ");
      }

      // If it's an array, join with commas
      if (Array.isArray(value)) {
        return value.join(", ");
      }

      return String(value);
    };

    const formatLabel = (key: string): string => {
      return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
        .replace(/\b\w/g, (l) => l.toUpperCase()); // Capitalize each word
    };

    // If specs is an object, convert to array of key-value pairs
    if (typeof specs === "object" && !Array.isArray(specs)) {
      return Object.entries(specs)
        .filter(([key]) => key !== "imageUrl") // ✅ Filter out imageUrl
        .map(([key, value]) => ({
          label: formatLabel(key),
          value: formatValue(value),
        }));
    }

    // If specs is already an array, return as is (but filter imageUrl if it exists)
    if (Array.isArray(specs)) {
      return specs
        .filter((spec, index) => {
          // If it's an object with a label property, check if label is not "imageUrl"
          if (typeof spec === "object" && spec.label) {
            return (
              spec.label.toLowerCase() !== "imageurl" &&
              spec.label !== "imageUrl"
            );
          }
          return true; // Keep other items
        })
        .map((spec, index) => {
          if (typeof spec === "object" && spec.label && spec.value) {
            return {
              label: spec.label,
              value: formatValue(spec.value),
            };
          }
          return {
            label: `Specification ${index + 1}`,
            value: formatValue(spec),
          };
        });
    }

    // If specs is a string, try to parse it
    if (typeof specs === "string") {
      try {
        const parsed = JSON.parse(specs);
        return Object.entries(parsed)
          .filter(([key]) => key !== "imageUrl") // ✅ Filter out imageUrl from parsed JSON
          .map(([key, value]) => ({
            label: formatLabel(key),
            value: formatValue(value),
          }));
      } catch {
        return [{ label: "Description", value: specs }];
      }
    }

    return [];
  };

  const specifications = formatSpecifications(product.specifications);

  const overlayVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  const modalVariants: Variants = {
    hidden: {
      y: "100vh", // Start completely off-screen at the bottom
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 1.2,
        delayChildren: 0.4,
        staggerChildren: 0.08,
      },
    },
    exit: {
      y: "100vh", // Slide back down off-screen
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const imageVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const specItemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          className="product-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            className="product-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(event, info) => {
              // If dragged down significantly, close the modal
              if (info.offset.y > 200 || info.velocity.y > 500) {
                onClose();
              }
            }}
          >
            <motion.div className="modal-header" variants={contentVariants}>
              <div className="modal-left"></div>
              <div className="modal-drag-handle"></div>
              <motion.button
                className="close-btn"
                onClick={onClose}
                aria-label="Close modal"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                ✕
              </motion.button>
            </motion.div>

            <motion.div className="modal-content" variants={contentVariants}>
              <div className="product-overview">
                <motion.div
                  className="product-image-section"
                  variants={imageVariants}
                >
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="product-main-image"
                  />
                </motion.div>

                <motion.div
                  className="product-details-section"
                  variants={contentVariants}
                >
                  <motion.h2
                    className="product-name"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                  >
                    {product.name}
                  </motion.h2>
                  <motion.div
                    className="product-price"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.3 }}
                  >
                    £{product.price.toFixed(2)}
                  </motion.div>
                  <motion.div
                    className="product-category"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.3 }}
                  >
                    {product.pSubCategory?.name || "Uncategorized"}
                  </motion.div>

                  {product.description && (
                    <motion.div
                      className="product-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.45, duration: 0.3 }}
                    >
                      <h3>Description</h3>
                      <p>{product.description}</p>
                    </motion.div>
                  )}
                </motion.div>
              </div>

              <motion.div
                className="specifications-section"
                variants={contentVariants}
              >
                <motion.h3
                  className="specs-title"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  Specifications
                </motion.h3>

                {specifications.length > 0 ? (
                  <motion.div
                    className="specs-grid"
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delayChildren: 0.55,
                      staggerChildren: 0.05,
                    }}
                  >
                    {specifications.map((spec, index) => (
                      <motion.div
                        key={index}
                        className="spec-item"
                        variants={specItemVariants}
                        whileHover={{
                          scale: 1.02,

                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="spec-label">{spec.label}</div>
                        <div className="spec-value">{spec.value}</div>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    className="no-specs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.3 }}
                  >
                    <p>No specifications available for this product.</p>
                  </motion.div>
                )}
              </motion.div>

              <motion.div className="modal-actions" variants={contentVariants}>
                <motion.button
                  className="close-modal-btn"
                  onClick={onClose}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  Close Details
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
