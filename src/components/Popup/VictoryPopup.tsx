import React from "react";
import "./VictoryPopup.css";

type PopupProps = {
  message: string;
  onClose: () => void;
};

const VictoryPopup: React.FC<PopupProps> = ({ message, onClose }) => {
  return (
    <div className="victory-popup-overlay">
      <div className="victory-popup-content">
        <p>{message}</p>
        <p>👑</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default VictoryPopup;
