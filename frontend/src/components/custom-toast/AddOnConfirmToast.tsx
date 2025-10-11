import React from "react";
import { toast } from "react-toastify";
import "./AddOnConfirmToast.scss";

interface AddOnConfirmToastProps {
  onCheckAddOns: () => void;
  onProceed: () => void;
  closeToast: () => void;
}

const AddOnConfirmToast: React.FC<AddOnConfirmToastProps> = ({
  onCheckAddOns,
  onProceed,
  closeToast,
}) => {
  return (
    <div className="addon-confirm-toast">
      <div className="toast-header">
        <h3>⚠️ No Add-ons Selected</h3>
      </div>
      <div className="toast-content">
        <p>
          You haven't selected any add-on components. Would you like to check
          available add-ons or proceed with just the main components?
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
          Proceed
        </button>
      </div>
    </div>
  );
};

export default AddOnConfirmToast;
