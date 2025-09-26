import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import "./productCard.scss";

import placeholder from "../../../public/assets/images/placeholder-image.png";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(0);

  // Extract data from product object
  const {
    name: title,
    price,
    stock: maxAllowance,
    slug,
    specifications,
    pSubCategory,
    images,
  } = product;

  const getImageUrl = () => {
    if (images && Array.isArray(images) && images.length > 0) {
      const firstImage = images[0];

      if (firstImage && firstImage.url) {
        if (firstImage.url.startsWith("http")) {
          return firstImage.url;
        }
        return `${process.env.NEXT_PUBLIC_STRAPI_URL}${firstImage.url}`;
      }
    }

    return placeholder;
  };
  const imageUrl = getImageUrl();
  const subCategory = pSubCategory?.name || "Uncategorized";

  const handleIncrement = () => {
    if (quantity < maxAllowance) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= maxAllowance) {
      setQuantity(value);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Image src={imageUrl} alt={title} fill />
      </div>
      <div className="product-text">
        <h3 className="product-title">{title}</h3>
        <p className="sub-category">{subCategory}</p>
        <p className="product-cost">£{price.toFixed(2)}</p>
        {maxAllowance > 0 && (
          <p className="stock-info">{maxAllowance} in stock</p>
        )}
      </div>
      <div className="product-actions">
        <a href={`/products/${slug}`} className="more-info-btn">
          More Info
        </a>

        <div className="product-quantity">
          <button
            type="button"
            className="decrement-btn"
            onClick={handleDecrement}
            disabled={quantity <= 0}
            aria-label="Decrease quantity"
          >
            -
          </button>

          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
            max={maxAllowance}
            className="quantity-input"
            aria-label="Product quantity"
          />

          <button
            type="button"
            className="increment-btn"
            onClick={handleIncrement}
            disabled={quantity >= maxAllowance || maxAllowance === 0}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <button
          type="button"
          className={`select-btn ${quantity > 0 ? "active" : ""}`}
          disabled={quantity === 0 || maxAllowance === 0}
          onClick={() => {
            if (quantity > 0) {
              // Handle add to cart logic here
              console.log(`Added ${quantity} of ${title} to cart`);
              console.log("Product:", product);
            }
          }}
        >
          {quantity > 0 ? `Add ${quantity} to Cart` : "Select"}
        </button>

        {maxAllowance === 0 && <p className="out-of-stock">Out of Stock</p>}
      </div>
    </div>
  );
}
