import React, { ChangeEvent, useContext, useState } from "react";
import "./player.css";
import { Trash2, Edit3 } from "react-feather";
import PlayerNameInput from "./PlayerNameInput";
import AlertPopup from "../../Popup/AlertPopup";
import { PlayersContext, PlayerType } from "../../../state/context";

type PlayerProps = {
  player: PlayerType;
};

function Player({ player }: PlayerProps) {
  const { index, name, rank, allScores, totalScore } = player;
  const playersContext = useContext(PlayersContext);
  const [inputValue, setInputValue] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  if (!playersContext) {
    // Handle the case where the context is undefined
    return <div>Loading...</div>;
  }

  const { players, setPlayers } = playersContext;

  const playerId = `player-${index}`;

  const addScoreValue = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      const newScore = Number((e.target as HTMLInputElement).value);
      if (setPlayers) {
        setPlayers((players) => {
          const updatedPlayers = players.map((player) => {
            if (player.index === index) {
              const newTotalScore = player.totalScore + newScore;

              const updatedPlayer = {
                ...player,
                allScores: [...player.allScores, newScore],
                totalScore: newTotalScore,
              };

              return updatedPlayer;
            } else {
              return player;
            }
          });

          const updatedPlayerRanks = updatePlayerRanks(updatedPlayers);

          return updatedPlayerRanks;
        });
      }

      setInputValue("");

      selectNextPlayerInput();
    }
  };

  const selectNextPlayerInput = () => {
    const nextPlayer = document.getElementById(playerId)?.nextSibling;

    let hasInput = false;

    const focusInput = (input: ChildNode | null | undefined) => {
      input?.childNodes.forEach((child) => {
        if (child.nodeName === "INPUT") {
          (child as HTMLElement).focus();
          hasInput = true;
        }
      });
    };

    focusInput(nextPlayer);

    if (!hasInput) {
      const playerBox = document.getElementById("players-box");
      focusInput(playerBox?.firstChild);
    }
  };

  const deletePlayer = () => {
    if (players.length === 1) {
      //alert("you need at least two players");
      setShowPopup(true);
    } else {
      setPlayers((players) => {
        const updatedPlayers = players.filter((player) => player.index !== index);

        const updatedPlayerRanks = updatePlayerRanks(updatedPlayers);

        return updatedPlayerRanks;
      });
    }
  };

  const setInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setName = (index: number, newName: string) => {
    setPlayers((players) => {
      return players.map((player) => {
        if (player.index === index) {
          return { ...player, name: newName };
        }
        return player;
      });
    });
  };

  const updatePlayerRanks = (players: PlayerType[]) => {
    let allTotalScores: number[] = [];
    allTotalScores = players.map((player) => player.totalScore);

    const sortedAllTotalScores = Array.from(new Set(allTotalScores)).sort((a, b) => b - a);

    return players.map((player) => {
      const scoreIndex = sortedAllTotalScores.findIndex((score) => score === player.totalScore);
      return { ...player, rank: scoreIndex };
    });
  };

  return (
    <div className="player" id={playerId}>
      <Trash2 className="gray-icon" onClick={deletePlayer}></Trash2>
      <div>
        <PlayerNameInput name={name} index={index} setName={setName} />
      </div>
      <p className="total-score">
        <span style={{ fontSize: "0.6em" }}>
          {player.rank != null &&
            player.allScores.length > 0 &&
            (player.rank === 0
              ? "🥇"
              : player.rank === players.length - 1
                ? "🤡"
                : player.rank === 1
                  ? "🥈"
                  : player.rank === 2
                    ? "🥉"
                    : "")}
        </span>
        {totalScore}
      </p>
      <input
        className="score-input"
        placeholder="New Score"
        type="number"
        onKeyUp={addScoreValue}
        id={`new-score-input-${index}`}
        value={inputValue}
        onChange={setInputValueHandler}
      />
      <div>
        {[...allScores].reverse().map((score, i) => {
          const deleteScoreValue = () => {
            const updatedPlayers = players.map((player) => {
              if (player.index === index) {
                const newScores = [...player.allScores].reverse().filter((_, scrIdx) => scrIdx !== i);
                return { ...player, allScores: newScores, totalScore: totalScore - score };
              }

              return player;
            });

            const updatedPlayerRanks = updatePlayerRanks(updatedPlayers);

            setPlayers(updatedPlayerRanks);
          };
          return (
            <div className="score-instance" key={`score-${i}`}>
              <p>{score}</p>
              <Edit3 className="gray-icon "></Edit3>
              <Trash2 className="gray-icon gray-trash2" onClick={deleteScoreValue} />
            </div>
          );
        })}
      </div>
      {showPopup && <AlertPopup message="You need at least one player" onClose={() => setShowPopup(false)} />}
    </div>
  );
}

export default Player;
