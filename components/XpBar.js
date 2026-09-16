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
    <div className={`xpbar ${compact ? "xpbar-compact" : ""}`}>
      <span className="xpchip xpchip-streak" title="Daily streak">
        🔥 {progress.streak || 0}d
      </span>
      <span className="xpchip xpchip-level" title="Level">
        Lv {level}
      </span>
      <div
        className="xpchip xpchip-meter"
        title={`${progress.xp} XP · ${100 - into} to next level`}
      >
        <span className="xp-label">XP</span>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${into}%` }} />
        </div>
        <span className="xp-num">{progress.xp}</span>
      </div>
    </div>
  );
}
