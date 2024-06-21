import TargetParagraph from "../components/TargetParagraph";
import { HitboxContextProvider } from "../context/HitboxContext";

export default function Game() {
  const text = "hi, longer word superlong are // you?";

  return (
    <HitboxContextProvider>
      <TargetParagraph text={text} />;
    </HitboxContextProvider>
  );
}
