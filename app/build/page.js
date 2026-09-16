"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  canAccessBuilds,
  getProgress,
  levelFromXp,
  xpToNextLevel,
} from "../../lib/progress";
import { pickTaunt, TAUNTS_LOCKED } from "../../lib/taunts";

const BUILDS = [
  {
    href: "/build/platformer",
    title: "Simple Platformer",
    blurb: "Run, jump, collide with a floor. The classic first real game.",
    roast: "Rectangles with gravity — Shakespeare would be jealous.",
    accent: "border-coral",
    chip: "bg-coral text-white",
  },
  {
    href: "/build/pong",
    title: "Ping Pong vs Computer",
    blurb: "Paddles, bounce math, and an AI that politely ruins your day.",
    roast: "If you lose to `sign(diff) * speed`, we need to talk.",
    accent: "border-teal",
    chip: "bg-teal text-white",
  },
];

export default function BuildPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [level, setLevel] = useState(1);
  const [xpLeft, setXpLeft] = useState(100);
  const [done, setDone] = useState([]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const sync = () => {
      const p = getProgress();
      setUnlocked(canAccessBuilds(p.xp));
      setLevel(levelFromXp(p.xp));
      setXpLeft(xpToNextLevel(p.xp));
      setDone(p.tutorialsCompleted || []);
    };
    sync();
    window.addEventListener("gdscripter-progress", sync);
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <header className="mb-8 anim-bounce-in">
        <p className="chip bg-gold mb-3">After Level 1</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Build</h1>
        <p className="font-bold text-ink-soft mb-3 text-sm sm:text-base">
          Real mini-game tutorials in Godot 4. Unlock when you hit Level 2 (100 XP)
          — because reading alone doesn&apos;t ship games. Sweat does.
        </p>
        <p className="font-extrabold text-sm text-coral italic">
          {unlocked
            ? "Unlocked. Try not to cry when the AI paddle is better than you."
            : `Locked for you (Lv ${level}). ${xpLeft} XP left — ${msg || "the tutorials can wait while you farm."}`}
        </p>
      </header>

      {!unlocked && (
        <div className="panel-soft p-4 mb-6 flex flex-wrap gap-3 items-center justify-between">
          <p className="font-bold text-sm m-0 text-ink-soft">
            Fastest XP: Play games + Speed cards. No, watching the XP bar doesn&apos;t count.
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link href="/play" className="btn-arcade btn-coral !py-2 !text-sm">
              Play
            </Link>
            <button
              type="button"
              className="btn-arcade btn-ghost !py-2 !text-sm"
              onClick={() => setMsg(pickTaunt(TAUNTS_LOCKED))}
            >
              Roast me
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {BUILDS.map((b) => (
          <div key={b.href} className={`panel p-5 border-l-8 ${b.accent}`}>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className={`chip ${b.chip}`}>{b.title}</span>
              {done.includes(b.href.split("/").pop()) && (
                <span className="chip bg-mint text-ink">Done</span>
              )}
              {!unlocked && <span className="chip bg-white">Needs Lv2</span>}
            </div>
            <p className="font-bold text-ink-soft text-sm m-0 mb-2">{b.blurb}</p>
            <p className="text-xs font-extrabold text-coral italic m-0 mb-4">{b.roast}</p>
            <Link
              href={b.href}
              className={`btn-arcade ${unlocked ? "btn-coral" : "btn-ghost"} !py-2 !text-sm`}
            >
              {unlocked ? "Open tutorial" : "Peek lock screen"}
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
