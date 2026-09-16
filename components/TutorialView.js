"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  canAccessBuilds,
  completeTutorial,
  getProgress,
  levelFromXp,
  xpToNextLevel,
} from "../lib/progress";
import { pickTaunt, TAUNTS_LOCKED } from "../lib/taunts";

export default function TutorialView({ tutorial }) {
  const [unlocked, setUnlocked] = useState(false);
  const [level, setLevel] = useState(1);
  const [xpLeft, setXpLeft] = useState(100);
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [taunt, setTaunt] = useState("");

  useEffect(() => {
    const sync = () => {
      const p = getProgress();
      setUnlocked(canAccessBuilds(p.xp));
      setLevel(levelFromXp(p.xp));
      setXpLeft(xpToNextLevel(p.xp));
      setDone((p.tutorialsCompleted || []).includes(tutorial.id));
    };
    sync();
    window.addEventListener("gdscripter-progress", sync);
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, [tutorial.id]);

  if (!unlocked) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <div className="panel p-6 sm:p-8 text-center">
          <p className="chip bg-coral text-white mb-4">Level 2 locked</p>
          <h1 className="text-3xl font-black mb-2">{tutorial.title}</h1>
          <p className="font-bold text-ink-soft mb-3">
            You&apos;re Level {level}. Need {xpLeft} more XP to unlock build tutorials.
          </p>
          <p className="font-extrabold text-coral italic mb-6">
            {taunt || "Patience, speedrunner. Hit Level 2 first — XP doesn't farm itself."}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/play" className="btn-arcade btn-coral">
              Farm XP in Play
            </Link>
            <Link href="/cards" className="btn-arcade btn-ghost">
              Flip cards
            </Link>
            <Link href="/build" className="btn-arcade btn-ghost">
              Build hub
            </Link>
          </div>
          <button
            type="button"
            className="mt-4 text-sm font-extrabold text-ink-soft underline"
            onClick={() => setTaunt(pickTaunt(TAUNTS_LOCKED))}
          >
            Roast me again
          </button>
        </div>
      </main>
    );
  }

  const s = tutorial.steps[step];
  const last = step >= tutorial.steps.length - 1;

  function finish() {
    completeTutorial(tutorial.id);
    setDone(true);
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap gap-2 items-center justify-between">
        <Link href="/build" className="btn-arcade btn-ghost !py-2 !text-sm">
          ← Build hub
        </Link>
        <span className="chip bg-gold">{tutorial.time}</span>
      </div>

      <header className="mb-6 anim-bounce-in">
        <p className="chip bg-[#D8FFF6] mb-3">Level 2 tutorial</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">{tutorial.title}</h1>
        <p className="font-bold text-ink-soft mb-2">{tutorial.subtitle}</p>
        <p className="text-sm font-extrabold text-coral italic">{tutorial.roast}</p>
      </header>

      <div className="panel-soft p-4 mb-6">
        <p className="font-black m-0 mb-2 text-sm">You&apos;ll walk out knowing</p>
        <ul className="m-0 pl-4 space-y-1">
          {tutorial.goals.map((g) => (
            <li key={g} className="text-sm font-bold text-ink-soft">
              {g}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex gap-1 mb-4 flex-wrap">
        {tutorial.steps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            className={`h-2.5 flex-1 min-w-[2rem] rounded-full border-2 border-ink ${
              i === step ? "bg-coral" : i < step ? "bg-mint" : "bg-white"
            }`}
            aria-label={`Step ${i + 1}`}
          />
        ))}
      </div>

      <article className="panel p-5 sm:p-6 mb-4 anim-pop" key={step}>
        <p className="text-xs font-extrabold text-ink-soft mb-1">
          STEP {step + 1} / {tutorial.steps.length}
        </p>
        <h2 className="text-xl font-black m-0 mb-3">{s.title}</h2>
        <p className="font-bold text-ink-soft text-sm sm:text-base mb-4">{s.body}</p>
        <pre className="code-block mb-4 whitespace-pre-wrap">{s.code}</pre>
        <p className="text-sm font-extrabold m-0 text-teal-deep">Tip: {s.tip}</p>
      </article>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          type="button"
          className="btn-arcade btn-ghost !py-2 !text-sm"
          disabled={step === 0}
          onClick={() => setStep((v) => Math.max(0, v - 1))}
        >
          Back
        </button>
        {!last ? (
          <button
            type="button"
            className="btn-arcade btn-coral !py-2 !text-sm"
            onClick={() => setStep((v) => v + 1)}
          >
            Next step
          </button>
        ) : (
          <button
            type="button"
            className="btn-arcade btn-teal !py-2 !text-sm"
            onClick={finish}
          >
            {done ? "Completed (+0 XP)" : "Mark complete (+50 XP)"}
          </button>
        )}
      </div>

      <section className="mb-10">
        <h3 className="font-black text-lg mb-3">Quick check (no pressure… okay some)</h3>
        <div className="space-y-3">
          {tutorial.quiz.map((item) => (
            <details key={item.q} className="panel p-4">
              <summary className="font-extrabold cursor-pointer">{item.q}</summary>
              <p className="font-bold text-ink-soft text-sm mt-2 mb-0">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
