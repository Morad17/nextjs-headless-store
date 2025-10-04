"use client";

import { useOrderStore } from "@/store/useOrderStore";
import Image from "next/image";
import React, { useEffect } from "react";

import placeholder from "../../../public/assets/images/placeholder-image.png";
import "./order-";

export default function OrderSummary() {
  const { fetchOrders, currentOrder, orderLoading, orderError } =
    useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Console log only the components when currentOrder changes
  useEffect(() => {
    console.log(currentOrder);
  }, [currentOrder]);

  const getImageUrl = (product: any) => {
    try {
      if (
        product.images &&
        Array.isArray(product.images) &&
        product.images.length > 0
      ) {
        const imageUrl = product.images[0].url;
        if (imageUrl) {
          return imageUrl.startsWith("http")
            ? imageUrl
            : `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`;
        }
      }
      return placeholder;
    } catch (error) {
      console.error("Error getting image URL:", error);
      return placeholder;
    }
  };

  return (
    <div className="order-summary-page">
      <div className="order-summary-content">
        <section className="left-section">
          <div className="order-components-gallery">
            {orderLoading && <p>Loading order...</p>}
            {orderError && <p>Error: {orderError}</p>}
            {currentOrder ? (
              currentOrder.map((co, key) => {
                return (
                  <div className="order-component-card">
                    <div className="order-component-image">
                      <Image
                        src={getImageUrl(co.product)}
                        alt={co.category}
                        width={200}
                        height={150}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No Orders To Display</p>
            )}
          </div>
        </section>
        <div className="right-section"></div>
      </div>
      <div className="order-summary-cost"></div>
    </div>
  );
}
