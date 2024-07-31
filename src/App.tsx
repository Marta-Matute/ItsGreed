import { useContext, useEffect, useState } from "react";
import logo from "./images/its-greeed.svg";
import "./App.css";
import "./components/Players/components/player.css";
import ConfirmationPopup from "./components/Popup/ConfirmationPopup";
import { Players } from "./components/Players/Players";
import { defaultPlayers, PlayersContext } from "./state/context";

function App() {
  const [isRestartingGame, setIsRestartingGame] = useState(false);
  const playersContext = useContext(PlayersContext);
  const [showNewGamePopup, setShowNewGamePopup] = useState(false);

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
      <div className="logo-box">
        <img className="logo" src={logo} alt="it's greeeed" />
      </div>
      <div className="options-box">
        <button className="options-button" onClick={handleNewGame}>
          New game
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
    </div>
  );
}

export default App;
