import React from "react";
import "./confirmationPopup.css";

type ConfirmationPopupProps = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onConfirm}>Restart</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
