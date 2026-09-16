"use client";

import { useState } from "react";
import BugSquash from "../../components/games/BugSquash";
import SyntaxMatch from "../../components/games/SyntaxMatch";
import FillBlank from "../../components/games/FillBlank";
import { GAME_STATS } from "../../lib/game-data";

const GAMES = [
  {
    id: "bug",
    title: "Bug Squash",
    blurb:
      "Read a short GDScript snippet and tap the broken line. Every miss teaches a real Godot 4 gotcha.",
    color: "bg-coral text-white",
    accent: "border-coral",
    meta: `${GAME_STATS.bugs} scenarios · streak XP`,
    tips: ["Read every line", "Colons & emits are frequent traps", "Think Godot 4 APIs"],
  },
  {
    id: "match",
    title: "Syntax Match",
    blurb:
      "Pair terms with definitions before the timer ends. Faster clears mean bigger XP bonuses.",
    color: "bg-teal text-white",
    accent: "border-teal",
    meta: `${GAME_STATS.matches} pairs · timed bonus`,
    tips: ["Select a term first", "Then tap its definition", "Clear the board for bonus XP"],
  },
  {
    id: "fill",
    title: "Fill the Blank",
    blurb:
      "Complete one-liners — keywords, operators, and API names. Build a streak multiplier.",
    color: "bg-gold text-ink",
    accent: "border-gold",
    meta: `${GAME_STATS.fills} prompts · multiplier`,
    tips: ["Use the hint", "Streaks boost XP", "Replay to cover the whole set"],
  },
];

export default function PlayPage() {
  const [active, setActive] = useState(null);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      {!active ? (
        <>
          <header className="mb-8 anim-bounce-in">
            <p className="chip bg-[#FFE0EC] mb-3">
              {GAME_STATS.bugs + GAME_STATS.fills}+ interactive challenges
            </p>
            <h1 className="text-4xl font-black mb-2">Play</h1>
            <p className="font-bold text-ink-soft mb-2 text-sm sm:text-base">
              Three mini-games. Earn XP. Unlock Build at Level 2. Wrong answers come with commentary.
            </p>
            <p className="font-extrabold text-coral text-sm italic mb-4">
              100 XP = Level 2. The platformer is not a participation award.
            </p>
            <div className="panel-soft p-4 text-sm font-bold text-ink-soft">
              Tip: after each correct answer, read the explanation once — that&apos;s
              where the learning sticks. Then hit next while it&apos;s fresh.
            </div>
          </header>
          <div className="grid gap-4">
            {GAMES.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActive(g.id)}
                className={`panel p-5 text-left border-l-8 ${g.accent} hover:-translate-y-0.5 transition-transform`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`chip ${g.color}`}>{g.title}</span>
                  <span className="text-xs font-extrabold text-ink-soft">{g.meta}</span>
                </div>
                <p className="font-bold text-ink-soft m-0 mb-3 text-sm">{g.blurb}</p>
                <ul className="m-0 pl-4 text-xs font-bold text-ink-soft space-y-1">
                  {g.tips.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="anim-bounce-in">
          {active === "bug" && <BugSquash onExit={() => setActive(null)} />}
          {active === "match" && <SyntaxMatch onExit={() => setActive(null)} />}
          {active === "fill" && <FillBlank onExit={() => setActive(null)} />}
        </div>
      )}
    </main>
  );
}
