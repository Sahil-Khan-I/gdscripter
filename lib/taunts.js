/** Competitive / sarcastic one-liners — keep it playful, not mean-for-real. */

export const TAUNTS_CORRECT = [
  "Correct. The tutorial gods weep tears of joy.",
  "Look at you — actually reading the code. Dangerous habit.",
  "Nice. Even your future self is slightly less embarrassed.",
  "Boom. That's how you silence the impostor syndrome for 8 seconds.",
  "Yes. Clipboard-ready knowledge. Try not to waste it.",
  "Clean hit. The compiler would high-five you if it had hands.",
  "Not bad. For a human.",
  "Correct — and you didn't even ask Stack Overflow first. Growth.",
];

export const TAUNTS_WRONG = [
  "Nope. That line is innocent. You attacked a civilian.",
  "Wrong. Bold of you to guess with that much confidence.",
  "Oof. The bug just filed a restraining order.",
  "That's not it. But thanks for the free entertainment.",
  "Incorrect. Somewhere a rubber duck is disappointed.",
  "Miss. Try again before the XP bar starts laughing.",
  "Close… said every wrong answer ever.",
  "That guess had main-character energy. Still wrong though.",
];

export const TAUNTS_STREAK = [
  "Streak incoming. Don't choke now — that's the fun part.",
  "Okay show-off, keep going.",
  "Multiplier active. The leaderboard that doesn't exist is impressed.",
  "You're cooking. Try not to burn the kitchen.",
];

export const TAUNTS_LOCKED = [
  "Patience, speedrunner. Hit Level 2 first — XP doesn't farm itself.",
  "Locked. Come back when your level bar isn't still in tutorial hell.",
  "Cute. Build mode wants Level 2+. Go squash bugs like you mean it.",
];

export const TAUNTS_IDLE = [
  "Still here? Either learning… or stalling. Both valid.",
  "The cards aren't going to flip themselves. Unless you're a wizard.",
  "Pro tip: clicking things awards XP. Staring awards vibes only.",
];

export function pickTaunt(list) {
  return list[Math.floor(Math.random() * list.length)];
}
