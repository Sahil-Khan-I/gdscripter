"use client";

/**
 * Godot-style scene tree graph — shows how nodes nest.
 */
const SCENE = {
  id: "main",
  label: "Main (Node2D)",
  kids: [
    {
      id: "player",
      label: "Player (CharacterBody2D)",
      kids: [
        { id: "sprite", label: "Sprite2D", kids: [] },
        { id: "col", label: "CollisionShape2D", kids: [] },
        { id: "cam", label: "Camera2D", kids: [] },
      ],
    },
    {
      id: "world",
      label: "World (Node2D)",
      kids: [
        { id: "floor", label: "Floor (StaticBody2D)", kids: [] },
        { id: "coin", label: "Coin (Area2D)", kids: [] },
      ],
    },
    {
      id: "ui",
      label: "UI (CanvasLayer)",
      kids: [{ id: "hud", label: "HUD (Control)", kids: [] }],
    },
  ],
};

function flatten(node, depth = 0, acc = [], parent = null) {
  const id = node.id;
  acc.push({ ...node, depth, parent });
  node.kids.forEach((k) => flatten(k, depth + 1, acc, id));
  return acc;
}

export default function SceneTreeGraph() {
  const flat = flatten(SCENE);
  const rowH = 46;
  const H = flat.length * rowH + 20;
  const W = 520;

  const positions = {};
  flat.forEach((n, i) => {
    positions[n.id] = {
      x: 36 + n.depth * 42,
      y: 24 + i * rowH,
      depth: n.depth,
      label: n.label,
      parent: n.parent,
    };
  });

  const edges = flat
    .filter((n) => n.parent)
    .map((n) => {
      const a = positions[n.parent];
      const b = positions[n.id];
      // elbow connector
      const midX = a.x + 10;
      return {
        id: `${n.parent}-${n.id}`,
        d: `M ${midX} ${a.y + 14} V ${b.y} H ${b.x - 8}`,
      };
    });

  return (
    <div className="graph-panel">
      <div className="graph-legend">
        <span className="graph-pill scene">Scene tree</span>
        <span className="text-xs font-bold text-ink-soft">
          How Godot nests nodes — parent → children
        </span>
      </div>
      <div className="graph-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="graph-svg scene-tree-svg"
          role="img"
          aria-label="Example Godot scene tree"
        >
          {edges.map((e, i) => (
            <path
              key={e.id}
              d={e.d}
              className="graph-edge scene"
              style={{ animationDelay: `${i * 0.06}s` }}
            />
          ))}

          {flat.map((n) => {
            const p = positions[n.id];
            const w = Math.min(280, 200 + (3 - n.depth) * 24);
            return (
              <g key={n.id} transform={`translate(${p.x}, ${p.y})`}>
                <rect
                  x="0"
                  y="-16"
                  width={w}
                  height="32"
                  rx="10"
                  className={`graph-node-bg scene-depth-${Math.min(n.depth, 3)}`}
                />
                <circle cx="14" cy="0" r="5" className="scene-dot" />
                <text x="28" y="5" className="graph-node-title scene-label">
                  {n.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <p className="graph-caption">
        Scripts usually live on Player / Coin. Children like Sprite2D are grabbed with{" "}
        <code className="inline-code">$Sprite2D</code>.
      </p>
    </div>
  );
}
