"use client";

import React, { useEffect } from "react";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import ProductCard from "@/components/productCard/page";
import "./products-list.scss";

export default function Products() {
  const {
    currentCategoryProducts,
    productsLoading,
    productsError,
    selectedCategoryId,
    categories,
    fetchProductsByCategory,
  } = useBuildPcStore();

  useEffect(() => {
    if (selectedCategoryId) {
      fetchProductsByCategory(selectedCategoryId);
    }
  }, [selectedCategoryId, fetchProductsByCategory]);

  const selectedCategory = categories.find(
    (cat) => cat.id === selectedCategoryId
  );

  if (!selectedCategoryId) {
    return (
      <div className="products-page">
        <div className="no-category-selected">
          <h3>Select a category to view products</h3>
          <p>
            Choose a component category from the list above to start building
            your PC.
          </p>
        </div>
      </div>
    );
  }

  if (productsLoading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          <p>Loading products for {selectedCategory?.name}...</p>
        </div>
      </div>
    );
  }

  if (productsError) {
    return (
      <div className="products-page">
        <div className="products-error">
          <p>Error: {productsError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h3>
          {selectedCategory?.name} Products ({currentCategoryProducts.length})
        </h3>
      </div>

      <div className="products-list">
        {currentCategoryProducts.length > 0 ? (
          currentCategoryProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              maxAllowance={selectedCategory?.maxAllowance || 1}
            />
          ))
        ) : (
          <div className="no-products">
            <p>No products found for {selectedCategory?.name}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
