import TargetParagraph from "../components/TargetParagraph";
import { HitboxContextProvider } from "../context/HitboxContext";

export default function Game() {
  const text =
    "hello jarred, you sill sausage. this is my thing that I'm showing you.";

  return (
    <HitboxContextProvider>
      <TargetParagraph text={text} />
    </HitboxContextProvider>
  );
}
