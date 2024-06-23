import { useRef, useState } from "react";
import PropTypes from "prop-types";
import DestructribleWord from "./TargetWord";
import Ball from "./Ball";

export default function TargetParagraph({ text }) {
  const [inputText, setInputText] = useState(text);
  const textArray = inputText.split(" ");
  const wordRefs = useRef([]);

  const handleClick = () => {
    const specificRef = wordRefs.current[3];
    specificRef.destroy();
  };

  return (
    <div className="target-paragraph">
      {textArray?.map((word, index) => (
        <DestructribleWord
          word={word}
          key={index}
          index={index}
          ref={(el) => (wordRefs.current[index] = el)}
        />
      ))}
      <Ball />
      {/* <button onClick={() => handleClick()}>Destroy</button> */}
    </div>
  );
}

TargetParagraph.propTypes = {
  text: PropTypes.string.isRequired,
};
