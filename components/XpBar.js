"use client";

import { useEffect, useState } from "react";
import { getProgress, levelFromXp, xpIntoLevel } from "../lib/progress";

export default function XpBar({ compact = false }) {
  const [progress, setProgress] = useState({ xp: 0, streak: 0 });

  useEffect(() => {
    setProgress(getProgress());
    const sync = (e) => setProgress(e.detail || getProgress());
    window.addEventListener("gdscripter-progress", sync);
    window.addEventListener("storage", () => setProgress(getProgress()));
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, []);

  const level = levelFromXp(progress.xp);
  const into = xpIntoLevel(progress.xp);

  return (
    <div
      className={`flex items-center gap-1.5 sm:gap-2 flex-wrap ${compact ? "justify-end" : ""}`}
    >
      <span className="chip bg-[#FFF3C4] !text-[0.72rem] sm:!text-sm !py-0.5 !px-2">
        🔥 {progress.streak || 0}d
      </span>
      <span className="chip bg-[#D8FFF6] !text-[0.72rem] sm:!text-sm !py-0.5 !px-2">
        Lv {level}
      </span>
      <div
        className="flex items-center gap-1.5 chip !py-0.5 !pr-2 bg-white/80 min-w-[6.5rem] sm:min-w-[8.5rem] !text-[0.72rem]"
        title={`${progress.xp} XP · ${100 - into} to next level`}
      >
        <span className="font-extrabold text-ink-soft">XP</span>
        <div className="h-2 flex-1 min-w-[2.8rem] rounded-full bg-[#FFE8D6] border-2 border-ink overflow-hidden">
          <div
            className="h-full bg-coral transition-all duration-500 ease-out"
            style={{ width: `${into}%` }}
          />
        </div>
        <span className="font-extrabold tabular-nums">{progress.xp}</span>
      </div>
    </div>
  );
}
