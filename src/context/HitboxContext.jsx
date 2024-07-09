import React, { createContext, useState } from "react";

const HitboxContext = createContext();

const gameBoardX = 360;
const gameBoardY = 500;
const gameBoardZ = 3;

const addBoundaries = (x, y, z, { array3D }) => {
  for (let i = 0; i < x; i++) {
    array3D[i][0][0] = true;
    array3D[i][y - 1][0] = true;
  }
  for (let i = 0; i < y; i++) {
    array3D[0][i][1] = true;
    array3D[x - 1][i][1] = true;
  }
};

const create3DArray = (x, y, z) => {
  const array3D = [];
  for (let i = 0; i < x; i++) {
    const array2D = [];
    for (let j = 0; j < y; j++) {
      const array = Array(z).fill(false);
      array2D.push(array);
    }
    array3D.push(array2D);
  }
  addBoundaries(x, y, z, { array3D });
  return array3D;
};

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
