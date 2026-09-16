"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PATH_GROUPS, START_PATHS } from "../lib/paths";
import {
  canAccessBuilds,
  getProgress,
  levelFromXp,
  setStartPath,
  xpToNextLevel,
} from "../lib/progress";
import { pickTaunt, TAUNTS_LOCKED } from "../lib/taunts";

const NODE_LAYOUT = {
  zero: { x: 210, y: 78 },
  "some-code": { x: 360, y: 58 },
  path: { x: 510, y: 78 },
  signals: { x: 180, y: 178 },
  nodes: { x: 320, y: 198 },
  movement: { x: 460, y: 178 },
  speed: { x: 220, y: 298 },
  lab: { x: 400, y: 318 },
  platformer: { x: 560, y: 268 },
  pong: { x: 620, y: 348 },
};

const HUB = { x: 70, y: 200 };

function lanePath(from, to, bend = 0.35) {
  const mx = from.x + (to.x - from.x) * bend;
  const my = from.y + (to.y - from.y) * 0.15;
  const c1x = from.x + 40;
  const c1y = from.y + (to.y - from.y) * 0.2;
  const c2x = mx;
  const c2y = to.y;
  return `M ${from.x + 28} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x - 46} ${to.y}`;
}

export default function PathPicker() {
  const [level, setLevel] = useState(1);
  const [xpLeft, setXpLeft] = useState(100);
  const [unlocked, setUnlocked] = useState(false);
  const [chosen, setChosen] = useState(null);
  const [hovered, setHovered] = useState(null);
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

  const activeId = hovered || chosen || "zero";
  const active = useMemo(
    () => START_PATHS.find((p) => p.id === activeId) || START_PATHS[0],
    [activeId],
  );
  const activeLocked = (active.requiresLevel || 1) >= 2 && !unlocked;

  function onPick(path) {
    const needs = path.requiresLevel || 1;
    if (needs >= 2 && !unlocked) {
      setLockMsg(pickTaunt(TAUNTS_LOCKED));
      setChosen(path.id);
      return;
    }
    setStartPath(path.id);
    setChosen(path.id);
    setLockMsg("");
  }

  return (
    <section id="start" className="lane-section scroll-mt-24">
      <div className="lane-orb lane-orb-a" aria-hidden />
      <div className="lane-orb lane-orb-b" aria-hidden />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16 relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-6">
          <div>
            <p className="chip bg-coral text-white mb-3">Lane map</p>
            <h2 className="text-2xl sm:text-4xl font-black mb-2 tracking-tight">
              Pick a lane.{" "}
              <span className="text-coral">Watch it light up.</span>
            </h2>
            <p className="font-bold text-ink-soft max-w-xl text-sm sm:text-base m-0">
              Not a menu of identical cards — a live fork in the road. Hover a
              node, claim a path, earn XP. Boss builds open at Level 2
              {unlocked
                ? " — and you already cracked the door."
                : ` · you're Lv ${level}, ${xpLeft} XP left.`}
            </p>
          </div>
          <p className="font-extrabold text-coral text-sm italic max-w-xs lg:text-right m-0">
            {lockMsg ||
              "Pro move: pick one glowing lane, then come back for the boss door."}
          </p>
        </div>

        <div className="lane-shell">
          <div className="lane-map-wrap">
            <svg
              viewBox="0 0 700 400"
              className="lane-svg"
              role="img"
              aria-label="Interactive starting lane map"
            >
              <defs>
                <marker
                  id="laneArrow"
                  markerWidth="7"
                  markerHeight="7"
                  refX="5"
                  refY="3"
                  orient="auto"
                >
                  <path d="M0,0 L6,3 L0,6 Z" fill="var(--coral)" />
                </marker>
                <filter id="laneGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* soft track rings */}
              <ellipse
                cx="360"
                cy="200"
                rx="290"
                ry="150"
                className="lane-ring"
              />
              <ellipse
                cx="360"
                cy="200"
                rx="190"
                ry="95"
                className="lane-ring lane-ring-inner"
              />

              {START_PATHS.map((path, i) => {
                const to = NODE_LAYOUT[path.id];
                const isHot = activeId === path.id;
                const locked = (path.requiresLevel || 1) >= 2 && !unlocked;
                return (
                  <path
                    key={`edge-${path.id}`}
                    d={lanePath(HUB, to, 0.28 + (i % 3) * 0.08)}
                    className={`lane-edge tone-${path.tone} ${isHot ? "hot" : ""} ${
                      locked ? "locked" : ""
                    }`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                    markerEnd={isHot ? "url(#laneArrow)" : undefined}
                  />
                );
              })}

              {/* hub */}
              <g transform={`translate(${HUB.x}, ${HUB.y})`}>
                <circle r="34" className="lane-hub-pulse" />
                <circle r="28" className="lane-hub-core" />
                <text y="1" textAnchor="middle" className="lane-hub-label">
                  YOU
                </text>
                <text y="16" textAnchor="middle" className="lane-hub-sub">
                  Lv {level}
                </text>
              </g>

              {START_PATHS.map((path) => {
                const pos = NODE_LAYOUT[path.id];
                const locked = (path.requiresLevel || 1) >= 2 && !unlocked;
                const isHot = activeId === path.id;
                const selected = chosen === path.id;
                return (
                  <g
                    key={path.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className={`lane-node tone-${path.tone} ${isHot ? "hot" : ""} ${
                      selected ? "picked" : ""
                    } ${locked ? "locked" : ""}`}
                    onMouseEnter={() => setHovered(path.id)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(path.id)}
                    onBlur={() => setHovered(null)}
                    onClick={() => onPick(path)}
                    role="button"
                    tabIndex={0}
                    aria-label={path.title}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onPick(path);
                      }
                    }}
                  >
                    <rect
                      x="-52"
                      y="-22"
                      width="104"
                      height="44"
                      rx="14"
                      className="lane-node-bg"
                      filter={isHot ? "url(#laneGlow)" : undefined}
                    />
                    {locked && (
                      <g className="lane-lock-mark" transform="translate(36,-16)">
                        <rect x="-6" y="-1" width="12" height="9" rx="2" />
                        <path d="M -3  -1 V -4 A 3 3 0 0 1 3 -4 V -1" fill="none" />
                      </g>
                    )}
                    <text y="1" textAnchor="middle" className="lane-node-title">
                      {path.short}
                    </text>
                    <text y="14" textAnchor="middle" className="lane-node-meta">
                      {path.group === "boss" ? "Lv2" : path.group}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <aside
            key={active.id}
            className={`lane-spotlight tone-${active.tone}`}
          >
            <div className="lane-spotlight-rail" aria-hidden />
            <div className="lane-spotlight-body">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`chip ${active.accent}`}>{active.level}</span>
                {activeLocked && <span className="chip bg-surface">Locked</span>}
                {chosen === active.id && !activeLocked && (
                  <span className="chip bg-mint text-ink">Your pick</span>
                )}
              </div>
              <h3 className="font-black text-xl sm:text-2xl m-0 mb-2 leading-tight">
                {active.title}
              </h3>
              <p className="font-bold text-ink-soft text-sm m-0 mb-2">
                {active.blurb}
              </p>
              <p className="font-extrabold text-coral text-sm italic m-0 mb-5">
                {active.roast}
              </p>
              <div className="flex flex-wrap gap-2">
                {activeLocked ? (
                  <button
                    type="button"
                    className="btn-arcade btn-ghost !py-2 !text-sm"
                    onClick={() => onPick(active)}
                  >
                    Why locked?
                  </button>
                ) : (
                  <Link
                    href={active.href}
                    className="btn-arcade btn-coral !py-2 !text-sm"
                    onClick={() => onPick(active)}
                  >
                    Start this lane →
                  </Link>
                )}
                {!activeLocked && (
                  <button
                    type="button"
                    className="btn-arcade btn-ghost !py-2 !text-sm"
                    onClick={() => onPick(active)}
                  >
                    Remember pick
                  </button>
                )}
              </div>
            </div>
          </aside>
        </div>

        <div className="lane-legend mt-5">
          {PATH_GROUPS.map((g) => (
            <div key={g.id} className={`lane-legend-item tone-${g.color}`}>
              <span className="lane-legend-dot" />
              <div>
                <p className="m-0 font-black text-sm">{g.label}</p>
                <p className="m-0 text-xs font-bold text-ink-soft">{g.hint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
