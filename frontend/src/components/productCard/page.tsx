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

  const { addToOrder, currentOrder } = useOrderStore();
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

  const handleAddToOrder = () => {
    if (quantity > 0) {
      addToOrder(product, quantity, categoryName, isMainComponent);
      console.log(`Added ${quantity} of ${title} to order`);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <Image src={imageUrl} alt={title} fill />
      </div>
      <div className="product-text">
        <h3 className="product-title">{title}</h3>
        {/* <p className="sub-category">{subCategory}</p> */}
        <div className="product-cost-info-row">
          <p className="product-cost">+ £{price.toFixed(2)}</p>
          <div className="more-info-btn">
            <a href={`/products/${slug}`}>Info</a>
          </div>
        </div>
      </div>
      <div className="product-actions">
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
            readOnly
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
          className={`select-btn ${isInOrder ? "in-order" : ""} ${
            quantity > 0 ? "active" : ""
          }`}
          disabled={quantity === 0 || maxAllowance === 0}
          onClick={handleAddToOrder}
        >
          {isInOrder
            ? `Update Order (${existingOrderItem?.quantity})`
            : quantity > 0
            ? `Add ${quantity} to Order`
            : "Select"}
        </button>
      </div>
    </div>
  );
}
