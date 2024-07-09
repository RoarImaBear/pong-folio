import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Game from "./pages/game";

// TODO: Setup router
// TODO: Static Page
function App() {
  const [count, setCount] = useState(0);

  return <Game />;
}

export default App;
