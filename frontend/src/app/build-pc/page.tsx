"use client";

import React, { useEffect } from "react";
import "./build-pc.scss";
import PcModel from "./PcModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Products from "@/components/products-list/page";
import { useBuildPcStore } from "@/store/useBuildPcStore";

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

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const requiredCategories = getRequiredCategories();

  // Get categories to display based on toggle
  const displayedCategories = showMainComponents
    ? getRequiredCategories()
    : getOptionalCategories();

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
            <div className="all-categories">
              <div className="category-type-selector">
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
                      {/* {cat.required && <p className="required-r">R</p>} */}
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
          <Products />
        </section>
      </div>
      <div className="build-progress">
        <div className="total-cost">
          <h3 className="cost-title">Your Total Build Cost:</h3>
          <p>£{getTotalPrice().toFixed(2)}</p>
        </div>
        <div className="build-progress-bar">
          {requiredCategories.map((cat, key) => {
            const isSelected = selectedCategoryId === cat.id;
            const hasComponent = getSelectedComponentForCategory(cat.id);

            return (
              <div
                className={`category-progress-btn ${
                  isSelected ? "active" : ""
                } ${hasComponent ? "completed" : ""}`}
                key={key}
                onClick={() => selectCategory(cat.id)}
                style={{ cursor: "pointer" }}
              >
                {cat.name}
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
