import React, { createContext, useState } from "react";

const HitboxContext = createContext();

const create3DArray = (x, y, z) => {
  const array3D = [];
  for (let i = 0; i < x; i++) {
    const array2D = [];
    for (let j = 0; j < y; j++) {
      const array = Array(z).fill(0);
      array2D.push(array);
    }
    array3D.push(array2D);
  }

  return array3D;
};

// Won't work -- fills array with same instance.
// const array = Array(x).fill(Array(y).fill(Array(z).fill(0)));

export const HitboxContextProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState(create3DArray(5, 5, 2));

  return (
    <HitboxContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </HitboxContext.Provider>
  );
};

export default HitboxContext;
