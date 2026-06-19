"use client";

import { useEffect, useState } from "react";

const BLINK = "_";

export default function Home() {
  const [cursor, setCursor] = useState(true);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCursor((c) => !c), 530);
    const b = setTimeout(() => setBootDone(true), 600);
    return () => {
      clearInterval(t);
      clearTimeout(b);
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#0d0d0d] text-[#d4d4d4] font-mono px-4 py-10 selection:bg-[#3a5f3a] selection:text-white">
      {/* faint scanline texture, not a gradient hero */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.04] mix-blend-screen"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)",
        }}
      />

      <div className="max-w-2xl mx-auto">
        {/* top tag row — uneven, not centered/balanced like a template */}
        <div className="flex flex-wrap gap-2 text-[11px] mb-8 -rotate-[0.4deg]">
          <span className="border border-[#444] px-2 py-0.5 text-[#7fb37f]">
            OPEN SOURCE
          </span>
          <span className="border border-[#444] px-2 py-0.5 text-[#c9a86a]">
            GODOT 4
          </span>
          <span className="border border-[#444] px-2 py-0.5 text-[#888] rotate-[1deg]">
            COMMUNITY DRIVEN, FOR NOW JUST ME
          </span>
        </div>

        {/* title block, terminal prompt style instead of polished hero */}
        <div className="mb-1 text-[#5fa05f] text-sm">
          guest@gdscripter:~$ whoami
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-1 text-white">
          GDScripter{" "}
          <span className="text-[#5fa05f]">
            {bootDone ? (cursor ? BLINK : "\u00A0") : BLINK}
          </span>
        </h1>
        <p className="text-[#888] text-sm mb-8">
          v0.1.0 — still rough around the edges. learn / build / contribute.
        </p>

        <div className="grid grid-cols-3 gap-3 text-center text-xs mb-8 text-[#aaa]">
          <div className="border border-[#2a2a2a] py-3 hover:border-[#5fa05f] hover:text-[#5fa05f] transition-colors">
            learn gdscript
          </div>
          <div className="border border-[#2a2a2a] py-3 hover:border-[#5fa05f] hover:text-[#5fa05f] transition-colors">
            build games
          </div>
          <div className="border border-[#2a2a2a] py-3 hover:border-[#5fa05f] hover:text-[#5fa05f] transition-colors">
            create faster
          </div>
        </div>

        <p className="text-[#d4d4d4] mb-1">
          the open-source guide to GDScript and Godot.
        </p>
        <p className="text-[#888] text-sm leading-relaxed mb-8 whitespace-pre-wrap">
          {`whether you're writing your first line of code, building your
first game, or poking around advanced game architecture —
this is meant to be practical guides, real examples, and docs
that don't go stale in six months.`}
        </p>

        {/* terminal block — actual fake terminal, not decorative code screenshot */}
        <TerminalBlock />

        <Divider />

        <SectionHeader>why_i_built_gdscripter.txt</SectionHeader>
        <p className="text-sm leading-relaxed text-[#bbb] whitespace-pre-wrap mb-2">
          {`last year I got into GDScript and Godot through Hack Club.

like every beginner I got hyped to start making games, and then
immediately ran into the usual problem — info scattered everywhere.
tutorials go stale, examples break on newer Godot versions, and
"accurate info" means jumping between 4 youtube videos, the docs,
a forum thread from 2021, and someone's abandoned github repo.

the official Godot docs are genuinely good. I just wanted one
place that strings learning paths + working examples + community
fixes together without rotting.`}
        </p>
        <blockquote className="border-l-2 border-[#5fa05f] pl-3 text-[#7fb37f] text-sm my-4">
          create a free, open-source place to learn GDScript and Godot
          from zero.
        </blockquote>
        <p className="text-sm leading-relaxed text-[#bbb] whitespace-pre-wrap">
          {`this isn't really "my" project, it's more of a shared notebook.
found a better explanation? outdated section? useful example?
PR it. that's the whole model.`}
        </p>

        <Divider />

        <SectionHeader>what_youll_find_here</SectionHeader>
        <ul className="text-sm text-[#bbb] space-y-4">
          <li>
            <span className="text-[#d4d4d4] font-bold">📘 learn gdscript</span>
            <br />
            variables, functions, loops, arrays, dicts, classes, signals,
            resources, the usual rabbit holes.
          </li>
          <li>
            <span className="text-[#d4d4d4] font-bold">🎮 build with godot</span>
            <br />
            nodes, scenes, physics, animation, UI, audio, 2D + 3D workflows.
          </li>
          <li>
            <span className="text-[#d4d4d4] font-bold">🚀 ship real projects</span>
            <br />
            architecture, save systems, inventories, multiplayer, the stuff
            tutorials skip.
          </li>
        </ul>

        <Divider />

        <SectionHeader>roadmap</SectionHeader>
        <pre className="text-xs text-[#7fa07f] leading-tight overflow-x-auto mb-2">
{`intro
 └─ gdscript basics
     └─ functions
         └─ classes
             └─ signals
                 └─ godot fundamentals
                     └─ 2D dev
                         └─ 3D dev
                             └─ advanced topics
                                 └─ game architecture (you are ~here, ish)`}
        </pre>

        <Divider />

        <SectionHeader>why_gdscripter</SectionHeader>
        <ul className="text-sm text-[#bbb] grid grid-cols-1 gap-1">
          {[
            "open source, always",
            "community driven (read: PRs welcome, seriously)",
            "beginner friendly, no gatekeeping",
            "updated when stuff breaks, not on a schedule",
            "examples that actually run",
            "built for real projects, not toy demos",
            "free. forever. no asterisk.",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-[#5fa05f]">{">"}</span>
              {t}
            </li>
          ))}
        </ul>

        <Divider />

        <SectionHeader>contribute</SectionHeader>
        <p className="text-sm leading-relaxed text-[#bbb] whitespace-pre-wrap">
          {`this thing is built in public, messily.

found a typo? open a PR.
found outdated info? fix it, don't just complain about it.
built something useful? share it, someone else needs it too.
want to help a beginner not rage-quit Godot? do that.

every small fix makes this less annoying for the next person.`}
        </p>

        <Divider />

        <SectionHeader>mission</SectionHeader>
        <pre className="bg-[#111] border border-[#2a2a2a] p-4 rounded-none text-xs text-[#9fcf9f] overflow-x-auto mb-4">
{`extends Node

func _ready():
    print("happy game development!")`}
        </pre>

        <p className="text-sm text-[#888] mb-12">
          from your first variable to your first shipped game.
        </p>

        <div className="text-[10px] text-[#555] border-t border-[#222] pt-4">
          gdscripter is not affiliated with Godot Engine. just a fan
          project trying to make the learning curve less painful.
        </div>
      </div>
    </main>
  );
}

function Divider() {
  return <div className="text-[#333] text-xs my-8 select-none">{"//".repeat(20)}</div>;
}

function SectionHeader({ children }) {
  return (
    <h2 className="text-[#5fa05f] text-sm mb-3">
      <span className="text-[#444]">{"> "}</span>
      {children}
    </h2>
  );
}

function TerminalBlock() {
  const lines = [
    "$ learn gdscript",
    "",
    "loading...",
    "[x] variables",
    "[x] functions",
    "[x] signals",
    "[x] nodes",
    "[x] scenes",
    "",
    "ready. (mostly)",
  ];
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const id = setTimeout(() => setShown((s) => s + 1), 140);
    return () => clearTimeout(id);
  }, [shown, lines.length]);

  return (
    <pre className="bg-black border border-[#2a2a2a] p-4 text-xs leading-relaxed text-[#7fa07f] mb-8 overflow-x-auto">
      {lines.slice(0, shown).map((l, i) => (
        <div key={i}>{l || "\u00A0"}</div>
      ))}
    </pre>
  );
}
