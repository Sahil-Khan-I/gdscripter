/**
 * Sprite Lab levels — player writes a tiny GDScript-like snippet.
 * Supported lines (inside the editable region conceptually):
 *   velocity = Vector2(x, y)
 *   velocity.x = n
 *   velocity.y = n
 *   position = Vector2(x, y)
 *   position.x = n
 *   position.y = n
 *   position += Vector2(x, y) * delta   (or without * delta)
 *   position.x += n * delta
 */

export const LAB_LEVELS = [
  {
    id: 1,
    title: "Baby steps",
    goal: "Make the sprite move right. Set velocity.x to something positive (try 120).",
    teach: "velocity is a Vector2. velocity.x > 0 moves right every physics tick.",
    starter: `# Goal: walk right
velocity.x = 0
velocity.y = 0`,
    hints: [
      "velocity.x is the horizontal speed in pixels per second.",
      "Try: velocity.x = 120",
      "Leave velocity.y = 0 so it doesn't drift down.",
    ],
    win: { type: "x_gte", value: 220, frames: 90 },
    roastWin: "It moved. Einstein rests easy.",
    roastFail: "Still parked. Did you set velocity.x or just stare at it?",
  },
  {
    id: 2,
    title: "Respect delta",
    goal: "Move right using position += Vector2(...) * delta (frame-independent).",
    teach: "Multiplying by delta keeps the same speed at 30 or 144 FPS.",
    starter: `# Move with delta — don't set velocity for this one
# position += Vector2(SPEED, 0) * delta
`,
    hints: [
      "Write: position += Vector2(160, 0) * delta",
      "delta is already provided by the lab each frame.",
      "If you omit * delta, motion depends on framerate (messy).",
    ],
    win: { type: "x_gte", value: 200, frames: 100 },
    roastWin: "Look at you — frame-rate independent. Fancy.",
    roastFail: "Either no motion or you forgot * delta. Both tragic.",
  },
  {
    id: 3,
    title: "Diagonal swagger",
    goal: "Reach the bottom-right using a Vector2 with both x and y.",
    teach: "Vector2(x, y) — x right, y down in Godot 2D.",
    starter: `velocity = Vector2(0, 0)`,
    hints: [
      "Try velocity = Vector2(100, 80)",
      "Both components should be positive to go down-right.",
      "Win needs x>=180 and y>=140.",
    ],
    win: { type: "xy_gte", x: 180, y: 140, frames: 120 },
    roastWin: "Diagonal! You've discovered the second dimension. Mostly.",
    roastFail: "One axis isn't enough. This isn't a 1D idle game.",
  },
  {
    id: 4,
    title: "Hit the target",
    goal: "Stop inside the gold target zone (roughly x 250–310, y 40–100).",
    teach: "Combine velocity toward a point, or set position carefully then zero velocity.",
    starter: `velocity = Vector2(140, -20)`,
    hints: [
      "Start near top-left; aim velocity so you coast into the gold box.",
      "Too fast? Lower the numbers. Overshoot is a lifestyle.",
      "You can set position = Vector2(270, 70) then velocity = Vector2.ZERO — cheeky but valid.",
    ],
    win: { type: "in_box", x0: 250, y0: 40, x1: 310, y1: 100, frames: 150, settle: true },
    roastWin: "Bullseye. The gold square accepts your apology.",
    roastFail: "Not in the zone. Close only counts in horseshoes and bad PRs.",
  },
  {
    id: 5,
    title: "Normalized direction",
    goal: "Move toward Vector2(300, 160) using a direction * speed pattern.",
    teach: "dir = (target - position).normalized() then velocity = dir * speed.",
    starter: `var target = Vector2(300, 160)
var speed = 160.0
# tip: velocity = (target - position).normalized() * speed
velocity = Vector2.ZERO`,
    hints: [
      "Each frame: velocity = (target - position).normalized() * speed",
      "normalized() keeps direction but length 1 — then multiply speed.",
      "If you're already on the target, length 0 — lab treats that as success too.",
    ],
    win: { type: "near", x: 300, y: 160, dist: 28, frames: 160 },
    roastWin: "You chased a point in space. That's literally most of gamedev.",
    roastFail: "Target's still lonely. Normalize your life—and your vector.",
  },
  {
    id: 6,
    title: "Boss: orbit-ish",
    goal: "Keep the sprite in the center band (x 120–280) for the whole run while moving.",
    teach: "Clamp or reverse velocity when you near edges — poor man's AI.",
    starter: `velocity = Vector2(150, 40)
# When near edges, flip velocity.x
# if position.x > 280: velocity.x = -abs(velocity.x)
# if position.x < 120: velocity.x = abs(velocity.x)`,
    hints: [
      "Start with a rightward velocity, then flip at edges.",
      "Use if position.x > 280: velocity.x = -150",
      "And if position.x < 120: velocity.x = 150",
    ],
    win: { type: "stay_band", x0: 100, x1: 300, minTravel: 80, frames: 180 },
    roastWin: "You built a bouncing idiot. Industry standard.",
    roastFail: "Left the band or didn't travel enough. Commitment issues.",
  },
];
