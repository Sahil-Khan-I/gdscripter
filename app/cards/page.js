"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  FLASHCARDS,
  CARD_TAGS,
  cardsByTag,
  wrongAnswersFor,
} from "../../lib/flashcards";
import {
  addXp,
  getProgress,
  markCardKnown,
  markCardLearning,
} from "../../lib/progress";
import { shuffle } from "../../lib/game-data";
import {
  pickTaunt,
  TAUNTS_CORRECT,
  TAUNTS_WRONG,
} from "../../lib/taunts";
import { Suspense } from "react";

export default function CardsPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-4 py-10 font-extrabold text-ink-soft">
          Loading deck…
        </main>
      }
    >
      <CardsInner />
    </Suspense>
  );
}

function CardsInner() {
  const search = useSearchParams();
  const initialTag = CARD_TAGS.includes(search.get("tag"))
    ? search.get("tag")
    : "all";
  const initialMode = search.get("mode") === "speed" ? "speed" : "flip";

  const [mode, setMode] = useState(initialMode);
  const [tag, setTag] = useState(initialTag);
  const [known, setKnown] = useState(0);

  useEffect(() => {
    const t = search.get("tag");
    const m = search.get("mode");
    if (t && CARD_TAGS.includes(t)) setTag(t);
    if (m === "speed" || m === "flip") setMode(m);
  }, [search]);

  useEffect(() => {
    setKnown((getProgress().knownCards || []).length);
    const sync = () => setKnown((getProgress().knownCards || []).length);
    window.addEventListener("gdscripter-progress", sync);
    return () => window.removeEventListener("gdscripter-progress", sync);
  }, []);

  const pool = useMemo(() => cardsByTag(tag), [tag]);
  const pct = Math.min(100, Math.round((known / FLASHCARDS.length) * 100));

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
      <header className="mb-8 anim-bounce-in">
        <p className="chip bg-[#D8FFF6] mb-3">{FLASHCARDS.length} cards in deck</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Flashcards</h1>
        <p className="font-bold text-ink-soft mb-2 text-sm sm:text-base">
          Pick a topic, flip to learn, then Speed mode to prove you weren&apos;t
          just vibing.
        </p>
        <p className="font-extrabold text-coral text-sm italic mb-4">
          Marking &quot;Know it&quot; when you don&apos;t is a crime. The XP bar knows.
        </p>
        <div className="panel-soft p-4 mb-5">
          <div className="flex justify-between text-sm font-extrabold mb-2 gap-2 flex-wrap">
            <span>Deck mastery</span>
            <span>
              {known}/{FLASHCARDS.length} known · {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            type="button"
            className={`btn-arcade ${mode === "flip" ? "btn-teal" : "btn-ghost"} !py-2 !text-sm`}
            onClick={() => setMode("flip")}
          >
            Flip mode
          </button>
          <button
            type="button"
            className={`btn-arcade ${mode === "speed" ? "btn-coral" : "btn-ghost"} !py-2 !text-sm`}
            onClick={() => setMode("speed")}
          >
            Speed mode
          </button>
        </div>
        <p className="text-xs font-extrabold text-ink-soft mb-2 uppercase tracking-wide">
          Start from a topic
        </p>
        <div className="tag-scroll">
          {CARD_TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`chip shrink-0 !text-xs ${
                tag === t ? "bg-ink text-white" : "bg-white"
              }`}
            >
              {t}
              {t !== "all" ? ` (${cardsByTag(t).length})` : ""}
            </button>
          ))}
        </div>
      </header>

      {pool.length === 0 ? (
        <p className="font-bold text-ink-soft">No cards in this topic yet.</p>
      ) : mode === "flip" ? (
        <FlipMode key={tag} pool={pool} />
      ) : (
        <SpeedMode key={`speed-${tag}`} pool={pool} />
      )}
    </main>
  );
}

function FlipMode({ pool }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [taunt, setTaunt] = useState("");
  const [deck, setDeck] = useState(() => shuffle(pool));

  useEffect(() => {
    setDeck(shuffle(pool));
    setIndex(0);
    setFlipped(false);
  }, [pool]);

  const card = deck[index % deck.length];
  if (!card) return null;

  function next() {
    setFlipped(false);
    setFeedback(null);
    setTaunt("");
    setIndex((i) => i + 1);
  }

  function know() {
    markCardKnown(card.id);
    addXp(8);
    setFeedback("known");
    setTaunt(pickTaunt(TAUNTS_CORRECT));
    setTimeout(next, 500);
  }

  function learning() {
    markCardLearning(card.id);
    setFeedback("learning");
    setTaunt("Honest. Rare. The deck respects you more for this.");
    setTimeout(next, 500);
  }

  return (
    <div>
      <p className="text-sm font-extrabold text-ink-soft mb-3">
        Card {(index % deck.length) + 1} / {deck.length}
      </p>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className={`panel w-full min-h-[220px] sm:min-h-[260px] p-5 sm:p-8 text-left cursor-pointer transition-colors ${
          flipped ? "bg-[#F0FFFB]" : "bg-white"
        }`}
      >
        {!flipped ? (
          <div className="anim-pop">
            <span className="chip bg-[#FFE8D6] mb-4">{card.tag}</span>
            <p className="text-xl sm:text-2xl font-black m-0 leading-snug">{card.front}</p>
            <p className="mt-8 text-sm font-bold text-ink-soft">Tap to reveal answer</p>
          </div>
        ) : (
          <div className="anim-pop">
            <span className="chip bg-[#D8FFF6] mb-4">answer</span>
            <pre className="font-mono text-sm sm:text-[0.95rem] font-semibold whitespace-pre-wrap m-0 text-ink leading-relaxed">
              {card.back}
            </pre>
          </div>
        )}
      </button>

      {flipped && (
        <div className="mt-4 flex flex-wrap gap-3 anim-pop">
          <button type="button" className="btn-arcade btn-teal" onClick={know}>
            Know it (+8 XP)
          </button>
          <button type="button" className="btn-arcade btn-ghost" onClick={learning}>
            Still learning
          </button>
        </div>
      )}

      {feedback && (
        <p
          className={`mt-3 font-extrabold text-sm italic anim-pop ${
            feedback === "known" ? "text-teal-deep" : "text-coral"
          }`}
        >
          {taunt}
        </p>
      )}
    </div>
  );
}

function SpeedMode({ pool }) {
  const DURATION = 60;
  const [running, setRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [shake, setShake] = useState(false);
  const [pop, setPop] = useState(false);
  const [taunt, setTaunt] = useState("");
  const [order] = useState(() => shuffle(pool));

  const question = useMemo(() => {
    const card = order[round % order.length];
    const wrongs = wrongAnswersFor(card, pool);
    const choices = shuffle([card.back, ...wrongs]);
    return { card, choices };
  }, [round, order, pool]);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) {
      setRunning(false);
      if (score > 0) addXp(score * 2);
      return;
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, timeLeft, score]);

  function start() {
    setScore(0);
    setRound(0);
    setTimeLeft(DURATION);
    setRunning(true);
    setTaunt("");
  }

  function pick(choice) {
    if (!running) return;
    if (choice === question.card.back) {
      setScore((s) => s + 1);
      setPop(true);
      setTaunt(pickTaunt(TAUNTS_CORRECT));
      setTimeout(() => setPop(false), 350);
    } else {
      setShake(true);
      setTaunt(pickTaunt(TAUNTS_WRONG));
      setTimeout(() => setShake(false), 350);
    }
    setRound((r) => r + 1);
  }

  if (!running && timeLeft === DURATION && score === 0) {
    return (
      <div className="panel p-6 sm:p-8 text-center">
        <h2 className="text-2xl font-black mb-2">Speed round</h2>
        <p className="font-bold text-ink-soft mb-2">
          {DURATION} seconds · {pool.length} cards in this filter
        </p>
        <p className="font-extrabold text-coral text-sm italic mb-6">
          The clock is undefeated. You are the underdog. Cute.
        </p>
        <button type="button" className="btn-arcade btn-coral" onClick={start}>
          Start timer
        </button>
      </div>
    );
  }

  if (!running && timeLeft <= 0) {
    return (
      <div className="panel p-6 sm:p-8 text-center anim-pop">
        <h2 className="text-2xl font-black mb-2">Time!</h2>
        <p className="text-5xl font-black text-coral mb-2">{score}</p>
        <p className="font-bold text-ink-soft mb-2">correct · +{score * 2} XP</p>
        <p className="font-extrabold text-sm italic text-coral mb-6">
          {score === 0
            ? "Zero. At least you showed up. That's… something."
            : score < 5
              ? "A start. The leaderboard in your head is already rewriting history."
              : "Respectable. Don't screenshot it like a participation trophy."}
        </p>
        <button type="button" className="btn-arcade btn-gold" onClick={start}>
          Play again
        </button>
      </div>
    );
  }

  return (
    <div className={shake ? "anim-shake" : ""}>
      <div className="flex justify-between items-center mb-2 font-extrabold gap-2 flex-wrap">
        <span className="chip bg-coral text-white">{timeLeft}s left</span>
        <span className={`chip bg-gold ${pop ? "anim-pop" : ""}`}>Score {score}</span>
      </div>
      {taunt && (
        <p className="font-extrabold text-xs sm:text-sm italic text-ink-soft mb-3">{taunt}</p>
      )}
      <div className="panel p-4 sm:p-6 mb-4">
        <span className="chip bg-[#FFE8D6] mb-3">{question.card.tag}</span>
        <p className="text-lg sm:text-xl font-black m-0">{question.card.front}</p>
      </div>
      <div className="grid gap-3">
        {question.choices.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => pick(c)}
            className="panel p-3 sm:p-4 text-left font-bold hover:bg-[#FFF1E6] transition-colors"
          >
            <pre className="font-mono text-xs sm:text-sm whitespace-pre-wrap m-0 line-clamp-4">{c}</pre>
          </button>
        ))}
      </div>
    </div>
  );
}
