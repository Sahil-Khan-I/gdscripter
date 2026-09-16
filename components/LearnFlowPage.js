"use client";

import Link from "next/link";
import { LEARN_FLOW, LEARN_SECTIONS } from "../lib/learn-path";

const colorChip = {
  coral: "bg-coral text-white",
  gold: "bg-gold text-ink",
  teal: "bg-teal text-white",
  sky: "bg-sky text-ink",
  mint: "bg-mint text-ink",
};

export default function LearnFlowPage() {
  return (
    <main className="mx-auto max-w-5xl px-3 sm:px-4 py-6 sm:py-10">
      <header className="mb-8 anim-bounce-in">
        <p className="chip bg-gold mb-3">Roadmap</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Learning path</h1>
        <p className="font-bold text-ink-soft max-w-2xl text-sm sm:text-base mb-2">
          From integers to 3D — one flowchart, simplified docs, and practice links.
          Skip ahead if you want; just don&apos;t pretend Vector3 makes sense before
          Vector2.
        </p>
        <p className="font-extrabold text-coral text-sm italic">
          This is the map. Play / Lab / Build are the gym.
        </p>
      </header>

      {/* Flowchart */}
      <section className="mb-12 overflow-x-auto pb-2">
        <h2 className="font-black text-xl mb-4">Flowchart</h2>
        <div className="flow-track min-w-[640px] sm:min-w-0">
          {LEARN_FLOW.map((node, i) => (
            <div key={node.id} className="flow-node-wrap">
              {i > 0 && <div className="flow-arrow" aria-hidden />}
              <Link
                href={node.href}
                className="flow-node panel no-underline text-ink block hover:-translate-y-0.5 transition-transform"
              >
                <span className={`chip mb-2 ${colorChip[node.color]}`}>
                  {node.emoji}. {node.title}
                </span>
                <p className="text-xs font-bold text-ink-soft m-0 mb-2">{node.blurb}</p>
                <span className="text-xs font-extrabold text-coral">
                  Practice → {node.practice.replace(/^\//, "")}
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/lab" className="btn-arcade btn-coral !py-2 !text-sm">
            Open Sprite Lab
          </Link>
          <Link href="/play" className="btn-arcade btn-ghost !py-2 !text-sm">
            Mini-games
          </Link>
          <Link href="/build" className="btn-arcade btn-ghost !py-2 !text-sm">
            Build tutorials
          </Link>
        </div>
      </section>

      {/* Docs */}
      <section className="space-y-8">
        {LEARN_SECTIONS.map((sec) => (
          <article key={sec.id} id={sec.id} className="scroll-mt-28">
            <h2 className="text-2xl font-black mb-1">{sec.title}</h2>
            <p className="font-extrabold text-coral text-sm italic mb-4">{sec.roast}</p>
            <div className="space-y-3">
              {sec.blocks.map((b) => (
                <div key={b.h} className="panel p-4 sm:p-5">
                  <h3 className="font-black text-base m-0 mb-1">{b.h}</h3>
                  {b.p && (
                    <p className="font-bold text-ink-soft text-sm m-0 mb-2">{b.p}</p>
                  )}
                  {b.code && <pre className="code-block whitespace-pre-wrap m-0">{b.code}</pre>}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link
                href={
                  LEARN_FLOW.find(
                    (f) => f.id === sec.id || sec.id.includes(f.id) || f.id.includes(sec.id.replace("gamedev", "")),
                  )?.practice || "/cards"
                }
                className="font-extrabold text-sm text-coral no-underline hover:underline"
              >
                Practice this chapter →
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
