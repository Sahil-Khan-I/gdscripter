import Link from "next/link";
import PathPicker from "../components/PathPicker";
import { FLASHCARDS } from "../lib/flashcards";
import { GAME_STATS } from "../lib/game-data";

const TOPICS = [
  { title: "Variables & types", detail: "var, const, typing, enums, strings" },
  { title: "Functions & lifecycle", detail: "_ready, _process, physics step, returns" },
  { title: "Signals & await", detail: "connect, emit, timers, animation waits" },
  { title: "Nodes & scenes", detail: "$ paths, @onready, groups, instantiate" },
  { title: "Data & control flow", detail: "Arrays, Dictionaries, match, loops" },
  { title: "Movement & input", detail: "delta, CharacterBody2D, Input Map" },
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
            className="anim-float absolute -right-6 top-14 h-44 w-44 rounded-[2.2rem] bg-coral border-[3px] border-ink shadow-[6px_6px_0_#16162a] max-sm:h-28 max-sm:w-28"
            style={{ "--rot": "12deg" }}
          />
          <div
            className="anim-float absolute right-28 top-52 h-24 w-24 rounded-full bg-teal border-[3px] border-ink max-sm:hidden"
            style={{ animationDelay: "0.5s" }}
          />
          <div
            className="anim-float absolute right-8 bottom-24 h-32 w-32 rounded-3xl bg-gold border-[3px] border-ink shadow-[5px_5px_0_#16162a] max-sm:h-20 max-sm:w-20 max-sm:bottom-10"
            style={{ animationDelay: "1s", "--rot": "-8deg" }}
          />
          <div className="absolute -left-10 bottom-16 h-40 w-40 rounded-full bg-sky/80 border-[3px] border-ink opacity-90 max-sm:h-24 max-sm:w-24" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-12 sm:py-16 w-full">
          <div className="anim-bounce-in max-w-2xl">
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="chip bg-gold">Godot 4</span>
              <span className="chip bg-[#D8FFF6]">Open source</span>
              <span className="chip bg-[#FFE0EC]">Competitive learning</span>
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
              <span className="chip bg-white">{cardCount}+ cards</span>
              <span className="chip bg-white">{challengeCount}+ challenges</span>
              <span className="chip bg-white">2 build tutorials</span>
            </div>
          </div>
        </div>
      </section>

      <PathPicker />

      <section className="border-t-[3px] border-ink bg-surface/80">
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

      <section className="border-t-[3px] border-ink bg-[#FFF0E3]/70">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">
                What you&apos;ll learn
              </h2>
              <p className="font-bold text-ink-soft mb-6 text-sm sm:text-base">
                Practical Godot 4 / GDScript — the stuff you type in real projects.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3 p-0 m-0 list-none">
                {TOPICS.map((t) => (
                  <li key={t.title} className="panel p-4">
                    <p className="font-black m-0 mb-1">{t.title}</p>
                    <p className="text-sm font-bold text-ink-soft m-0">{t.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black mb-2">
                A taste of GDScript
              </h2>
              <p className="font-bold text-ink-soft mb-4 text-sm sm:text-base">
                Patterns you&apos;ll meet in Play, Cards, and Build:
              </p>
              <pre className="code-block mb-4">{`extends CharacterBody2D

@export var speed := 220.0
signal died

func _physics_process(delta):
    var dir = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
    velocity = dir * speed
    move_and_slide()

func take_hit(amount: int) -> void:
    health -= amount
    if health <= 0:
        died.emit()
        queue_free()`}</pre>
              <Link
                href="/cards"
                className="btn-arcade btn-teal btn-arcade-stack sm:!w-auto"
              >
                Learn each piece on cards
              </Link>
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
