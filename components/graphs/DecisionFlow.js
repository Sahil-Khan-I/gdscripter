"use client";

/** Decision / flowchart: where should you go next? */
const NODES = {
  start: { x: 320, y: 36, label: "New here?", w: 110 },
  yes: { x: 160, y: 120, label: "Never coded", w: 120 },
  some: { x: 320, y: 120, label: "Know some code", w: 130 },
  godot: { x: 480, y: 120, label: "Know Godot bits", w: 130 },
  cards: { x: 160, y: 220, label: "Basics cards", w: 120, href: "/cards?tag=basics" },
  play: { x: 320, y: 220, label: "Play games", w: 120, href: "/play" },
  lab: { x: 480, y: 220, label: "Sprite Lab", w: 120, href: "/lab" },
};

const LINKS = [
  ["start", "yes"],
  ["start", "some"],
  ["start", "godot"],
  ["yes", "cards"],
  ["some", "play"],
  ["godot", "lab"],
];

function curve(a, b) {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y + 20} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - 20}`;
}

export default function DecisionFlow() {
  return (
    <div className="graph-panel">
      <div className="graph-legend">
        <span className="graph-pill decision">Decision flow</span>
        <span className="text-xs font-bold text-ink-soft">Pick a lane — no wrong answers</span>
      </div>
      <div className="graph-scroll">
        <svg
          viewBox="0 0 640 270"
          className="graph-svg"
          role="img"
          aria-label="Decision flowchart for where to start"
        >
          <defs>
            <marker
              id="decArrow"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L5,3 L0,6 Z" fill="var(--gold)" />
            </marker>
          </defs>

          {LINKS.map(([f, t], i) => (
            <path
              key={`${f}-${t}`}
              d={curve(NODES[f], NODES[t])}
              className="graph-edge decision"
              style={{ animationDelay: `${i * 0.1}s` }}
              markerEnd="url(#decArrow)"
            />
          ))}

          {Object.entries(NODES).map(([id, n]) => {
            const inner = (
              <g className="graph-node" transform={`translate(${n.x}, ${n.y})`}>
                <rect
                  x={-n.w / 2}
                  y="-20"
                  width={n.w}
                  height="40"
                  rx="20"
                  className={`graph-node-bg ${n.href ? "clickable" : "rootish"}`}
                />
                <text y="5" textAnchor="middle" className="graph-node-title">
                  {n.label}
                </text>
              </g>
            );
            return n.href ? (
              <a key={id} href={n.href} className="graph-node-link">
                {inner}
              </a>
            ) : (
              <g key={id}>{inner}</g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
