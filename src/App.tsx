import { useContext, useState } from "react";
import "./App.css";
import "./components/Players/components/player.css";
import ConfirmationPopup from "./components/Popup/ConfirmationPopup";
import { Players } from "./components/Players/Players";
import { defaultPlayers, PlayersContext } from "./state/context";
import RulesPopup from "./components/Popup/RulesPopup";
import { GreedLogo } from "./components/GreedLogo";

function App() {
  const [isRestartingGame, setIsRestartingGame] = useState(false);
  const playersContext = useContext(PlayersContext);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);
  const [showRulesPopup, setShowRulesPopup] = useState(false);

  if (!playersContext) {
    // Handle the case where the context is undefined
    return <div>Loading...</div>;
  }
  const { players, setPlayers } = playersContext;

  const confirmNewGame = () => {
    setShowNewGamePopup(true);
  };

  const restartGame = () => {
    setShowNewGamePopup(false);
    setIsRestartingGame(true);

    setPlayers([]);

    setTimeout(() => {
      setPlayers(defaultPlayers);
      setIsRestartingGame(false);
    }, 1000);
  };

  const handleNewGame = () => {
    // alert("Are you sure you want to start a new game? Any previous scores and players will be deleted");
    confirmNewGame();
  };

  return (
    <div className="App">
      {/* Include the CurvedPath component */}
      <div className="logo-box">
        {/* <img className="logo" src={logo} alt="it's greeeed" />*/}
        <GreedLogo fill="white" />
      </div>
      <div className="options-box">
        <button className="options-button" onClick={handleNewGame}>
          New game
        </button>
        <button className="options-button" onClick={() => setShowRulesPopup(true)}>
          Rules
        </button>
      </div>

      {isRestartingGame && <div>Cleaning Board...</div>}

      <Players isRestartingGame={isRestartingGame} />

      {showNewGamePopup && (
        <ConfirmationPopup
          message="Are you sure you want to start a new game?"
          onConfirm={restartGame}
          onCancel={() => setShowNewGamePopup(false)}
        />
      )}
      {showRulesPopup && <RulesPopup onClose={() => setShowRulesPopup(false)} />}
    </div>
  );
}

export default App;
