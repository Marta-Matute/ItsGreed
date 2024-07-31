import { useContext } from "react";
import Player from "./components/Player";
import { PlusSquare } from "react-feather";
import { playerFactory, PlayersContext } from "../../state/context";

type PlayersProps = {
  isRestartingGame: boolean;
};

export const Players = ({ isRestartingGame }: PlayersProps) => {
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
    <div className="players-box" id="players-box">
      {players?.map((player, i) => {
        return <Player key={`player-${i}`} player={player} />;
      })}

      {!isRestartingGame && (
        <div className="plus-circle">
          <PlusSquare className="gray-icon big-icon" onClick={addPlayer}></PlusSquare>
        </div>
      )}
    </div>
  );
};
