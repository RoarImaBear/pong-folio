import React, { createContext, useState } from "react";

const HitboxContext = createContext();

const gameBoardX = 360;
const gameBoardY = 700;
const gameBoardZ = 3;

const create3DArray = (x, y, z) => {
  const array3D = [];
  for (let i = 0; i < x; i++) {
    const array2D = [];
    for (let j = 0; j < y; j++) {
      const array = Array(z).fill(null);
      array2D.push(array);
    }
    array3D.push(array2D);
  }

  return array3D;
};

// Won't work -- fills array with same instance.
// const array = Array(x).fill(Array(y).fill(Array(z).fill(0)));

export const HitboxContextProvider = ({ children }) => {
  const [hitboxes, setHitboxes] = useState(
    create3DArray(gameBoardX, gameBoardY, gameBoardZ)
  );

  return (
    <HitboxContext.Provider value={{ hitboxes, setHitboxes }}>
      {children}
    </HitboxContext.Provider>
  );
};

export default HitboxContext;
