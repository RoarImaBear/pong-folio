import GameBoard from "../components/GameBoard";
import { HitboxContextProvider } from "../context/HitboxContext";

export default function Game() {
  const text =
    "A writer and educator of eight years with recent " +
    "experience in entrepreneurship and bids & tenders, I’m " +
    "currently looking for an opportunity that will bring me closer" +
    " to my long term goals in marketing, product management and entrepreneurship.";

  return (
    <HitboxContextProvider>
      <GameBoard text={text} />
    </HitboxContextProvider>
  );
}
