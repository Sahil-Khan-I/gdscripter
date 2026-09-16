"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import XpBar from "./XpBar";
import ThemeToggle from "./ThemeToggle";
import { canAccessBuilds, getProgress, levelFromXp } from "../lib/progress";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Path" },
  { href: "/lab", label: "Lab" },
  { href: "/play", label: "Play" },
  { href: "/cards", label: "Cards" },
  { href: "/build", label: "Build", needsLevel2: true },
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
      <header className={`nav-glass-pill mx-auto max-w-5xl ${open ? "!rounded-2xl" : ""}`}>
        <div className="flex items-center gap-2 px-2.5 sm:px-3 h-11 sm:h-12">
          <Link
            href="/"
            className="font-black text-sm sm:text-base tracking-tight text-ink no-underline flex items-center gap-1.5 shrink-0"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-coral text-white text-[11px] border-2 border-ink">
              GD
            </span>
            <span className="hidden sm:inline">
              <span className="text-coral">GD</span>Scripter
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5 flex-1 justify-center">
            {LINKS.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              const locked = l.needsLevel2 && !unlocked;
              return (
                <Link
                  key={l.href}
                  href={locked ? "/build" : l.href}
                  className={`px-2.5 py-1 rounded-full text-xs font-extrabold no-underline transition-colors ${
                    active
                      ? "bg-ink text-white"
                      : "text-ink-soft hover:bg-[color-mix(in_srgb,var(--surface)_70%,transparent)] hover:text-ink"
                  }`}
                >
                  {l.label}
                  {locked ? "·" : ""}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 ml-auto">
            <div className="hidden md:block scale-90 origin-right">
              <XpBar compact />
            </div>
            <ThemeToggle />
            <button
              type="button"
              className="lg:hidden inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink bg-[color-mix(in_srgb,var(--surface)_55%,transparent)] text-sm font-black"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-[color-mix(in_srgb,var(--ink)_12%,transparent)] px-2 py-2 flex flex-col gap-1 anim-pop">
            <div className="md:hidden px-1 pb-2">
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
                  className={`px-3 py-2 rounded-xl text-sm font-extrabold no-underline ${
                    active ? "bg-ink text-white" : "bg-[color-mix(in_srgb,var(--surface)_50%,transparent)] text-ink"
                  }`}
                >
                  {l.label}
                  {locked ? ` · Lv2 (you: ${level})` : ""}
                </Link>
              );
            })}
            <Link
              href="/contribute"
              className="px-3 py-2 rounded-xl text-sm font-extrabold no-underline text-ink-soft"
            >
              Contribute
            </Link>
          </nav>
        )}
      </header>
    </div>
  );
}
