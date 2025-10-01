"use client";

import React, { useEffect } from "react";
import "./build-pc.scss";
import PcModel from "./PcModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Products from "@/components/products-list/page";
import { useBuildPcStore } from "@/store/useBuildPcStore";
import { useOrderStore } from "@/store/useOrderStore";

export default function BuildPc() {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    selectedCategoryId,
    selectedComponents,
    showMainComponents,
    fetchCategories,
    selectCategory,
    toggleComponentType,
    getSelectedComponentForCategory,
    getUnselectedRequiredCategories,
    getRequiredCategories,
    getOptionalCategories,
    getTotalPrice,
    isBuildComplete,
  } = useBuildPcStore();

  // Add order store functions
  const { clearOrder, currentOrder, getOrderTotal, getMainComponents } =
    useOrderStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const requiredCategories = getRequiredCategories();

  // Get categories to display based on toggle
  const displayedCategories = showMainComponents
    ? getRequiredCategories()
    : getOptionalCategories();

  // Handle reset order with confirmation
  const handleResetOrder = () => {
    if (currentOrder.length === 0) {
      alert("Order is already empty!");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to reset your order? This will remove all ${currentOrder.length} items from your order.`
    );

    if (confirmed) {
      clearOrder();
      alert("Order has been reset successfully!");
    }
  };

  // Function to check if a category has a main component selected in the order
  const isCategoryInOrder = (categoryName: string) => {
    const mainComponents = getMainComponents();
    return mainComponents.some((item) => item.category === categoryName);
  };

  return (
    <div className="build-pc-page">
      <div className="build-pc-content">
        <section className="left-section">
          <div className="build-display">
            <h2 className="build-text">Build Your Gaming Pc</h2>
            <div className="model-pc">
              <Canvas
                camera={{ position: [1, 1, 1] }}
                style={{ width: "100%", height: "100%" }}
              >
                <Environment preset="warehouse" />
                <OrbitControls enableZoom={false} />
                <PcModel />
              </Canvas>
            </div>
          </div>
        </section>
        <section className="right-section">
          <div className="category-order">
            <div className="categories-section">
              <div
                //Toggle for main components / Add On //
                className={`category-type-selector ${
                  !showMainComponents ? "add-ons-active" : ""
                }`}
              >
                <div className="main-components">
                  <a
                    className={`cts-btn ${showMainComponents ? "active" : ""}`}
                    onClick={() => toggleComponentType(true)}
                  >
                    Main Components ({getRequiredCategories().length})
                  </a>
                </div>
                <div className="add-on-components">
                  <a
                    className={`cts-btn ${!showMainComponents ? "active" : ""}`}
                    onClick={() => toggleComponentType(false)}
                  >
                    Add ons ({getOptionalCategories().length})
                  </a>
                </div>
              </div>
              <div className="all-categories">
                {categoriesLoading && <p>Loading categories...</p>}
                {categoriesError && (
                  <p className="error">Error: {categoriesError}</p>
                )}

                {!categoriesLoading &&
                  !categoriesError &&
                  displayedCategories.map((cat, key) => {
                    const isSelected = selectedCategoryId === cat.id;
                    return (
                      <div
                        className={`category-btn `}
                        key={key}
                        onClick={() => selectCategory(cat.id)}
                        style={{ cursor: "pointer" }}
                      >
                        <img
                          src={`/assets/icons/${cat.slug}.png`}
                          className="category-icon"
                          alt={cat.name}
                          onError={(e) => {
                            // Fallback to default icon if specific icon doesn't exist
                            e.currentTarget.src = "/assets/icons/default.png";
                          }}
                        />
                        {cat.name}
                      </div>
                    );
                  })}

                {!categoriesLoading &&
                  !categoriesError &&
                  displayedCategories.length === 0 && (
                    <p className="no-categories">
                      No{" "}
                      {showMainComponents
                        ? "main components"
                        : "add-on components"}{" "}
                      available.
                    </p>
                  )}
              </div>
            </div>
          </div>
          <Products />
        </section>
      </div>
      <div className="build-progress">
        <div className="total-cost">
          <h3 className="cost-title">Your Total Build Cost:</h3>
          <p>£{getOrderTotal().toFixed(2)}</p>
        </div>
        <div className="reset-order-button">
          <button
            className={`reset-btn ${
              currentOrder.length === 0 ? "disabled" : ""
            }`}
            onClick={handleResetOrder}
            disabled={currentOrder.length === 0}
            title={
              currentOrder.length === 0
                ? "No items to reset"
                : "Reset all items in order"
            }
          >
            🗑️ Reset Order
          </button>
        </div>
        <div className="build-progress-bar">
          {requiredCategories.map((cat, key) => {
            const isSelected = selectedCategoryId === cat.id;
            const hasComponent = getSelectedComponentForCategory(cat.id);
            const categoryName = cat?.name;
            const isInOrder = isCategoryInOrder(categoryName);

            return (
              <div
                className={`category-progress-btn ${
                  isSelected ? "active" : ""
                } ${hasComponent ? "completed" : ""} ${
                  isInOrder ? "in-order" : ""
                }`}
                key={key}
                // Remove onClick functionality
                style={{ cursor: "default" }}
              >
                {categoryName}
              </div>
            );
          })}
        </div>
        <div className="compete-order">
          <a href="" className="complete-order-btn">
            Complete
          </a>
        </div>
      </div>
    </div>
  );
}
