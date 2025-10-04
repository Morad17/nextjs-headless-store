"use client";

import { useOrderStore } from "@/store/useOrderStore";
import React, { useEffect, useState } from "react";
import PcModel from "../../components/pc-model/PcModel";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

import "./order-summary.scss";
import OrderProductCard from "@/components/order-product-card/page";

export default function OrderSummary() {
  const { fetchOrders, currentOrder, orderLoading, orderError, getOrderTotal } =
    useOrderStore();

  // State for toggle
  const [showMainComponents, setShowMainComponents] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  const orderTotal = getOrderTotal();

  // Safety check for currentOrder
  const caseComponent = currentOrder?.filter(
    (cat) => cat.category === "Cases"
  )[0];

  const nonCaseComponents = currentOrder?.filter(
    (cat) => cat.category !== "Cases"
  );
  const mainComponents = nonCaseComponents.filter(
    (com) => com.isMainComponent === true
  );

  const addOnComponents = nonCaseComponents.filter(
    (com) => com.isMainComponent === false
  );

  // Get components to display based on toggle
  const componentsToDisplay = showMainComponents
    ? mainComponents
    : addOnComponents;

  return (
    <div className="order-summary-page">
      <div className="order-summary-content">
        <section className="left-section">
          {/* <div className="model-pc">
            <Canvas
              camera={{ position: [1, 1, 1] }}
              style={{ width: "100%", height: "100%" }}
            >
              <Environment preset="warehouse" />
              <OrbitControls enableZoom={false} />
              <PcModel />
            </Canvas>
          </div> */}
          <div className="order-case">
            {caseComponent ? (
              <OrderProductCard component={caseComponent} />
            ) : (
              <div className="no-case-placeholder">
                <p>No Case Selected</p>
              </div>
            )}
          </div>

          <div className="order-gallery-toggle"></div>

          <div className="order-components-gallery">
            {orderLoading && <p>Loading order...</p>}
            {orderError && <p>Error: {orderError}</p>}
            {!orderLoading && !orderError && (
              <>
                {componentsToDisplay.length > 0 ? (
                  componentsToDisplay.map((co, key) => (
                    <OrderProductCard
                      key={`${showMainComponents ? "main" : "addon"}-${key}`}
                      component={co}
                    />
                  ))
                ) : (
                  <div className="no-components">
                    <p>
                      No {showMainComponents ? "Main Components" : "Add-ons"}{" "}
                      Selected
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${showMainComponents ? "active" : ""}`}
              onClick={() => setShowMainComponents(true)}
            >
              Main Components ({mainComponents.length})
            </button>
            <button
              className={`toggle-btn ${!showMainComponents ? "active" : ""}`}
              onClick={() => setShowMainComponents(false)}
            >
              Add-ons ({addOnComponents.length})
            </button>
          </div>
        </section>

        <div className="right-section">
          <h2 className="order-summary-title">Order Summary</h2>
          {}
        </div>
      </div>

      <div className="order-summary-cost">
        <div className="price-total">
          <h2>Order Total: £{orderTotal.toFixed(2)}</h2>
        </div>
        <div className="checkout-button">
          <button className="pay-now-btn">Pay Now</button>
        </div>
      </div>
    </div>
  );
}
