import React, { useContext, useState, useEffect } from "react";
import Player from "./components/Player";
import { PlayersContext } from "../../state/context";
import VictoryPopup from "../Popup/VictoryPopup";

type Player = {
  name: string;
  index: number;
  totalScore: number;
  allScores: number[];
};

export const Players = () => {
  const playersContext = useContext(PlayersContext);
  const [winner, setWinner] = useState<string | null>(null);
  const [showVictoryPopup, setShowVictoryPopup] = useState(false);

  const findWinner = (players: Player[]): void => {
    const allScoresLength = players[0].allScores.length;
    const allSameLength = players.every((player) => player.allScores.length === allScoresLength);

    if (allSameLength) {
      // Find the player with the highest score
      const highestScoringPlayer = players.reduce((maxPlayer, player) => {
        return player.totalScore > maxPlayer.totalScore ? player : maxPlayer;
      });

      // Check if the highest score is greater than 10000
      if (highestScoringPlayer.totalScore > 10000) {
        setWinner(highestScoringPlayer.name);
        setShowVictoryPopup(true);
      }
    }
  };

  useEffect(() => {
    if (playersContext) {
      findWinner(playersContext.players);
    }
  }, [playersContext]);

  if (!playersContext) {
    // Handle the case where the context is undefined
    return <div>Loading...</div>;
  }

  const { players } = playersContext;

  return (
    <div className="players-box" id="players-box">
      {players?.map((player, i) => <Player key={`player-${i}`} player={player} />)}

      {showVictoryPopup && <VictoryPopup message={`${winner}`} onClose={() => setShowVictoryPopup(false)} />}
    </div>
  );
};

export default Players;

// TO DO
// Add final round warning
// make sure all the turns are respected and show warning if one player has one less turn
// allow changing the final goal
