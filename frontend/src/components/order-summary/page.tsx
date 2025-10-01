"use client";

import React, { useState } from "react";
import { useOrderStore } from "@/store/useOrderStore";
import "./order-summary.scss";

export default function OrderSummary() {
  const {
    currentOrder,
    customerInfo,
    orderLoading,
    orderError,
    getOrderTotal,
    getMainComponents,
    getAddOns,
    removeFromOrder,
    updateOrderItemQuantity,
    setCustomerInfo,
    submitOrder,
    clearOrder,
    isOrderValid,
  } = useOrderStore();

  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [customerForm, setCustomerForm] = useState(customerInfo);

  const mainComponents = getMainComponents();
  const addOns = getAddOns();
  const total = getOrderTotal();

  const handleCustomerInfoChange = (field: "name" | "email", value: string) => {
    const newInfo = { ...customerForm, [field]: value };
    setCustomerForm(newInfo);
    setCustomerInfo(newInfo.name, newInfo.email);
  };

  const handleSubmitOrder = async () => {
    const result = await submitOrder();
    if (result) {
      alert(
        `Order submitted successfully! Order number: ${
          result?.orderNumber || result.orderNumber
        }`
      );
      setShowOrderDetails(false);
    }
  };

  if (currentOrder.length === 0) {
    return (
      <div className="order-summary empty">
        <h3>Your Order</h3>
        <p>No items in your order yet. Start building your PC!</p>
      </div>
    );
  }

  return (
    <div className="order-summary">
      <div className="order-header">
        <h3>Your Order ({currentOrder.length} items)</h3>
        <button
          className="toggle-details-btn"
          onClick={() => setShowOrderDetails(!showOrderDetails)}
        >
          {showOrderDetails ? "Hide Details" : "Show Details"}
        </button>
      </div>

      <div className="order-total">
        <h4>Total: £{total.toFixed(2)}</h4>
      </div>

      {showOrderDetails && (
        <div className="order-details">
          {/* Main Components */}
          {mainComponents.length > 0 && (
            <div className="order-section">
              <h4>Main Components ({mainComponents.length})</h4>
              {mainComponents.map((item) => (
                <div key={item.product.id} className="order-item">
                  <div className="item-info">
                    <h5>{item.product?.name || item.product.name}</h5>
                    <p>
                      £{item.unitPrice.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="item-controls">
                    <button
                      onClick={() =>
                        updateOrderItemQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateOrderItemQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromOrder(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-total">
                    £{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div className="order-section">
              <h4>Add-ons ({addOns.length})</h4>
              {addOns.map((item) => (
                <div key={item.product.id} className="order-item">
                  <div className="item-info">
                    <h5>{item.product?.name || item.product.name}</h5>
                    <p>
                      £{item.unitPrice.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="item-controls">
                    <button
                      onClick={() =>
                        updateOrderItemQuantity(
                          item.product.id,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateOrderItemQuantity(
                          item.product.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromOrder(item.product.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="item-total">
                    £{item.totalPrice.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Customer Information */}
          <div className="customer-info">
            <h4>Customer Information</h4>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={customerForm.name}
                onChange={(e) =>
                  handleCustomerInfoChange("name", e.target.value)
                }
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={customerForm.email}
                onChange={(e) =>
                  handleCustomerInfoChange("email", e.target.value)
                }
                placeholder="Enter your email"
              />
            </div>
          </div>

          {orderError && (
            <div className="order-error">
              <p>Error: {orderError}</p>
            </div>
          )}

          {/* Order Actions */}
          <div className="order-actions">
            <button className="clear-order-btn" onClick={clearOrder}>
              Clear Order
            </button>
            <button
              className={`submit-order-btn ${
                isOrderValid() ? "valid" : "invalid"
              }`}
              onClick={handleSubmitOrder}
              disabled={!isOrderValid() || orderLoading}
            >
              {orderLoading ? "Submitting..." : "Submit Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
