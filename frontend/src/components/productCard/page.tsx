import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useOrderStore } from "@/store/useOrderStore";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import { toast } from "react-toastify";
import ProductInfoModal from "@/components/product-info-modal/page";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addToOrder, currentOrder, replaceOrderItem, removeFromOrder } =
    useOrderStore();
  const { showMainComponents, categories, selectedCategoryId } =
    useBuildPcStore();

  // Extract data from product object
  const { name: title, price, images } = product;

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

  // Get category info
  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );
  const categoryName = selectedCategory?.name || "Unknown";
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
    e.stopPropagation();
    if (quantity < maxAllowance) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= maxAllowance) {
      setQuantity(value);
    }
  };

  const handleMoreInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCardClick = () => {
    // If product is already in order, remove it (unselect)
    if (isInOrder) {
      removeFromOrder(product.id);
      toast.info(`${title} removed from order`);
      return;
    }

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
      toast.success(
        `Replaced ${existingCategoryItem.product.name} with ${title}`
      );
    } else {
      // Normal add behavior
      addToOrder(product, orderQuantity, categoryName, isMainComponent);
      toast.success(`${title} added to order`);
    }
  };

  return (
    <>
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
          <Image
            src={imageUrl}
            alt={title}
            width={200}
            height={150}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
        <div className="product-text">
          <h3 className="product-title">{title}</h3>
          <div className="product-cost-info-row">
            <p className="product-cost">+ £{price.toFixed(2)}</p>
            <div className="more-info-btn" onClick={handleMoreInfoClick}>
              <a type="button">Info</a>
            </div>
          </div>
        </div>

        {/* Only show quantity controls if maxAllowance > 1 and not in order */}
        {maxAllowance > 1 && !isInOrder && (
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

      {/* Modal with updated prop name */}
      <ProductInfoModal
        product={product}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
