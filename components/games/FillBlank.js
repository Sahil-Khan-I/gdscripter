"use client";

import { useMemo, useState } from "react";
import { FILL_QUESTIONS, shuffle } from "../../lib/game-data";
import { addXp } from "../../lib/progress";
import {
  pickTaunt,
  TAUNTS_CORRECT,
  TAUNTS_STREAK,
  TAUNTS_WRONG,
} from "../../lib/taunts";

export default function FillBlank({ onExit }) {
  const [queue, setQueue] = useState(() => shuffle(FILL_QUESTIONS));
  const [qi, setQi] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState(null);
  const [picked, setPicked] = useState(null);
  const [shuffleKey, setShuffleKey] = useState(0);
  const [taunt, setTaunt] = useState("");

  const q = queue[qi % queue.length];
  const opts = useMemo(() => shuffle(q.options), [q.id, shuffleKey]);

  function choose(opt) {
    if (status) return;
    setPicked(opt);
    if (opt === q.answer) {
      const nextStreak = streak + 1;
      const gained = 10 + Math.min(nextStreak, 5) * 2;
      setStreak(nextStreak);
      setScore((s) => s + gained);
      addXp(gained);
      setStatus("ok");
      setTaunt(
        nextStreak >= 3 ? pickTaunt(TAUNTS_STREAK) : pickTaunt(TAUNTS_CORRECT),
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
    setShuffleKey((k) => k + 1);
    if (qi + 1 >= queue.length) {
      setQueue(shuffle(FILL_QUESTIONS));
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

      <h2 className="text-2xl font-black mb-1">Fill the Blank</h2>
      <p className="font-bold text-ink-soft mb-4">Complete the GDScript one-liner.</p>

      <div className="panel p-6 mb-3 bg-ink">
        <pre className="font-mono text-lg text-[#A8FFCE] m-0 whitespace-pre-wrap">
          {q.template.replace("___", "____")}
        </pre>
      </div>
      <p className="text-sm font-bold text-ink-soft mb-4">Hint: {q.hint}</p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {opts.map((opt) => (
          <button
            key={opt}
            type="button"
            disabled={!!status}
            onClick={() => choose(opt)}
            className={`panel p-4 font-extrabold font-mono text-sm transition-colors ${
              picked === opt && status === "ok"
                ? "bg-mint text-ink"
                : picked === opt && status === "bad"
                  ? "bg-coral text-white"
                  : status && opt === q.answer
                    ? "bg-mint/40"
                    : "hover:bg-[#FFF1E6]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {status && (
        <div className={`panel p-4 ${status === "ok" ? "anim-pop" : "anim-shake"}`}>
          <p className={`font-black m-0 ${status === "ok" ? "text-teal-deep" : "text-coral"}`}>
            {status === "ok" ? "Filled!" : `Answer: ${q.answer}`}
          </p>
          <p className="font-extrabold text-sm italic text-ink m-0 mt-1">{taunt}</p>
          <button type="button" className="btn-arcade btn-coral mt-4 !py-2 !text-sm" onClick={next}>
            Next blank
          </button>
        </div>
      )}
    </div>
  );
}
