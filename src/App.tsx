import { useContext, useState } from "react";
import "./App.css";
import "./components/Players/components/player.css";
import { Players } from "./components/Players/Players";
import { playerFactory, PlayersContext } from "./state/context";
import { GreedLogo } from "./components/GreedLogo";
import Header from "./components/Header"; // Import the Header component

function App() {
  const playersContext = useContext(PlayersContext);

  if (!playersContext) {
    // Handle the case where the context is undefined
    return <div>Loading...</div>;
  }
  const { players, setPlayers } = playersContext;

  const addPlayer = () => {
    // The index starts at 0, but for everything else (player name, etc) we want it to start at 1
    const newPlayerIndex = players[players.length - 1].index + 1;

    const newPlayer = playerFactory({ index: newPlayerIndex });
    setPlayers((players) => [...players, newPlayer]);
  };

  return (
    <div className="App">
      <Header />
      <div className="logo-box">
        <GreedLogo fill="rgb(255,152,0)" />
      </div>

      <Players />

      <div className="add-player-box">
        {/*<PlusSquare className="add-player-icon big-icon" onClick={addPlayer}></PlusSquare>*/}
        <div className="add-player-icon" onClick={addPlayer}>
          Add Player
        </div>
      </div>
    </div>
  );
}

export default App;
