import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import HitboxContext, { HitboxContextProvider } from "../context/HitboxContext";

export default function DestructribleWord({ word, index }) {
  const [destroyed, setDestroyed] = useState(false);
  // copying string still doesn't work... maybe don't bother
  const wordText = word + " ";
  const wordWhiteSpace = " ".repeat(word.length + 1);

  const { globalVariable, setGlobalVariable } = useContext(HitboxContext);
  console.log(globalVariable);

  const printPosition = () => {
    const componentRef = document.getElementById(`word-living-${index}`);
    const rect = componentRef.getBoundingClientRect();
    console.log("Top:", rect.width);
  };

  if (word == "//") {
    return <div id="line-break" />;
  } else if (destroyed) {
    return (
      <p
        className="destructible-word"
        onClick={() => {
          setDestroyed(!destroyed);
        }}
      >
        {wordWhiteSpace}
      </p>
    );
  } else {
    return (
      <p
        className="destructible-word"
        id={`word-living-${index}`}
        onClick={() => {
          printPosition();
          setDestroyed(!destroyed);
        }}
      >
        {wordText}
      </p>
    );
  }
}

DestructribleWord.propTypes = {
  word: PropTypes.string.isRequired,
};
