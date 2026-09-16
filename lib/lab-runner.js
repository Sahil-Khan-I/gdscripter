/**
 * Extremely small GDScript-ish interpreter for the Sprite Lab.
 * Not a real parser — enough for teaching velocity/position/vectors.
 */

function num(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : 0;
}

function evalVector2Call(args) {
  const parts = args.split(",").map((p) => p.trim());
  return { x: num(parts[0]), y: num(parts[1] || "0") };
}

/** Resolve a simple RHS: numbers, Vector2(...), Vector2.ZERO/RIGHT/LEFT/UP/DOWN, identifiers we know */
function evalExpr(expr, ctx) {
  let e = expr.trim().replace(/;$/, "");

  // strip outer parens
  while (e.startsWith("(") && e.endsWith(")")) e = e.slice(1, -1).trim();

  if (e === "delta") return ctx.delta;
  if (e === "speed") return ctx.speed ?? 160;
  if (e === "Vector2.ZERO") return { x: 0, y: 0 };
  if (e === "Vector2.RIGHT") return { x: 1, y: 0 };
  if (e === "Vector2.LEFT") return { x: -1, y: 0 };
  if (e === "Vector2.UP") return { x: 0, y: -1 };
  if (e === "Vector2.DOWN") return { x: 0, y: 1 };

  const v2 = e.match(/^Vector2\s*\((.*)\)$/s);
  if (v2) return evalVector2Call(v2[1]);

  // (target - position).normalized() * speed
  const norm = e.match(
    /^\(\s*target\s*-\s*position\s*\)\s*\.\s*normalized\s*\(\s*\)\s*\*\s*(.+)$/,
  );
  if (norm) {
    const sp = evalExpr(norm[1], ctx);
    const speed = typeof sp === "number" ? sp : 160;
    const dx = ctx.target.x - ctx.position.x;
    const dy = ctx.target.y - ctx.position.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: (dx / len) * speed, y: (dy / len) * speed };
  }

  // a * b (number or vector * number)
  if (e.includes("*")) {
    const idx = e.lastIndexOf("*");
    const left = evalExpr(e.slice(0, idx), ctx);
    const right = evalExpr(e.slice(idx + 1), ctx);
    if (typeof left === "object" && typeof right === "number") {
      return { x: left.x * right, y: left.y * right };
    }
    if (typeof right === "object" && typeof left === "number") {
      return { x: right.x * left, y: right.y * left };
    }
    if (typeof left === "number" && typeof right === "number") return left * right;
  }

  if (e.includes("+") && !e.startsWith("+")) {
    const idx = e.lastIndexOf("+");
    const left = evalExpr(e.slice(0, idx), ctx);
    const right = evalExpr(e.slice(idx + 1), ctx);
    if (typeof left === "object" && typeof right === "object") {
      return { x: left.x + right.x, y: left.y + right.y };
    }
    if (typeof left === "number" && typeof right === "number") return left + right;
  }

  if (/^-?\d+(\.\d+)?$/.test(e)) return num(e);

  if (e === "position") return { ...ctx.position };
  if (e === "velocity") return { ...ctx.velocity };
  if (e === "target") return { ...ctx.target };
  if (e === "position.x") return ctx.position.x;
  if (e === "position.y") return ctx.position.y;
  if (e === "velocity.x") return ctx.velocity.x;
  if (e === "velocity.y") return ctx.velocity.y;
  if (e === "abs(velocity.x)") return Math.abs(ctx.velocity.x);

  // abs(...)
  const absM = e.match(/^abs\s*\((.+)\)$/);
  if (absM) return Math.abs(Number(evalExpr(absM[1], ctx)) || 0);

  return 0;
}

function applyLine(line, ctx) {
  const raw = line.trim();
  if (!raw || raw.startsWith("#")) return;
  // skip var declarations except we allow var target / var speed
  const varTarget = raw.match(/^var\s+target\s*=\s*(.+)$/);
  if (varTarget) {
    const v = evalExpr(varTarget[1], ctx);
    if (typeof v === "object") ctx.target = { x: v.x, y: v.y };
    return;
  }
  const varSpeed = raw.match(/^var\s+speed\s*=\s*(.+)$/);
  if (varSpeed) {
    ctx.speed = Number(evalExpr(varSpeed[1], ctx)) || 160;
    return;
  }
  if (raw.startsWith("var ")) return;

  // if conditions — very limited
  const ifm = raw.match(/^if\s+(.+):\s*(.*)$/);
  if (ifm) {
    const cond = ifm[1].trim();
    const body = ifm[2].trim();
    let ok = false;
    const gt = cond.match(/^position\.x\s*>\s*(.+)$/);
    const lt = cond.match(/^position\.x\s*<\s*(.+)$/);
    if (gt) ok = ctx.position.x > Number(evalExpr(gt[1], ctx));
    if (lt) ok = ctx.position.x < Number(evalExpr(lt[1], ctx));
    if (ok && body) applyLine(body, ctx);
    return;
  }

  // += 
  const plusEq = raw.match(/^(position|velocity)(\.[xy])?\s*\+=\s*(.+)$/);
  if (plusEq) {
    const base = plusEq[1];
    const comp = plusEq[2];
    const rhs = evalExpr(plusEq[3], ctx);
    if (comp === ".x") {
      ctx[base].x += typeof rhs === "number" ? rhs : rhs.x;
    } else if (comp === ".y") {
      ctx[base].y += typeof rhs === "number" ? rhs : rhs.y;
    } else if (typeof rhs === "object") {
      ctx[base].x += rhs.x;
      ctx[base].y += rhs.y;
    }
    return;
  }

  // =
  const eq = raw.match(/^(position|velocity)(\.[xy])?\s*=\s*(.+)$/);
  if (eq) {
    const base = eq[1];
    const comp = eq[2];
    const rhs = evalExpr(eq[3], ctx);
    if (comp === ".x") {
      ctx[base].x = typeof rhs === "number" ? rhs : rhs.x;
    } else if (comp === ".y") {
      ctx[base].y = typeof rhs === "number" ? rhs : rhs.y;
    } else if (typeof rhs === "object") {
      ctx[base].x = rhs.x;
      ctx[base].y = rhs.y;
    } else if (typeof rhs === "number") {
      ctx[base].x = rhs;
      ctx[base].y = 0;
    }
  }
}

export function runLabSimulation(code, win, opts = {}) {
  const delta = 1 / 60;
  const frames = win.frames || 120;
  const ctx = {
    position: { x: opts.startX ?? 40, y: opts.startY ?? 120 },
    velocity: { x: 0, y: 0 },
    target: { x: 300, y: 160 },
    speed: 160,
    delta,
  };

  const lines = String(code || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // hoist var lines once
  const once = lines.filter((l) => l.startsWith("var "));
  const loop = lines.filter((l) => !l.startsWith("var "));

  for (const l of once) applyLine(l, ctx);

  const path = [{ ...ctx.position }];
  let travel = 0;
  let prev = { ...ctx.position };
  let framesInBox = 0;

  for (let i = 0; i < frames; i++) {
    ctx.delta = delta;
    for (const l of loop) applyLine(l, ctx);
    ctx.position.x += ctx.velocity.x * delta;
    ctx.position.y += ctx.velocity.y * delta;
    // soft bounds
    ctx.position.x = Math.max(-20, Math.min(420, ctx.position.x));
    ctx.position.y = Math.max(-20, Math.min(280, ctx.position.y));
    travel += Math.hypot(ctx.position.x - prev.x, ctx.position.y - prev.y);
    prev = { ...ctx.position };
    path.push({ ...ctx.position });

    if (win.type === "in_box") {
      const inside =
        ctx.position.x >= win.x0 &&
        ctx.position.x <= win.x1 &&
        ctx.position.y >= win.y0 &&
        ctx.position.y <= win.y1;
      if (inside) framesInBox++;
    }
  }

  let passed = false;
  const end = path[path.length - 1];

  switch (win.type) {
    case "x_gte":
      passed = end.x >= win.value;
      break;
    case "xy_gte":
      passed = end.x >= win.x && end.y >= win.y;
      break;
    case "in_box":
      passed = win.settle ? framesInBox >= 20 : framesInBox >= 1;
      break;
    case "near":
      passed = Math.hypot(end.x - win.x, end.y - win.y) <= win.dist;
      break;
    case "stay_band":
      passed =
        path.every((p) => p.x >= win.x0 && p.x <= win.x1) &&
        travel >= (win.minTravel || 50);
      break;
    default:
      passed = false;
  }

  return { passed, path, end, travel };
}
