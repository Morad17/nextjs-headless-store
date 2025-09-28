"use client";

import React from "react";
import "./build-pc.scss";
import PcModel from "./PcModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Products from "@/components/products-list/page";

export default function BuildPc() {
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
          <div className="category-order"></div>
          <Products />
        </section>
      </div>
      <div className="checkout-row"></div>
    </div>
  );
}
