"use client";

import { useState } from "react";
import { BUG_QUESTIONS, shuffle } from "../../lib/game-data";
import { addXp } from "../../lib/progress";
import {
  pickTaunt,
  TAUNTS_CORRECT,
  TAUNTS_STREAK,
  TAUNTS_WRONG,
} from "../../lib/taunts";

export default function BugSquash({ onExit }) {
  const [queue, setQueue] = useState(() => shuffle(BUG_QUESTIONS));
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState(null);
  const [picked, setPicked] = useState(null);
  const [taunt, setTaunt] = useState("");

  const q = queue[qi % queue.length];

  function choose(i) {
    if (status) return;
    setPicked(i);
    if (i === q.wrongIndex) {
      const nextStreak = streak + 1;
      const gained = 10 + Math.min(nextStreak, 5) * 2;
      setStreak(nextStreak);
      setScore((s) => s + gained);
      addXp(gained);
      setStatus("ok");
      setTaunt(
        nextStreak >= 3
          ? pickTaunt(TAUNTS_STREAK)
          : pickTaunt(TAUNTS_CORRECT),
      );
    } else {
      setStreak(0);
      setStatus("bad");
      setTaunt(pickTaunt(TAUNTS_WRONG));
    }
  }

  function next() {
    setStatus(null);
    setPicked(null);
    setTaunt("");
    if (qi + 1 >= queue.length) {
      setQueue(shuffle(BUG_QUESTIONS));
      setQi(0);
    } else {
      setQi((v) => v + 1);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button type="button" className="btn-arcade btn-ghost !py-2 !text-sm" onClick={onExit}>
          ← Hub
        </button>
        <div className="flex gap-2 flex-wrap justify-end">
          <span className="chip bg-white">
            {qi + 1}/{queue.length}
          </span>
          <span className="chip bg-gold">Score {score}</span>
          <span className="chip bg-[#FFD6E0]">Streak {streak}</span>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-1">Bug Squash</h2>
      <p className="font-bold text-ink-soft mb-4 text-sm sm:text-base">
        {q.prompt} · tap the bad line. Wrong guesses will be judged.
      </p>

      <div className="panel overflow-hidden mb-4">
        <div className="bg-ink text-[#A8FFCE] font-mono text-xs sm:text-sm overflow-x-auto">
          {q.lines.map((line, i) => (
            <button
              key={`${q.id}-${i}`}
              type="button"
              disabled={!!status}
              onClick={() => choose(i)}
              className={`w-full text-left px-3 sm:px-4 py-2.5 border-b border-[#2a3a2a] flex gap-3 transition-colors ${
                picked === i && status === "ok"
                  ? "bg-[#06d6a0]/30"
                  : picked === i && status === "bad"
                    ? "bg-[#ff5a5f]/35"
                    : status && i === q.wrongIndex
                      ? "bg-[#06d6a0]/20"
                      : "hover:bg-white/10"
              }`}
            >
              <span className="opacity-50 w-5 shrink-0">{i + 1}</span>
              <span className="whitespace-pre">{line || "\u00A0"}</span>
            </button>
          ))}
        </div>
      </div>

      {status && (
        <div className={`panel p-4 mb-4 ${status === "ok" ? "anim-pop" : "anim-shake"}`}>
          <p className={`font-black m-0 mb-1 ${status === "ok" ? "text-teal-deep" : "text-coral"}`}>
            {status === "ok" ? "Squashed!" : "Not that line"}
          </p>
          <p className="font-extrabold text-sm italic text-ink m-0 mb-2">{taunt}</p>
          <p className="font-bold text-ink-soft m-0 text-sm">{q.explain}</p>
          <button type="button" className="btn-arcade btn-coral mt-4 !py-2 !text-sm" onClick={next}>
            Next bug
          </button>
        </div>
      )}
    </div>
  );
}
