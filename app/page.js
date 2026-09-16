import Link from "next/link";
import PathPicker from "../components/PathPicker";
import RoboDog from "../components/RoboDog";
import PipelineFlow from "../components/graphs/PipelineFlow";
import { FLASHCARDS } from "../lib/flashcards";
import { GAME_STATS } from "../lib/game-data";

const TOPICS = [
  {
    title: "Variables & types",
    detail: "var, const, typing, enums, strings",
    href: "/learn#syntax",
    accent: "coral",
    n: "01",
  },
  {
    title: "Functions & lifecycle",
    detail: "_ready, _process, physics step, returns",
    href: "/learn#functions",
    accent: "teal",
    n: "02",
  },
  {
    title: "Signals & await",
    detail: "connect, emit, timers, animation waits",
    href: "/learn#signals",
    accent: "gold",
    n: "03",
  },
  {
    title: "Nodes & scenes",
    detail: "$ paths, @onready, groups, instantiate",
    href: "/learn#nodes",
    accent: "sky",
    n: "04",
  },
  {
    title: "Data & control flow",
    detail: "Arrays, Dictionaries, match, loops",
    href: "/learn#control",
    accent: "mint",
    n: "05",
  },
  {
    title: "Movement & 3D",
    detail: "delta, CharacterBody2D/3D, Input Map",
    href: "/learn#gamedev3d",
    accent: "coral",
    n: "06",
  },
];


const HOW = [
  {
    step: "01",
    title: "Pick your starting lane",
    body: "Beginner? Signals? Chaos quiz? You choose. No forced campaign — just ego and XP.",
  },
  {
    step: "02",
    title: "Play + cards until Level 2",
    body: "100 XP unlocks Build tutorials. The site will roast you until you get there.",
  },
  {
    step: "03",
    title: "Ship a tiny game",
    body: "Platformer and Ping Pong vs AI — real Godot 4 steps, not vibes-only theory.",
  },
];

export default function Home() {
  const cardCount = FLASHCARDS.length;
  const challengeCount =
    GAME_STATS.bugs + GAME_STATS.fills + GAME_STATS.matches;

  return (
    <main className="relative overflow-hidden">
      <section className="relative min-h-[calc(100dvh-4.75rem)] flex items-center arcade-grid">
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden hero-shapes"
          aria-hidden
        >
          <div
            className="anim-float absolute -right-6 top-14 h-44 w-44 rounded-[2.2rem] bg-coral border-[3px] border-ink shadow-[6px_6px_0_var(--ink)] max-sm:h-28 max-sm:w-28"
            style={{ "--rot": "12deg" }}
          />
          <div
            className="anim-float absolute right-28 top-52 h-24 w-24 rounded-full bg-teal border-[3px] border-ink max-sm:hidden"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="anim-float absolute right-8 bottom-24 h-32 w-32 rounded-3xl bg-gold border-[3px] border-ink shadow-[5px_5px_0_var(--ink)] max-sm:h-20 max-sm:w-20 max-sm:bottom-10"
            style={{ animationDelay: "1s", "--rot": "-8deg" }}
          />
          <div className="absolute -left-10 bottom-16 h-40 w-40 rounded-full bg-sky/80 border-[3px] border-ink opacity-90 max-sm:h-24 max-sm:w-24" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16 w-full">
          <div className="anim-bounce-in max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="chip bg-gold">Godot 4</span>
              <span className="chip bg-[color-mix(in_srgb,var(--teal)_35%,var(--surface))]">Open source</span>
              <span className="chip bg-[color-mix(in_srgb,var(--coral)_28%,var(--surface))]">Byte approved</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[0.95] tracking-tight text-ink mb-4">
              <span className="text-coral">GD</span>Scripter
            </h1>
            <p className="text-xl sm:text-2xl font-extrabold text-ink-soft mb-3 max-w-lg">
              Learn GDScript like a game — then build one.
            </p>
            <p className="font-bold text-ink-soft mb-3 max-w-md text-sm sm:text-base">
              Mini-games. Flashcards. Sarcastic XP. Hit Level 2 and unlock a
              platformer + ping pong vs computer tutorial.
            </p>
            <p className="font-extrabold text-coral text-sm italic mb-8 max-w-md">
              Yes, the computer paddle will be better than you at first. That&apos;s
              the curriculum.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              <a href="#start" className="btn-arcade btn-coral btn-arcade-stack">
                Choose where to start
              </a>
              <Link href="/lab" className="btn-arcade btn-teal btn-arcade-stack">
                Sprite Lab
              </Link>
              <Link href="/learn" className="btn-arcade btn-ghost btn-arcade-stack">
                Full path
              </Link>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3 text-sm font-extrabold">
              <span className="chip bg-surface">{cardCount}+ cards</span>
              <span className="chip bg-surface">{challengeCount}+ challenges</span>
              <span className="chip bg-surface">2 build tutorials</span>
            </div>
          </div>
        </div>
      </section>

      <RoboDog />

      <PathPicker />

      <section id="how" className="border-t-[3px] border-ink bg-surface/80 scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">How it works</h2>
          <p className="font-bold text-ink-soft mb-8 max-w-xl text-sm sm:text-base">
            Short sessions. Instant feedback. Optional emotional damage.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {HOW.map((h) => (
              <div key={h.step} className="panel p-5">
                <span className="chip bg-ink text-white mb-3">{h.step}</span>
                <h3 className="font-black text-lg m-0 mb-2">{h.title}</h3>
                <p className="font-bold text-ink-soft m-0 text-sm">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-[3px] border-ink">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
          <h2 className="text-2xl sm:text-3xl font-black mb-2">Modes</h2>
          <p className="font-bold text-ink-soft mb-8 text-sm sm:text-base">
            Everything awards XP. Level 2 is the boss door.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <ModeLink
              href="/learn"
              title="Path"
              blurb="Flowchart: syntax → vectors → 2D → 3D"
              color="bg-mint text-ink"
              cta="Open roadmap"
            />
            <ModeLink
              href="/lab"
              title="Lab"
              blurb="Code a sprite to walk — levels + hints"
              color="bg-sky text-ink"
              cta="Enter lab"
            />
            <ModeLink
              href="/play"
              title="Play"
              blurb={`${GAME_STATS.bugs} bugs · ${GAME_STATS.matches} matches · ${GAME_STATS.fills} fills`}
              color="bg-coral text-white"
              cta="Open games"
            />
            <ModeLink
              href="/cards"
              title="Cards"
              blurb={`${cardCount} cards — filter any topic`}
              color="bg-teal text-white"
              cta="Flip now"
            />
            <ModeLink
              href="/build"
              title="Build"
              blurb="Platformer + Pong vs AI after Level 2"
              color="bg-gold text-ink"
              cta="View builds"
            />
            <ModeLink
              href="/contribute"
              title="Contribute"
              blurb="Ship cards, fixes, and your first PR"
              color="bg-ink text-white"
              cta="Learn how"
            />
          </div>
        </div>
      </section>

      <section className="learn-section border-t-[3px] border-ink">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
            <div>
              <p className="chip bg-gold mb-3">Curriculum</p>
              <h2 className="text-2xl sm:text-3xl font-black m-0 mb-2">
                What you&apos;ll learn
              </h2>
              <p className="font-bold text-ink-soft m-0 max-w-xl text-sm sm:text-base">
                From integers to 3D movement — tap a topic to jump into the path docs.
              </p>
            </div>
            <Link href="/learn" className="btn-arcade btn-ghost !py-2 !text-sm w-fit">
              Full flowchart →
            </Link>
          </div>

          <div className="mb-8">
            <PipelineFlow />
          </div>

          <div className="grid lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <ul className="lg:col-span-3 grid sm:grid-cols-2 gap-3 p-0 m-0 list-none">
              {TOPICS.map((t) => (
                <li key={t.title}>
                  <Link
                    href={t.href}
                    className={`topic-card topic-${t.accent} no-underline text-ink block`}
                  >
                    <span className="topic-num">{t.n}</span>
                    <span className="topic-title">{t.title}</span>
                    <span className="topic-detail">{t.detail}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="lg:col-span-2 taste-panel">
              <div className="taste-header">
                <span className="chip bg-teal text-white !border-ink">live snippet</span>
                <span className="taste-file font-mono">player.gd</span>
              </div>
              <p className="font-bold text-ink-soft text-sm m-0 mb-3">
                A pattern you&apos;ll meet in Lab, Play, and Build:
              </p>
              <pre className="code-block taste-code m-0 mb-4">{`extends CharacterBody2D

@export var speed := 220.0
signal died

func _physics_process(delta):
    var dir = Input.get_vector(
      "ui_left", "ui_right",
      "ui_up", "ui_down"
    )
    velocity = dir * speed
    move_and_slide()

func take_hit(amount: int) -> void:
    health -= amount
    if health <= 0:
        died.emit()
        queue_free()`}</pre>
              <div className="flex flex-wrap gap-2">
                <Link href="/cards" className="btn-arcade btn-teal !py-2 !text-sm">
                  Drill on cards
                </Link>
                <Link href="/lab" className="btn-arcade btn-ghost !py-2 !text-sm">
                  Try in Lab
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t-[3px] border-ink px-4 py-8 text-center text-sm font-bold text-ink-soft">
        GDScripter is not affiliated with Godot Engine — just here to make learning
        competitive enough that you finish.
      </footer>
    </main>
  );
}

function ModeLink({ href, title, blurb, color, cta }) {
  return (
    <Link
      href={href}
      className="panel p-5 no-underline text-ink block hover:-translate-y-1 transition-transform group"
    >
      <span className={`inline-block chip ${color} border-ink mb-3`}>{title}</span>
      <p className="font-bold text-ink-soft m-0 mb-4 text-sm">{blurb}</p>
      <span className="font-extrabold text-sm text-coral group-hover:underline">
        {cta} →
      </span>
    </Link>
  );
}
