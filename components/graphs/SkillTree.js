"use client";

/**
 * Skill tree: Foundations root → three branches → leaf practice nodes
 */
const TREE = {
  id: "root",
  label: "GDScript",
  href: "/learn#syntax",
  kids: [
    {
      id: "lang",
      label: "Language",
      href: "/learn#syntax",
      kids: [
        { id: "types", label: "Types", href: "/cards?tag=basics" },
        { id: "flow", label: "if / loops", href: "/cards?tag=control" },
        { id: "fn", label: "Functions", href: "/cards?tag=functions" },
      ],
    },
    {
      id: "godot",
      label: "Godot core",
      href: "/learn#nodes",
      kids: [
        { id: "nodes", label: "Nodes", href: "/cards?tag=godot" },
        { id: "sig", label: "Signals", href: "/cards?tag=signals" },
        { id: "lab", label: "Sprite Lab", href: "/lab" },
      ],
    },
    {
      id: "ship",
      label: "Ship games",
      href: "/build",
      kids: [
        { id: "plat", label: "Platformer", href: "/build/platformer" },
        { id: "pong", label: "Pong vs AI", href: "/build/pong" },
        { id: "three", label: "3D move", href: "/learn#gamedev3d" },
      ],
    },
  ],
};

// Layout constants
const W = 700;
const H = 320;
const LEVEL_Y = [40, 130, 240];
const ROOT_X = W / 2;

function layoutTree(root) {
  const nodes = [];
  const edges = [];

  nodes.push({ ...root, x: ROOT_X, y: LEVEL_Y[0], depth: 0 });

  const branchCount = root.kids.length;
  const branchGap = 210;
  const branchStart = ROOT_X - ((branchCount - 1) * branchGap) / 2;

  root.kids.forEach((branch, bi) => {
    const bx = branchStart + bi * branchGap;
    nodes.push({ ...branch, x: bx, y: LEVEL_Y[1], depth: 1 });
    edges.push({ from: root.id, to: branch.id });

    const leafCount = branch.kids.length;
    const leafGap = 72;
    const leafStart = bx - ((leafCount - 1) * leafGap) / 2;
    branch.kids.forEach((leaf, li) => {
      const lx = leafStart + li * leafGap;
      nodes.push({ ...leaf, x: lx, y: LEVEL_Y[2], depth: 2 });
      edges.push({ from: branch.id, to: leaf.id });
    });
  });

  return { nodes, edges };
}

function connector(a, b) {
  const midY = (a.y + b.y) / 2;
  return `M ${a.x} ${a.y + 18} C ${a.x} ${midY}, ${b.x} ${midY}, ${b.x} ${b.y - 18}`;
}

export default function SkillTree() {
  const { nodes, edges } = layoutTree(TREE);
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="graph-panel">
      <div className="graph-legend">
        <span className="graph-pill alt">Skill tree</span>
        <span className="text-xs font-bold text-ink-soft">
          Branches into practice — click any leaf
        </span>
      </div>
      <div className="graph-scroll">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="graph-svg"
          role="img"
          aria-label="GDScript skill tree"
        >
          <defs>
            <marker
              id="treeArrow"
              markerWidth="7"
              markerHeight="7"
              refX="5"
              refY="3"
              orient="auto"
            >
              <path d="M0,0 L5,3 L0,6 Z" fill="var(--teal)" />
            </marker>
          </defs>

          {edges.map((e, i) => (
            <path
              key={`${e.from}-${e.to}`}
              d={connector(byId[e.from], byId[e.to])}
              className="graph-edge tree"
              style={{ animationDelay: `${i * 0.08}s` }}
              markerEnd="url(#treeArrow)"
            />
          ))}

          {nodes.map((n) => {
            const w = n.depth === 0 ? 120 : n.depth === 1 ? 108 : 78;
            const h = n.depth === 2 ? 40 : 44;
            return (
              <a key={n.id} href={n.href} className="graph-node-link">
                <g
                  className={`graph-node depth-${n.depth}`}
                  transform={`translate(${n.x}, ${n.y})`}
                >
                  <rect
                    x={-w / 2}
                    y={-h / 2}
                    width={w}
                    height={h}
                    rx="12"
                    className="graph-node-bg"
                  />
                  <text y="5" textAnchor="middle" className="graph-node-title">
                    {n.label}
                  </text>
                </g>
              </a>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
