import React from "react";
import "./rulesPopup.css";

type RulesPopupProps = {
  onClose: () => void;
};

const RulesPopup: React.FC<RulesPopupProps> = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content rules-popup">
        <h2>Basic Rules</h2>
        <p>Setup: Each player takes turns rolling six dice.</p>
        <p>Rolling: On a player's turn, they roll all six dice.</p>
        <p>
          Scoring: After each roll, the player can choose to keep any dice that score points. They must keep at least
          one scoring die per roll.
        </p>
        <p>Re-rolling: The player can then re-roll the remaining dice that were not kept.</p>
        <p>
          Banking Points: After each roll, the player can choose to either "bank" their points (end their turn and add
          the points to their total score) or continue rolling the remaining dice to try for more points.
        </p>
        <p>
          Hot Dice: If all six dice score points in a single turn (a "hot dice" situation), the player may roll all six
          dice again and continue their turn.
        </p>
        <p>
          Busting: If a roll results in no points (no scoring dice), the player "busts" and loses all points accumulated
          in that turn.
        </p>
        <h3>Scoring</h3>
        <p>Single 1: 100 points</p>
        <p>Single 5: 50 points</p>
        <p>
          Three of a kind (other than 1s): Value of the die multiplied by 100 (e.g., three 2s = 200 points, three 3s =
          300 points)
        </p>
        <p>Three 1s: 1000 points</p>
        <p>Four of a kind: Triple the score of three of a kind (e.g., four 2s = 400 points)</p>
        <p>Five of a kind: Quadruple the score of three of a kind (e.g., five 2s = 800 points)</p>
        <p>Six of a kind: Quintuple the score of three of a kind (e.g., six 2s = 1000 points)</p>
        <p>Straight (1, 2, 3, 4, 5, 6): 1500 points</p>
        <p>Three pairs: 1500 points</p>
        <h3>Winning</h3>
        <p>
          The game continues until a player reaches or exceeds a predetermined winning score, usually 10,000 points.
          Once a player reaches this score, the other players get one final turn to try to surpass the leader's score.
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RulesPopup;
