"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { START_PATHS } from "../lib/paths";
import {
  canAccessBuilds,
  getProgress,
  levelFromXp,
  setStartPath,
  xpToNextLevel,
} from "../lib/progress";
import { pickTaunt, TAUNTS_LOCKED } from "../lib/taunts";

export default function PathPicker() {
  const [level, setLevel] = useState(1);
  const [xpLeft, setXpLeft] = useState(100);
  const [unlocked, setUnlocked] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [lockMsg, setLockMsg] = useState("");

  useEffect(() => {
    const sync = () => {
      const p = getProgress();
      setLevel(levelFromXp(p.xp));
      setXpLeft(xpToNextLevel(p.xp));
      setUnlocked(canAccessBuilds(p.xp));
      setChosen(p.startPath);
    };
    sync();
    window.addEventListener("gdscripter-progress", sync);
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, []);

  function onPick(path) {
    const needs = path.requiresLevel || 1;
    if (needs >= 2 && !unlocked) {
      setLockMsg(pickTaunt(TAUNTS_LOCKED));
      return;
    }
    setStartPath(path.id);
    setChosen(path.id);
    setLockMsg("");
  }

  return (
    <section id="start" className="border-t-[3px] border-ink bg-surface/75">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
        <h2 className="text-2xl sm:text-3xl font-black mb-2">
          Start wherever you want
        </h2>
        <p className="font-bold text-ink-soft mb-2 max-w-2xl text-sm sm:text-base">
          No forced campaign. Pick the lane that matches your chaos level. Build
          tutorials unlock at <strong className="text-ink">Level 2</strong>{" "}
          (100 XP) — you&apos;re Lv {level}
          {unlocked ? ". Welcome to the big leagues." : ` · ${xpLeft} XP to unlock builds.`}
        </p>
        <p className="font-extrabold text-coral text-sm mb-6">
          {lockMsg ||
            "Pro move: pick one path, earn XP, then come back for the boss tutorials."}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {START_PATHS.map((path) => {
            const locked = (path.requiresLevel || 1) >= 2 && !unlocked;
            const selected = chosen === path.id;
            return (
              <div
                key={path.id}
                className={`panel p-4 sm:p-5 flex flex-col ${
                  selected ? "ring-4 ring-coral/40" : ""
                } ${locked ? "opacity-90" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`chip ${path.accent}`}>{path.level}</span>
                  {locked && <span className="chip bg-white">Locked</span>}
                  {selected && !locked && (
                    <span className="chip bg-mint text-ink">Your pick</span>
                  )}
                </div>
                <h3 className="font-black text-lg m-0 mb-1">{path.title}</h3>
                <p className="text-sm font-bold text-ink-soft m-0 mb-2">{path.blurb}</p>
                <p className="text-xs font-extrabold text-coral m-0 mb-4 italic">
                  {path.roast}
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {locked ? (
                    <button
                      type="button"
                      className="btn-arcade btn-ghost !py-2 !text-sm"
                      onClick={() => onPick(path)}
                    >
                      Why locked?
                    </button>
                  ) : (
                    <Link
                      href={path.href}
                      className="btn-arcade btn-coral !py-2 !text-sm"
                      onClick={() => onPick(path)}
                    >
                      Start here
                    </Link>
                  )}
                  {!locked && (
                    <button
                      type="button"
                      className="btn-arcade btn-ghost !py-2 !text-sm"
                      onClick={() => onPick(path)}
                    >
                      Remember pick
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
