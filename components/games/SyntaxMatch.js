"use client";

import { useMemo, useState, useEffect } from "react";
import { MATCH_PAIRS, shuffle } from "../../lib/game-data";
import { addXp } from "../../lib/progress";
import { pickTaunt, TAUNTS_CORRECT, TAUNTS_WRONG } from "../../lib/taunts";

const ROUND_SIZE = 6;
const TIME_BONUS_SEC = 45;

export default function SyntaxMatch({ onExit }) {
  const [round, setRound] = useState(0);
  const pairs = useMemo(
    () => shuffle(MATCH_PAIRS).slice(0, ROUND_SIZE),
    [round],
  );
  const [terms, setTerms] = useState([]);
  const [defs, setDefs] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [matched, setMatched] = useState([]);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(TIME_BONUS_SEC);
  const [done, setDone] = useState(false);
  const [bad, setBad] = useState(false);
  const [taunt, setTaunt] = useState("");

  useEffect(() => {
    setTerms(shuffle(pairs.map((p) => p.term)));
    setDefs(shuffle(pairs.map((p) => p.definition)));
    setMatched([]);
    setSelectedTerm(null);
    setSeconds(TIME_BONUS_SEC);
    setDone(false);
  }, [pairs]);

  useEffect(() => {
    if (done) return;
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, done]);

  useEffect(() => {
    if (matched.length === ROUND_SIZE && !done) {
      setDone(true);
      const bonus = Math.max(0, seconds);
      const gained = ROUND_SIZE * 8 + bonus;
      setScore((s) => s + gained);
      addXp(gained);
    }
  }, [matched, done, seconds]);

  function pickTerm(term) {
    if (matched.includes(term) || done) return;
    setSelectedTerm(term);
  }

  function pickDef(definition) {
    if (!selectedTerm || done) return;
    const pair = pairs.find((p) => p.term === selectedTerm);
    if (pair && pair.definition === definition) {
      setMatched((m) => [...m, selectedTerm]);
      setSelectedTerm(null);
      setTaunt(pickTaunt(TAUNTS_CORRECT));
    } else {
      setBad(true);
      setTaunt(pickTaunt(TAUNTS_WRONG));
      setTimeout(() => setBad(false), 350);
      setSelectedTerm(null);
    }
  }

  function nextRound() {
    setRound((r) => r + 1);
  }

  return (
    <div className={bad ? "anim-shake" : ""}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <button type="button" className="btn-arcade btn-ghost !py-2 !text-sm" onClick={onExit}>
          ← Hub
        </button>
        <div className="flex gap-2">
          <span className="chip bg-teal text-white">{seconds}s</span>
          <span className="chip bg-gold">Score {score}</span>
        </div>
      </div>

      <h2 className="text-2xl font-black mb-1">Syntax Match</h2>
      <p className="font-bold text-ink-soft mb-2 text-sm sm:text-base">
        Match each term to its definition. Faster = more XP. Wrong pairs get commentary.
      </p>
      {taunt && (
        <p className="font-extrabold text-sm italic text-coral mb-4">{taunt}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          {terms.map((term) => (
            <button
              key={term}
              type="button"
              disabled={matched.includes(term)}
              onClick={() => pickTerm(term)}
              className={`w-full panel p-3 text-left font-extrabold transition-colors ${
                matched.includes(term)
                  ? "opacity-40"
                  : selectedTerm === term
                    ? "bg-coral text-white"
                    : "hover:bg-[#FFF1E6]"
              }`}
            >
              <code className="font-mono">{term}</code>
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {defs.map((definition) => {
            const taken = pairs.some(
              (p) => matched.includes(p.term) && p.definition === definition,
            );
            return (
              <button
                key={definition}
                type="button"
                disabled={taken || !selectedTerm}
                onClick={() => pickDef(definition)}
                className={`w-full panel p-3 text-left font-bold text-sm transition-colors ${
                  taken ? "opacity-40" : "hover:bg-[#D8FFF6]"
                }`}
              >
                {definition}
              </button>
            );
          })}
        </div>
      </div>

      {done && (
        <div className="panel p-5 mt-5 anim-pop text-center">
          <p className="font-black text-xl text-teal-deep m-0 mb-1">Round clear!</p>
          <p className="font-extrabold text-sm italic text-coral mb-2">
            Fine. You matched vocabulary. Don&apos;t let it go to your head.
          </p>
          <p className="font-bold text-ink-soft mb-4">
            Time bonus {Math.max(0, seconds)}s baked into XP
          </p>
          <button type="button" className="btn-arcade btn-teal" onClick={nextRound}>
            Next round
          </button>
        </div>
      )}
    </div>
  );
}
