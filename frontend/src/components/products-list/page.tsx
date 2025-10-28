"use client";

import React, { useState, useEffect } from "react";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import ProductCard from "@/components/productCard/page";
import "./products-list.scss";

export default function Products() {
  const {
    currentCategoryProducts,
    productsLoading,
    selectedCategoryId,
    productsByCategory,
  } = useBuildPcStore();

  const [showDelayedLoading, setShowDelayedLoading] = useState(false);

  // ✅ Only show loading spinner after a delay, and only if no cached data
  useEffect(() => {
    if (productsLoading) {
      // Check if we have any cached data for the selected category
      const hasCachedData =
        selectedCategoryId &&
        productsByCategory[selectedCategoryId] &&
        productsByCategory[selectedCategoryId].length > 0;

      if (!hasCachedData) {
        // Only show loading if we don't have cached data
        const timer = setTimeout(() => {
          setShowDelayedLoading(true);
        }, 200); // Small delay to prevent flash

        return () => clearTimeout(timer);
      }
    } else {
      setShowDelayedLoading(false);
    }
  }, [productsLoading, selectedCategoryId, productsByCategory]);

  // ✅ Show products immediately if available
  if (currentCategoryProducts.length > 0) {
    return (
      <div className="products-list">
        {currentCategoryProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }

  // ✅ Only show loading state if we're actually loading and have no cached data
  if (showDelayedLoading && productsLoading) {
    return (
      <div className="products-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  // ✅ Show empty state
  if (!productsLoading && currentCategoryProducts.length === 0) {
    return (
      <div className="no-products">
        <p>No products available for this category.</p>
      </div>
    );
  }

  return null;
}
