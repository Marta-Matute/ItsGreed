import React, { useContext, useState } from "react";
import "./Header.css";
import RulesPopup from "../components/Popup/RulesPopup";
import dice from "../images/small-logo.svg";
import dice2 from "../images/small-logo2.svg";
import ConfirmationPopup from "./Popup/ConfirmationPopup";
import { defaultPlayers, PlayersContext } from "../state/context";

const Header: React.FC = () => {
  const playersContext = useContext(PlayersContext);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);

  if (!playersContext) {
    // Handle the case where the context is undefined
    return <div>Loading...</div>;
  }
  const { players, setPlayers } = playersContext;

  const restartGame = () => {
    setShowNewGamePopup(false);
    setPlayers(defaultPlayers);
  };

  return (
    <header className="header">
      <div className="logo-container">
        {/*<img src={dice} alt="It's Greeed" className="logo" />*/}
        <img src={dice2} alt="It's Greeed" className="logo" />
      </div>
      <div className="actions">
        <button className="action-button" onClick={() => setShowNewGamePopup(true)}>
          New Game
        </button>
        <button className="action-button" onClick={() => setShowRulesPopup(true)}>
          Rules
        </button>
        {showNewGamePopup && (
          <ConfirmationPopup
            message="Are you sure you want to start a new game?"
            onConfirm={restartGame}
            onCancel={() => setShowNewGamePopup(false)}
          />
        )}
        {showRulesPopup && <RulesPopup onClose={() => setShowRulesPopup(false)} />}
      </div>
    </header>
  );
};

export default Header;
