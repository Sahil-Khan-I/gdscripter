"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import XpBar from "./XpBar";
import ThemeToggle from "./ThemeToggle";
import { canAccessBuilds, getProgress, levelFromXp } from "../lib/progress";

const LINKS = [
  { href: "/", label: "Home", tip: "Base camp" },
  { href: "/learn", label: "Path", tip: "The map" },
  { href: "/lab", label: "Lab", tip: "Move sprites" },
  { href: "/play", label: "Play", tip: "XP farm" },
  { href: "/cards", label: "Cards", tip: "Brain reps" },
  { href: "/build", label: "Build", tip: "Boss zone", needsLevel2: true },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState(1);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const sync = () => {
      const p = getProgress();
      setLevel(levelFromXp(p.xp));
      setUnlocked(canAccessBuilds(p.xp));
    };
    sync();
    window.addEventListener("gdscripter-progress", sync);
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="nav-shell sticky top-0 z-50 px-2 sm:px-3 pt-2 sm:pt-3">
      <header className={`nav-glass-pill mx-auto max-w-5xl ${open ? "nav-open" : ""}`}>
        <div className="nav-row">
          <Link href="/" className="nav-brand" title="GDScripter">
            <span className="nav-logo" aria-hidden>
              <span className="nav-logo-ear" />
              GD
            </span>
            <span className="nav-brand-text">
              <span className="text-coral">GD</span>Scripter
            </span>
          </Link>

          <nav className="nav-links">
            {LINKS.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              const locked = l.needsLevel2 && !unlocked;
              return (
                <Link
                  key={l.href}
                  href={locked ? "/build" : l.href}
                  className={`nav-link ${active ? "is-active" : ""} ${locked ? "is-locked" : ""}`}
                  title={locked ? `Lv2 lock · you're Lv${level}` : l.tip}
                >
                  {l.label}
                  {locked ? <span className="nav-lock">🔒</span> : null}
                </Link>
              );
            })}
          </nav>

          <div className="nav-right">
            <div className="nav-xp">
              <XpBar compact />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="nav-burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <nav className="nav-mobile anim-pop">
            <div className="nav-mobile-xp">
              <XpBar compact />
            </div>
            {LINKS.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              const locked = l.needsLevel2 && !unlocked;
              return (
                <Link
                  key={l.href}
                  href={locked ? "/build" : l.href}
                  className={`nav-mobile-link ${active ? "is-active" : ""}`}
                >
                  <span>{l.label}</span>
                  <span className="nav-mobile-tip">
                    {locked ? `Lv2 lock (you: ${level})` : l.tip}
                  </span>
                </Link>
              );
            })}
            <Link href="/contribute" className="nav-mobile-link">
              <span>Contribute</span>
              <span className="nav-mobile-tip">Ship a PR</span>
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}
