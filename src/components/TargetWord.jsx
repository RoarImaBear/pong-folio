import PropTypes from "prop-types";
import {
  forwardRef,
  useContext,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import HitboxContext, { HitboxContextProvider } from "../context/HitboxContext";

const DestructribleWord = forwardRef(function DestructribleWordComponent(
  { word, index },
  ref
) {
  const componentID = `target-word-${index}`;
  const wordText = word + " ";
  const [destroyed, setDestroyed] = useState(false);

  const { hitboxes, setHitboxes } = useContext(HitboxContext);

  // Updates Hitboxes array with position and properties
  // TODO: Thicken the line so that if ball is travelling || handle movement in decimals of a pixel (smoother motion??)
  useEffect(() => {
    setHitbox(index, true);
  }, []);

  useImperativeHandle(ref, () => ({
    destroy: () => {
      setDestroyed(true);
      const componentRef = document.getElementById(componentID);
      componentRef.style.opacity = 0;
      setHitbox(null, null);
      console.log(`${index} boom ${destroyed}`);
    },
  }));

  const setHitbox = (id, boolean) => {
    const componentRef = document.getElementById(componentID);
    const updatedHitboxes = [...hitboxes];

    const startX = componentRef?.offsetLeft;
    const endX = componentRef?.offsetLeft + componentRef?.offsetWidth;
    const startY = componentRef?.offsetTop;
    const endY = componentRef?.offsetTop + componentRef?.offsetHeight;

    // Set horizontals
    for (let i = startX; i < endX; i++) {
      console.log();
      updatedHitboxes[i][startY][0] = boolean;
      updatedHitboxes[i][startY][2] = id;
      updatedHitboxes[i][endY][0] = boolean;
      updatedHitboxes[i][endY][2] = id;
    }

    // Set verticals
    for (let i = startY; i < endY; i++) {
      console.log();
      updatedHitboxes[startX][i][1] = boolean;
      updatedHitboxes[startX][i][2] = id;
      updatedHitboxes[endX][i][1] = boolean;
      updatedHitboxes[endX][i][2] = id;
    }
    setHitboxes(updatedHitboxes);
  };

  return (
    <p
      className="target-word"
      id={componentID}
      ref={ref}
      onClick={(e) => {
        console.log(ref);
        e.target.style.opacity = 0;
      }}
    >
      {wordText}
    </p>
  );
});

DestructribleWord.propTypes = {
  word: PropTypes.string.isRequired,
};

export default DestructribleWord;
