const KEY = "gdscripter-progress-v1";

const DEFAULT = {
  xp: 0,
  streak: 0,
  lastPlayDate: null,
  knownCards: [],
  learningCards: [],
  startPath: null,
  tutorialsCompleted: [],
  labCleared: [],
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getProgress() {
  if (typeof window === "undefined") return { ...DEFAULT };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT };
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT };
  }
}

export function saveProgress(next) {
  if (typeof window === "undefined") return next;
  localStorage.setItem(KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("gdscripter-progress", { detail: next }));
  return next;
}

export function addXp(amount) {
  const p = getProgress();
  const today = todayKey();
  let streak = p.streak;

  if (p.lastPlayDate === today) {
    // same day
  } else if (p.lastPlayDate === yesterdayKey()) {
    streak = (p.streak || 0) + 1;
  } else {
    streak = 1;
  }

  const next = {
    ...p,
    xp: (p.xp || 0) + amount,
    streak,
    lastPlayDate: today,
  };
  return saveProgress(next);
}

export function markCardKnown(id) {
  const p = getProgress();
  const known = new Set(p.knownCards || []);
  const learning = new Set(p.learningCards || []);
  known.add(id);
  learning.delete(id);
  return saveProgress({
    ...p,
    knownCards: [...known],
    learningCards: [...learning],
  });
}

export function markCardLearning(id) {
  const p = getProgress();
  const known = new Set(p.knownCards || []);
  const learning = new Set(p.learningCards || []);
  learning.add(id);
  known.delete(id);
  return saveProgress({
    ...p,
    knownCards: [...known],
    learningCards: [...learning],
  });
}

export function setStartPath(id) {
  const p = getProgress();
  return saveProgress({ ...p, startPath: id });
}

export function completeTutorial(id) {
  const p = getProgress();
  const done = new Set(p.tutorialsCompleted || []);
  const already = done.has(id);
  done.add(id);
  const next = {
    ...p,
    tutorialsCompleted: [...done],
  };
  if (!already) {
    next.xp = (p.xp || 0) + 50;
  }
  return saveProgress(next);
}

export function levelFromXp(xp) {
  return Math.floor(xp / 100) + 1;
}

export function xpIntoLevel(xp) {
  return xp % 100;
}

export function xpToNextLevel(xp) {
  return 100 - (xp % 100);
}

/** Build tutorials unlock after completing Level 1 (reach Level 2). */
export function canAccessBuilds(xp = getProgress().xp) {
  return levelFromXp(xp) >= 2;
}
