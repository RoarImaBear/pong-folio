import { useContext, useRef, useState } from "react";
import PropTypes from "prop-types";
import DestructribleWord from "./TargetWord";

export default function TargetParagraph({ text }) {
  const [inputText, setInputText] = useState(text);
  const textArray = inputText.split(" ");

  return (
    <div className="paragraph">
      {textArray?.map((word, index) => (
        <DestructribleWord word={word} index={index} key={index} />
      ))}
    </div>
  );
}

TargetParagraph.propTypes = {
  text: PropTypes.string.isRequired,
};
