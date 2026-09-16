"use client";

import Link from "next/link";
import { LEARN_FLOW, LEARN_SECTIONS } from "../lib/learn-path";
import PipelineFlow from "./graphs/PipelineFlow";
import SkillTree from "./graphs/SkillTree";
import SceneTreeGraph from "./graphs/SceneTreeGraph";
import DecisionFlow from "./graphs/DecisionFlow";

export default function LearnFlowPage() {
  return (
    <main className="mx-auto max-w-5xl px-3 sm:px-4 py-6 sm:py-10">
      <header className="mb-8 anim-bounce-in">
        <p className="chip bg-gold mb-3">Roadmap</p>
        <h1 className="text-3xl sm:text-4xl font-black mb-2">Learning path</h1>
        <p className="font-bold text-ink-soft max-w-2xl text-sm sm:text-base mb-2">
          Real flowcharts — pipelines, skill trees, scene trees — not a wall of
          boxes. Click nodes to jump into docs or practice.
        </p>
        <p className="font-extrabold text-coral text-sm italic">
          Follow the arrows. Or ignore them and get roasted by Byte later.
        </p>
      </header>

      <section className="mb-10 space-y-6">
        <h2 className="font-black text-xl m-0">Maps</h2>
        <PipelineFlow />
        <SkillTree />
        <div className="grid lg:grid-cols-2 gap-6">
          <DecisionFlow />
          <SceneTreeGraph />
        </div>
        <div className="flex flex-wrap gap-2">
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

      <section className="mb-8">
        <h2 className="font-black text-xl mb-3">Chapter list</h2>
        <div className="chapter-rail">
          {LEARN_FLOW.map((node, i) => (
            <div key={node.id} className="chapter-rail-item">
              {i > 0 && <span className="chapter-rail-line" aria-hidden />}
              <Link href={node.href} className="chapter-rail-node">
                <span className="chapter-rail-idx">{node.emoji}</span>
                <span className="chapter-rail-label">{node.title}</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

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
                  {b.code && (
                    <pre className="code-block whitespace-pre-wrap m-0">{b.code}</pre>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3">
              <Link
                href={
                  LEARN_FLOW.find(
                    (f) =>
                      f.id === sec.id ||
                      `gamedev${f.id}` === sec.id ||
                      sec.id.endsWith(f.id),
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
