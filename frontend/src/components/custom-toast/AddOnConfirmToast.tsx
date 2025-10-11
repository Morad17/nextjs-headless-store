import React from "react";
import "./AddOnConfirmToast.scss";

interface AddOnConfirmToastProps {
  onCheckAddOns: () => void;
  onProceed: () => void;
  closeToast: () => void;
}

export default function AddOnConfirmToast({
  onCheckAddOns,
  onProceed,
  closeToast,
}: AddOnConfirmToastProps) {
  return (
    <div className="addon-confirm-toast">
      <div className="toast-header">
        <h3>🎯 Complete Your Build!</h3>
      </div>

      <div className="toast-content">
        <p>
          Great! You&apos;ve selected all the main components. Would you like to
          add any optional components before completing your order?
        </p>
      </div>

      <div className="toast-actions">
        <button
          className="btn-check-addons"
          onClick={() => {
            onCheckAddOns();
            closeToast();
          }}
        >
          Check Add-ons
        </button>
        <button
          className="btn-proceed"
          onClick={() => {
            onProceed();
            closeToast();
          }}
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
}
