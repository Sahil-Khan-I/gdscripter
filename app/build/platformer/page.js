import TutorialView from "../../../components/TutorialView";
import { PLATFORMER_TUTORIAL } from "../../../lib/tutorials";

export const metadata = {
  title: "Platformer tutorial — GDScripter",
  description: "Build a simple Godot 4 platformer with CharacterBody2D after Level 1.",
};

export default function PlatformerPage() {
  return <TutorialView tutorial={PLATFORMER_TUTORIAL} />;
}
