import TutorialView from "../../../components/TutorialView";
import { PONG_TUTORIAL } from "../../../lib/tutorials";

export const metadata = {
  title: "Ping Pong vs AI — GDScripter",
  description: "Build a Godot 4 ping pong game against the computer after Level 1.",
};

export default function PongPage() {
  return <TutorialView tutorial={PONG_TUTORIAL} />;
}
