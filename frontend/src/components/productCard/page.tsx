import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useOrderStore } from "@/store/useOrderStore";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import "./productCard.scss";

import placeholder from "../../../public/assets/images/placeholder-image.png";

interface ProductCardProps {
  product: Product;
  maxAllowance?: number;
}

export default function ProductCard({
  product,
  maxAllowance = 1,
}: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);

  const { addToOrder, currentOrder, replaceOrderItem } = useOrderStore();
  const { showMainComponents, categories, selectedCategoryId } =
    useBuildPcStore();

  // Extract data from product object
  const {
    name: title,
    price,
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
  const subCategory =
    pSubCategory?.name || pSubCategory?.name || "Uncategorized";

  // Get category info
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );
  const categoryName =
    selectedCategory?.name || selectedCategory?.name || "Unknown";
  const isMainComponent = showMainComponents;

  // Check if product is already in order
  const existingOrderItem = currentOrder.find(
    (item) => item.product.id === product.id
  );
  const isInOrder = !!existingOrderItem;

  // Check if there's already a product from this category in the order
  const existingCategoryItem = currentOrder.find(
    (item) =>
      item.category === categoryName && item.isMainComponent === isMainComponent
  );

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (quantity < maxAllowance) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (quantity > 1) {
      // Changed from 0 to 1 for minimum quantity
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation(); // Prevent card click
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= maxAllowance) {
      setQuantity(value);
    }
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking "More Info"
  };

  const handleCardClick = () => {
    const orderQuantity = maxAllowance > 1 ? quantity : 1;

    if (maxAllowance === 1 && existingCategoryItem && !isInOrder) {
      // Replace existing item in this category if maxAllowance is 1
      replaceOrderItem(
        existingCategoryItem.product.id,
        product,
        orderQuantity,
        categoryName,
        isMainComponent
      );
      console.log(
        `Replaced ${
          existingCategoryItem.product?.name ||
          existingCategoryItem.product.name
        } with ${title} in ${categoryName}`
      );
    } else {
      // Normal add/update behavior
      addToOrder(product, orderQuantity, categoryName, isMainComponent);
      console.log(`Added ${orderQuantity} of ${title} to order`, currentOrder);
    }
  };

  return (
    <div
      className={`product-card ${isInOrder ? "in-order" : ""} ${
        existingCategoryItem && !isInOrder && maxAllowance === 1
          ? "will-replace"
          : ""
      }`}
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <div className="product-image">
        <Image src={imageUrl} alt={title} fill />
      </div>
      <div className="product-text">
        <h3 className="product-title">{title}</h3>
        <div className="product-cost-info-row">
          <p className="product-cost">+ £{price.toFixed(2)}</p>
          <div className="more-info-btn" onClick={handleMoreInfoClick}>
            <a href={`/products/${slug}`}>Info</a>
          </div>
        </div>
      </div>

      {/* Only show quantity controls if maxAllowance > 1 */}
      {maxAllowance > 1 && (
        <div className="product-actions">
          <div className="product-quantity">
            <button
              type="button"
              className="decrement-btn"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              -
            </button>

            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={maxAllowance}
              className="quantity-input"
              aria-label="Product quantity"
              readOnly
            />

            <button
              type="button"
              className="increment-btn"
              onClick={handleIncrement}
              disabled={quantity >= maxAllowance}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
