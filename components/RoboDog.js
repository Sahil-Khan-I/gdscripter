"use client";

import { useEffect, useState } from "react";

const JOKES = [
  {
    text: "I'm Byte. I fetch bugs. You create them. Symbiosis.",
    cta: { label: "Start somewhere", href: "#start" },
  },
  {
    text: "Forgot a colon again? Don't worry — GDScript will remind you. Loudly.",
    cta: { label: "Open Path", href: "/learn" },
  },
  {
    text: "Vectors aren't scary. They're just two numbers having a personality crisis.",
    cta: { label: "Sprite Lab", href: "/lab" },
  },
  {
    text: "Your XP bar called. It wants attention. Or a snack. Same thing.",
    cta: { label: "Play games", href: "/play" },
  },
  {
    text: "Stack Overflow is great. Reading the error message first is greater.",
    cta: { label: "Flip cards", href: "/cards" },
  },
  {
    text: "Null references aren't ghosts. They're just nodes you yeeted too early.",
    cta: { label: "Learn nodes", href: "/learn#nodes" },
  },
  {
    text: "Dark mode won't fix your bugs. But you look cooler failing now.",
    cta: { label: "Pick a path", href: "#start" },
  },
  {
    text: "Level 2 unlocks real games. Until then: cards, vibes, and my judgment.",
    cta: { label: "Build hub", href: "/build" },
  },
  {
    text: "print(\"hello\") is cute. Shipping a platformer is cuter. Allegedly.",
    cta: { label: "How it works", href: "#how" },
  },
  {
    text: "If it compiles on the first try, check you're in the right project.",
    cta: { label: "Roast me more", href: null },
  },
];

export default function RoboDog() {
  const [i, setI] = useState(0);
  const [bounce, setBounce] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => {
      setI((v) => (v + 1) % JOKES.length);
      setBounce(true);
    }, 9000);
    return () => clearInterval(t);
  }, []);

  if (!mounted || hidden) {
    if (hidden) {
      return (
        <button
          type="button"
          className="robodog-fab"
          onClick={() => setHidden(false)}
          aria-label="Show Byte the robodog"
        >
          <DogFace small />
        </button>
      );
    }
    return null;
  }

  const joke = JOKES[i];

  function next() {
    setI((v) => (v + 1) % JOKES.length);
    setBounce(true);
  }

  return (
    <aside className="robodog" aria-live="polite">
      <div
        className={`robodog-bubble ${bounce ? "anim-pop" : ""}`}
        onAnimationEnd={() => setBounce(false)}
      >
        <p className="robodog-name">Byte · tour dog</p>
        <p className="robodog-text">{joke.text}</p>
        <div className="robodog-actions">
          {joke.cta.href ? (
            <a href={joke.cta.href} className="robodog-btn">
              {joke.cta.label}
            </a>
          ) : (
            <button type="button" className="robodog-btn" onClick={next}>
              {joke.cta.label}
            </button>
          )}
          <button type="button" className="robodog-btn ghost" onClick={next}>
            Next joke
          </button>
          <button
            type="button"
            className="robodog-btn ghost"
            onClick={() => setHidden(true)}
            aria-label="Hide Byte"
          >
            Sit
          </button>
        </div>
      </div>
      <button
        type="button"
        className="robodog-body"
        onClick={next}
        aria-label="Byte says something else"
      >
        <DogSVG />
      </button>
    </aside>
  );
}

function DogFace({ small }) {
  const s = small ? 32 : 42;
  return (
    <svg viewBox="0 0 80 80" width={s} height={s} aria-hidden>
      <defs>
        <radialGradient id="fabFur" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ead6b4" />
          <stop offset="55%" stopColor="#c4a574" />
          <stop offset="100%" stopColor="#8b6914" />
        </radialGradient>
      </defs>
      <ellipse
        cx="18"
        cy="36"
        rx="11"
        ry="16"
        transform="rotate(-18 18 36)"
        fill="#9a7520"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <ellipse
        cx="62"
        cy="36"
        rx="11"
        ry="16"
        transform="rotate(18 62 36)"
        fill="#9a7520"
        stroke="var(--ink)"
        strokeWidth="2"
      />
      <ellipse
        cx="18"
        cy="38"
        rx="6"
        ry="10"
        transform="rotate(-18 18 38)"
        fill="#5c4010"
        opacity="0.4"
      />
      <ellipse
        cx="62"
        cy="38"
        rx="6"
        ry="10"
        transform="rotate(18 62 38)"
        fill="#5c4010"
        opacity="0.4"
      />
      <ellipse
        cx="40"
        cy="42"
        rx="24"
        ry="22"
        fill="url(#fabFur)"
        stroke="var(--ink)"
        strokeWidth="2.2"
      />
      <ellipse
        cx="40"
        cy="52"
        rx="13"
        ry="10"
        fill="#f0e2cc"
        stroke="var(--ink)"
        strokeWidth="1.8"
      />
      <ellipse cx="40" cy="49" rx="4" ry="3" fill="#1a1a2e" />
      <path
        d="M40 52v5M36 57c2.5 2 5.5 2 8 0"
        stroke="#1a1a2e"
        strokeWidth="1.6"
        strokeLinecap="round"
        fill="none"
      />
      <ellipse
        cx="30"
        cy="40"
        rx="4.2"
        ry="4.8"
        fill="#fff"
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
      <ellipse
        cx="50"
        cy="40"
        rx="4.2"
        ry="4.8"
        fill="#fff"
        stroke="var(--ink)"
        strokeWidth="1.2"
      />
      <circle cx="31" cy="41" r="2.2" fill="#2a1810" />
      <circle cx="51" cy="41" r="2.2" fill="#2a1810" />
      <circle cx="31.8" cy="40" r="0.7" fill="#fff" />
      <circle cx="51.8" cy="40" r="0.7" fill="#fff" />
    </svg>
  );
}

function DogSVG() {
  return (
    <svg
      viewBox="0 0 200 150"
      width="152"
      height="114"
      className="robodog-svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="dogFur" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#e8d4b0" />
          <stop offset="45%" stopColor="#c9a66b" />
          <stop offset="100%" stopColor="#8f6b2e" />
        </linearGradient>
        <linearGradient id="dogFurDark" x1="0%" y1="0%" x2="30%" y2="100%">
          <stop offset="0%" stopColor="#b8924a" />
          <stop offset="100%" stopColor="#6e4f1c" />
        </linearGradient>
        <linearGradient id="dogMuzzle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f7eedc" />
          <stop offset="100%" stopColor="#d9c4a0" />
        </linearGradient>
        <radialGradient id="dogCheek" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#f2dcb8" />
          <stop offset="100%" stopColor="#c4a06a" />
        </radialGradient>
      </defs>

      <ellipse cx="102" cy="140" rx="56" ry="5.5" fill="var(--ink)" opacity="0.14" />

      {/* Tail */}
      <g className="robodog-tail-path">
        <path
          d="M44 82c-20-24-10-46 12-50 1 10-4 22 0 34 3 10 0 18-6 22z"
          fill="url(#dogFurDark)"
          stroke="var(--ink)"
          strokeWidth="2.3"
          strokeLinejoin="round"
        />
        <path
          d="M50 74c-8-16-4-30 6-34"
          stroke="#ead6b4"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
      </g>

      {/* Hind legs */}
      <path
        d="M70 98c-3 14-1 26 1 32 1 2 5 3 9 2l3-1c0-12-1-22 1-33z"
        fill="url(#dogFurDark)"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M90 100c0 12 1 24 0 30 0 2 4 4 8 3l4-1c0-10 1-22 2-32z"
        fill="url(#dogFur)"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <ellipse cx="78" cy="132" rx="10" ry="4.8" fill="#4a3210" stroke="var(--ink)" strokeWidth="1.7" />
      <ellipse cx="98" cy="132" rx="10" ry="4.8" fill="#4a3210" stroke="var(--ink)" strokeWidth="1.7" />

      {/* Body */}
      <ellipse
        cx="102"
        cy="90"
        rx="50"
        ry="34"
        fill="url(#dogFur)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />
      <ellipse cx="110" cy="102" rx="30" ry="17" fill="#f4e8d4" opacity="0.88" />
      <path
        d="M78 72c10 5 24 7 40 2"
        stroke="#8f6b2e"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.18"
        fill="none"
      />

      {/* Front legs */}
      <path
        d="M120 96c2 12 4 24 3 34-1 2 3 4 7 3l5-1c2-12 1-24-2-34z"
        fill="url(#dogFur)"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M138 92c3 14 5 26 4 36 0 2 4 4 8 3l4-1c1-13 0-26-3-36z"
        fill="url(#dogFurDark)"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <ellipse cx="128" cy="132" rx="10" ry="4.8" fill="#4a3210" stroke="var(--ink)" strokeWidth="1.7" />
      <ellipse cx="146" cy="130" rx="10" ry="4.8" fill="#4a3210" stroke="var(--ink)" strokeWidth="1.7" />

      {/* Neck */}
      <path
        d="M130 72c12-10 20-20 24-32 10 8 12 22 6 32-8 10-18 14-30 12z"
        fill="url(#dogFur)"
        stroke="var(--ink)"
        strokeWidth="2.3"
        strokeLinejoin="round"
      />

      {/* Far ear */}
      <path
        d="M150 30c5-18 18-24 26-18-3 14-10 24-20 28z"
        fill="#7a5a20"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />

      {/* Head */}
      <ellipse
        cx="154"
        cy="44"
        rx="28"
        ry="26"
        fill="url(#dogCheek)"
        stroke="var(--ink)"
        strokeWidth="2.5"
      />

      {/* Near floppy ear */}
      <path
        d="M138 36c-12-8-16-24-6-34 16 4 20 16 16 30z"
        fill="url(#dogFurDark)"
        stroke="var(--ink)"
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M136 30c-5-8-5-16-1-22"
        stroke="#5c4010"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />

      {/* Muzzle */}
      <ellipse
        cx="172"
        cy="52"
        rx="17"
        ry="13"
        fill="url(#dogMuzzle)"
        stroke="var(--ink)"
        strokeWidth="2.1"
      />
      <ellipse cx="180" cy="48" rx="5.5" ry="4.2" fill="#1a1a2e" />
      <ellipse cx="178.2" cy="46.4" rx="1.6" ry="1.1" fill="#fff" opacity="0.5" />
      <path
        d="M172 54c4 6 14 6 18 1"
        stroke="#1a1a2e"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M172 54v5" stroke="#1a1a2e" strokeWidth="1.6" strokeLinecap="round" />

      {/* Eye */}
      <ellipse
        cx="148"
        cy="40"
        rx="6"
        ry="6.8"
        fill="#fff"
        stroke="var(--ink)"
        strokeWidth="1.5"
      />
      <circle cx="150" cy="41.5" r="3.5" fill="#2a1810" />
      <circle cx="151.4" cy="39.8" r="1.2" fill="#fff" />
      <path
        d="M141 33c5-4 12-4 16 0"
        stroke="#5c4010"
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Whisker marks */}
      <circle cx="166" cy="54" r="1" fill="#5c4010" opacity="0.45" />
      <circle cx="168" cy="57" r="1" fill="#5c4010" opacity="0.45" />
      <circle cx="164" cy="57" r="1" fill="#5c4010" opacity="0.45" />

      {/* Collar + tag */}
      <path
        d="M132 68c12 9 26 11 40 4"
        stroke="#222230"
        strokeWidth="5.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M132 68c12 9 26 11 40 4"
        stroke="var(--coral)"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="152" cy="76" r="5.5" fill="var(--teal)" stroke="var(--ink)" strokeWidth="1.8" />
      <circle cx="152" cy="76" r="2.2" fill="var(--surface)" opacity="0.95" />
    </svg>
  );
}
