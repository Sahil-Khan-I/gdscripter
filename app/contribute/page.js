import Link from "next/link";

const STEPS = [
  {
    n: "1",
    title: "Fork the repo",
    body: "Open the GDScripter GitHub repo and hit Fork. That gives you your own copy to edit safely without breaking main for everyone else.",
  },
  {
    n: "2",
    title: "Clone & run locally",
    body: "Clone your fork, run npm install, then npm run dev. Open localhost:3000 and confirm the arcade loads before you change anything.",
  },
  {
    n: "3",
    title: "Create a branch",
    body: "Branch off main with a clear name like fix/typo-signals or feat/physics-flashcards. One idea per branch keeps reviews easy.",
  },
  {
    n: "4",
    title: "Make a small change",
    body: "Edit lib/flashcards.js, lib/game-data.js, or a page under app/. Prefer tiny, focused PRs — a single card deck topic beats a mega-rewrite.",
  },
  {
    n: "5",
    title: "Open a pull request",
    body: "Push your branch, open a PR, and describe what you changed + how to test it. Screenshots help for UI. Be kind — we review together.",
  },
];

const WHERE = [
  {
    file: "lib/flashcards.js",
    why: "Add or fix Q&A cards. Include a clear front, back, and tag.",
  },
  {
    file: "lib/game-data.js",
    why: "New Bug Squash snippets, match pairs, or fill-in prompts.",
  },
  {
    file: "app/contribute/page.js",
    why: "Improve this guide — clearer steps help the next contributor.",
  },
  {
    file: "components/games/",
    why: "UX polish on mini-games: feedback, hints, accessibility.",
  },
];

const IDEAS = [
  "Add 5 beginner flashcards on signals or nodes",
  "Write a Bug Squash snippet for a real Godot 4 pitfall you hit",
  "Improve a confusing hint in Fill the Blank",
  "Add match pairs for AnimationPlayer / Tween vocabulary",
  "Fix a typo or outdated API mention on any page",
  "Suggest a fourth mini-game idea in an issue",
  "Improve mobile spacing or keyboard focus styles",
  "Translate a card deck topic into simpler wording for absolute beginners",
];

const RULES = [
  "Keep Godot 4 / GDScript 2 examples accurate",
  "Prefer short explanations over walls of text",
  "No AI-dumped walls of wrong APIs — verify in the editor if unsure",
  "Be welcoming in PR comments — this is a learning space",
];

export default function ContributePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <header className="mb-10 anim-bounce-in">
        <p className="chip bg-gold mb-4">Open source guide</p>
        <h1 className="text-4xl font-black mb-3">Contribute</h1>
        <p className="text-lg font-bold text-ink-soft max-w-xl mb-4">
          GDScripter is a shared playground for learning GDScript. If something
          confused you, you are the perfect person to make it clearer for the next
          player.
        </p>
        <p className="font-bold text-ink-soft text-sm max-w-xl">
          You do not need to be an expert. Typo fixes, one new card, or a better
          hint all count. First PRs are celebrated, not nitpicked into oblivion.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-2">Why contribute?</h2>
        <div className="prose-arcade">
          <p>
            Tutorials rot. Examples break on new Godot versions. Beginners bounce
            between four YouTube videos and a forum thread from 2021.
          </p>
          <p>
            This project exists so accurate, bite-sized practice lives in one fun
            place — and stays alive because people like you fix it when it drifts.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-5">
          {[
            { t: "Cards", d: "New Q&A for every topic tag" },
            { t: "Games", d: "Bugs, matches, fill-ins that teach" },
            { t: "Guides", d: "Clearer wording & onboarding" },
          ].map((x) => (
            <div key={x.t} className="panel p-4">
              <p className="font-black m-0">{x.t}</p>
              <p className="text-sm font-bold text-ink-soft m-0 mt-1">{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-4">How to contribute</h2>
        <ol className="space-y-4 list-none p-0 m-0">
          {STEPS.map((s) => (
            <li key={s.n} className="panel p-5 flex gap-4 items-start">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral text-white font-black border-[3px] border-ink">
                {s.n}
              </span>
              <div>
                <h3 className="font-black text-lg m-0 mb-1">{s.title}</h3>
                <p className="font-bold text-ink-soft m-0 text-sm">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-2">Where to edit</h2>
        <p className="font-bold text-ink-soft mb-4 text-sm">
          Most contributions are data, not deep framework work.
        </p>
        <div className="space-y-3">
          {WHERE.map((w) => (
            <div key={w.file} className="panel p-4">
              <code className="font-mono text-sm font-bold text-coral">{w.file}</code>
              <p className="font-bold text-ink-soft m-0 mt-2 text-sm">{w.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-2">First PR ideas</h2>
        <p className="font-bold text-ink-soft mb-4">
          Stuck on what to do? Pick one and ship it this week.
        </p>
        <ul className="space-y-2 p-0 m-0 list-none">
          {IDEAS.map((idea) => (
            <li key={idea} className="flex gap-2 font-bold panel p-3">
              <span className="text-teal font-black shrink-0">✓</span>
              <span className="text-sm">{idea}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-black mb-2">House rules</h2>
        <ul className="space-y-2 p-0 m-0 list-none">
          {RULES.map((r) => (
            <li key={r} className="font-bold text-ink-soft text-sm flex gap-2">
              <span className="text-coral">→</span>
              {r}
            </li>
          ))}
        </ul>
      </section>

      <section className="panel p-6 bg-[#FFF1E6] text-center mb-8">
        <h2 className="text-xl font-black mb-2">Ready to open your first PR?</h2>
        <p className="font-bold text-ink-soft mb-5">
          Clone the project, run{" "}
          <code className="font-mono text-sm bg-white px-1.5 py-0.5 rounded border-2 border-ink">
            npm run dev
          </code>
          , and start with one card or one bug scenario.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="btn-arcade btn-coral"
          >
            Open GitHub
          </a>
          <Link href="/play" className="btn-arcade btn-ghost">
            Warm up with a game
          </Link>
        </div>
        <p className="text-xs font-bold text-ink-soft mt-4 mb-0">
          Point the GitHub button at your real repo URL when you publish.
        </p>
      </section>
    </main>
  );
}
