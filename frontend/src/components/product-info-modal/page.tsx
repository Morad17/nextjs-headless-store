"use client";

import React, { useEffect } from "react";
import Image from "next/image";
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

  if (!product || !isOpen) return null;

  const getImageUrl = () => {
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      const firstImage = product.images[0];
      if (firstImage && firstImage.url) {
        if (firstImage.url.startsWith("http")) {
          return firstImage.url;
        }
        return `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImage.url}`;
      }
    }
    return placeholder;
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format specifications for display
  const formatSpecifications = (specs: any) => {
    if (!specs) return [];

    // If specs is an object, convert to array of key-value pairs
    if (typeof specs === "object" && !Array.isArray(specs)) {
      return Object.entries(specs).map(([key, value]) => ({
        label: key
          .replace(/([A-Z])/g, " $1")
          .replace(/^./, (str) => str.toUpperCase()),
        value: String(value),
      }));
    }

    // If specs is already an array, return as is
    if (Array.isArray(specs)) {
      return specs;
    }

    // If specs is a string, try to parse it
    if (typeof specs === "string") {
      try {
        const parsed = JSON.parse(specs);
        return Object.entries(parsed).map(([key, value]) => ({
          label: key
            .replace(/([A-Z])/g, " $1")
            .replace(/^./, (str) => str.toUpperCase()),
          value: String(value),
        }));
      } catch {
        return [{ label: "Description", value: specs }];
      }
    }

    return [];
  };

  const specifications = formatSpecifications(product.specifications);

  return (
    <div
      className={`product-modal-overlay ${isOpen ? "open" : ""}`}
      onClick={handleBackdropClick}
    >
      <div className={`product-modal ${isOpen ? "slide-up" : "slide-down"}`}>
        <div className="modal-header">
          <div className="modal-drag-handle"></div>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-content">
          <div className="product-overview">
            <div className="product-image-section">
              <Image
                src={getImageUrl()}
                alt={product.name}
                width={300}
                height={250}
                className="product-main-image"
                style={{ objectFit: "cover" }}
              />
            </div>

            <div className="product-details-section">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-price">£{product.price.toFixed(2)}</div>
              <div className="product-category">
                {product.pSubCategory?.name || "Uncategorized"}
              </div>

              {product.description && (
                <div className="product-description">
                  <h3>Description</h3>
                  <p>{product.description}</p>
                </div>
              )}
            </div>
          </div>

          <div className="specifications-section">
            <h3 className="specs-title">Specifications</h3>

            {specifications.length > 0 ? (
              <div className="specs-grid">
                {specifications.map((spec, index) => (
                  <div key={index} className="spec-item">
                    <div className="spec-label">{spec.label}</div>
                    <div className="spec-value">{spec.value}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-specs">
                <p>No specifications available for this product.</p>
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button className="close-modal-btn" onClick={onClose}>
              Close Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
