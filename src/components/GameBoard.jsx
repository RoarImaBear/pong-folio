import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import DestructribleWord from "./TargetWord";
import BallAndPaddle from "./BallAndPaddle";

export default function GameBoard({ text }) {
  const [inputText, setInputText] = useState(text);
  const textArray = inputText.split(" ");
  const wordRefs = useRef([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const gameBoard = document.getElementById("gameBoard");
    if (gameBoard) {
      gameBoard.addEventListener("click", handleClick);
      return () => {
        gameBoard.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const handleClick = (event) => {
    event.preventDefault();
    const paddle = document.getElementById("paddle");
    if (paddle) {
      paddle.focus();
    }
  };

  return (
    <div className="gameBoard" onClick={handleClick}>
      {textArray?.map((word, index) => (
        <DestructribleWord
          word={word}
          key={index}
          index={index}
          ref={(el) => (wordRefs.current[index] = el)}
        />
      ))}
      <BallAndPaddle targetRefs={wordRefs} setScore={setScore} />
      <div id="score-board">
        <p>Score: {score}</p>
      </div>
    </div>
  );
}

GameBoard.propTypes = {
  text: PropTypes.string.isRequired,
};

// width: 360px;
// height: 700px;
