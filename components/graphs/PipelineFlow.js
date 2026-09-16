"use client";

const STAGES = [
  { id: "syntax", label: "Syntax", sub: "int · float · String", href: "/learn#syntax", x: 70, y: 48 },
  { id: "control", label: "Control", sub: "if · match · for", href: "/learn#control", x: 200, y: 48 },
  { id: "funcs", label: "Functions", sub: "_ready · delta", href: "/learn#functions", x: 330, y: 48 },
  { id: "vectors", label: "Vectors", sub: "Vector2 · Lab", href: "/lab", x: 460, y: 48 },
  { id: "nodes", label: "Nodes", sub: "scenes · $", href: "/learn#nodes", x: 200, y: 150 },
  { id: "signals", label: "Signals", sub: "emit · await", href: "/learn#signals", x: 330, y: 150 },
  { id: "g2d", label: "2D games", sub: "platformer", href: "/build", x: 460, y: 150 },
  { id: "g3d", label: "3D games", sub: "Node3D", href: "/learn#gamedev3d", x: 590, y: 150 },
];

/** Curved pipeline: top row then drop into second row */
const EDGES = [
  ["syntax", "control"],
  ["control", "funcs"],
  ["funcs", "vectors"],
  ["vectors", "nodes"],
  ["nodes", "signals"],
  ["signals", "g2d"],
  ["g2d", "g3d"],
];

function edgePath(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (Math.abs(dy) < 8) {
    const mid = a.x + dx / 2;
    return `M ${a.x + 52} ${a.y} C ${mid} ${a.y}, ${mid} ${b.y}, ${b.x - 52} ${b.y}`;
  }
  // L-shaped curve down/across
  const mx = a.x;
  const my = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y + 28} C ${mx} ${my}, ${b.x} ${my}, ${b.x} ${b.y - 28}`;
}

export default function PipelineFlow() {
  const byId = Object.fromEntries(STAGES.map((s) => [s.id, s]));

  return (
    <div className="graph-panel">
      <div className="graph-legend">
        <span className="graph-pill">Main pipeline</span>
        <span className="text-xs font-bold text-ink-soft">Syntax → movement → scenes → ships</span>
      </div>
      <div className="graph-scroll">
        <svg
          viewBox="0 0 660 210"
          className="graph-svg"
          role="img"
          aria-label="Learning pipeline flowchart from syntax to 3D"
        >
          <defs>
            <marker
              id="arrowHead"
              markerWidth="8"
              markerHeight="8"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="var(--coral)" />
            </marker>
            <linearGradient id="flowStroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--coral)" />
              <stop offset="50%" stopColor="var(--teal)" />
              <stop offset="100%" stopColor="var(--gold)" />
            </linearGradient>
          </defs>

          {EDGES.map(([from, to], i) => (
            <path
              key={`${from}-${to}`}
              d={edgePath(byId[from], byId[to])}
              className="graph-edge"
              style={{ animationDelay: `${i * 0.15}s` }}
              markerEnd="url(#arrowHead)"
            />
          ))}

          {STAGES.map((s) => (
            <a key={s.id} href={s.href} className="graph-node-link">
              <g className="graph-node" transform={`translate(${s.x}, ${s.y})`}>
                <rect
                  x="-52"
                  y="-26"
                  width="104"
                  height="52"
                  rx="14"
                  className="graph-node-bg"
                />
                <text y="-4" textAnchor="middle" className="graph-node-title">
                  {s.label}
                </text>
                <text y="14" textAnchor="middle" className="graph-node-sub">
                  {s.sub}
                </text>
              </g>
            </a>
          ))}
        </svg>
      </div>
    </div>
  );
}
