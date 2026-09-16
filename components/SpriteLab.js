"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { LAB_LEVELS } from "../lib/lab-levels";
import { runLabSimulation } from "../lib/lab-runner";
import { addXp, getProgress, saveProgress } from "../lib/progress";

export default function SpriteLab() {
  const [levelIndex, setLevelIndex] = useState(0);
  const [code, setCode] = useState(LAB_LEVELS[0].starter);
  const [hintI, setHintI] = useState(-1);
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState(null);
  const [path, setPath] = useState([{ x: 40, y: 120 }]);
  const [playing, setPlaying] = useState(false);
  const [cleared, setCleared] = useState([]);
  const animRef = useRef(null);

  const level = LAB_LEVELS[levelIndex];

  useEffect(() => {
    const p = getProgress();
    setCleared(p.labCleared || []);
  }, []);

  useEffect(() => {
    setCode(level.starter);
    setHintI(-1);
    setMsg("");
    setOk(null);
    setPath([{ x: 40, y: 120 }]);
    setPlaying(false);
  }, [levelIndex, level.starter]);

  function showHint() {
    setHintI((i) => Math.min(i + 1, level.hints.length - 1));
  }

  function run() {
    const result = runLabSimulation(code, level.win);
    setOk(result.passed);
    setMsg(result.passed ? level.roastWin : level.roastFail);
    animatePath(result.path);
    if (result.passed) {
      const p = getProgress();
      const set = new Set(p.labCleared || []);
      const first = !set.has(level.id);
      set.add(level.id);
      saveProgress({ ...p, labCleared: [...set] });
      setCleared([...set]);
      if (first) addXp(15 + level.id * 5);
    }
  }

  function animatePath(fullPath) {
    setPlaying(true);
    let i = 0;
    cancelAnimationFrame(animRef.current);
    const step = () => {
      i += 2;
      if (i >= fullPath.length) {
        setPath([fullPath[fullPath.length - 1]]);
        setPlaying(false);
        return;
      }
      setPath([fullPath[i]]);
      animRef.current = requestAnimationFrame(step);
    };
    animRef.current = requestAnimationFrame(step);
  }

  const sprite = path[path.length - 1] || { x: 40, y: 120 };
  const progressPct = Math.round((cleared.length / LAB_LEVELS.length) * 100);

  const targetBox = useMemo(() => {
    if (level.win.type === "in_box") return level.win;
    if (level.win.type === "near") {
      return {
        x0: level.win.x - 20,
        y0: level.win.y - 20,
        x1: level.win.x + 20,
        y1: level.win.y + 20,
      };
    }
    return null;
  }, [level]);

  return (
    <main className="mx-auto max-w-5xl px-3 sm:px-4 py-6 sm:py-8">
      <header className="mb-5 anim-bounce-in">
        <p className="chip bg-sky text-ink mb-2">Sprite Lab</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Code the sprite</h1>
        <p className="font-bold text-ink-soft text-sm sm:text-base max-w-2xl mb-2">
          Write tiny GDScript-like lines. Hit Run. Make the square do what the level
          asks — vectors, velocity, delta, the works.
        </p>
        <p className="font-extrabold text-coral text-sm italic mb-3">
          Yes it&apos;s a square. AAA art comes after you understand Vector2.
        </p>
        <div className="panel-soft p-3 mb-2">
          <div className="flex justify-between text-xs font-extrabold mb-1">
            <span>Lab clear</span>
            <span>
              {cleared.length}/{LAB_LEVELS.length} · {progressPct}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto tag-scroll mb-4 pb-1">
        {LAB_LEVELS.map((l, i) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLevelIndex(i)}
            className={`chip shrink-0 !text-xs ${
              i === levelIndex
                ? "bg-ink text-white"
                : cleared.includes(l.id)
                  ? "bg-mint text-ink"
                  : "bg-white"
            }`}
          >
            L{l.id} {l.title}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <div className="panel p-4 mb-3">
            <h2 className="font-black text-lg m-0 mb-1">
              Level {level.id}: {level.title}
            </h2>
            <p className="font-bold text-ink-soft text-sm m-0 mb-2">{level.goal}</p>
            <p className="text-xs font-extrabold text-teal-deep m-0">{level.teach}</p>
          </div>

          <label className="font-extrabold text-xs uppercase tracking-wide text-ink-soft">
            Your code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className="code-editor mt-1 mb-3"
            rows={10}
          />

          <div className="flex flex-wrap gap-2 mb-3">
            <button type="button" className="btn-arcade btn-coral !py-2 !text-sm" onClick={run}>
              {playing ? "Running…" : "Run"}
            </button>
            <button
              type="button"
              className="btn-arcade btn-ghost !py-2 !text-sm"
              onClick={showHint}
            >
              Hint {hintI >= 0 ? `(${hintI + 1}/${level.hints.length})` : ""}
            </button>
            <button
              type="button"
              className="btn-arcade btn-ghost !py-2 !text-sm"
              onClick={() => setCode(level.starter)}
            >
              Reset code
            </button>
            {levelIndex < LAB_LEVELS.length - 1 && (
              <button
                type="button"
                className="btn-arcade btn-teal !py-2 !text-sm"
                onClick={() => setLevelIndex((i) => i + 1)}
              >
                Next level
              </button>
            )}
          </div>

          {hintI >= 0 && (
            <div className="panel-soft p-3 mb-3 anim-pop">
              <p className="font-extrabold text-xs m-0 mb-1">Hint</p>
              <p className="font-bold text-sm text-ink-soft m-0">{level.hints[hintI]}</p>
            </div>
          )}

          {msg && (
            <p
              className={`font-extrabold text-sm italic ${ok ? "text-teal-deep" : "text-coral"}`}
            >
              {msg}
            </p>
          )}
        </div>

        <div>
          <div className="lab-stage panel overflow-hidden relative">
            <div className="absolute inset-0 lab-grid" />
            {targetBox && (
              <div
                className="absolute rounded-lg border-[3px] border-dashed border-gold bg-gold/30"
                style={{
                  left: targetBox.x0,
                  top: targetBox.y0,
                  width: targetBox.x1 - targetBox.x0,
                  height: targetBox.y1 - targetBox.y0,
                }}
              />
            )}
            <div
              className="absolute w-10 h-10 rounded-xl bg-coral border-[3px] border-ink shadow-[3px_3px_0_var(--ink)] flex items-center justify-center text-white font-black text-xs transition-none"
              style={{
                left: sprite.x,
                top: sprite.y,
                transform: "translate(-50%, -50%)",
              }}
            >
              GD
            </div>
            <div className="absolute bottom-2 left-2 chip bg-white/80 !text-[0.65rem]">
              x {sprite.x.toFixed(0)} · y {sprite.y.toFixed(0)}
            </div>
          </div>
          <p className="text-xs font-bold text-ink-soft mt-2 mb-0">
            Supported: velocity / position assignments, Vector2(x,y), * delta,
            (target-position).normalized()*speed, simple if position.x &gt; n:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/learn#vectors" className="btn-arcade btn-ghost !py-2 !text-sm">
              Vector docs
            </Link>
            <Link href="/learn" className="btn-arcade btn-ghost !py-2 !text-sm">
              Full path
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
