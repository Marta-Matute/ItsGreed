import { createContext, useState } from "react";

export type PlayerType = {
  index: number;
  name: string;
  rank: number | null;
  allScores: number[];
  totalScore: number;
};

type PlayerFactoryProps = {
  index: number;
  name?: string;
  rank?: number;
  allScores?: number[];
  totalScore?: number;
};

export const playerFactory = ({ name, index, rank, allScores, totalScore }: PlayerFactoryProps): PlayerType => {
  return {
    name: name || `Player ${index + 1}`,
    index,
    rank: rank || null,
    allScores: allScores || [],
    totalScore: totalScore || 0,
  };
};

export const defaultPlayers = [playerFactory({ index: 0 }), playerFactory({ index: 1 })];

export const PlayersContext = createContext<
  | {
      players: PlayerType[];
      setPlayers: React.Dispatch<React.SetStateAction<PlayerType[]>>;
    }
  | undefined
>(undefined);

// Create the provider component
export const PlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [players, setPlayers] = useState(defaultPlayers);

  return <PlayersContext.Provider value={{ players, setPlayers }}>{children}</PlayersContext.Provider>;
};
