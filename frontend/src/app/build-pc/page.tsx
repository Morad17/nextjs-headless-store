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
    fetchCategories,
    selectCategory,
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
              <h3>Select Category:</h3>
              {categories.map((cat, key) => {
                return (
                  <div className={`category-btn `} key={key}>
                    {cat.name}
                    {cat.required && <p className="required-r">R</p>}
                  </div>
                );
              })}
            </div>
          </div>
          <Products />
        </section>
      </div>
      <div className="build-progress">
        <div className="total-cost">
          <h3 className="cost-title">Your Total Build Cost:</h3>
          <p>£100</p>
        </div>
        <div className="build-progress-bar">
          {requiredCategories.map((cat, key) => {
            return (
              <div className="category-progress-btn" key={key}>
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
