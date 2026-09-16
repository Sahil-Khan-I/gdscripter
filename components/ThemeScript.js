"use client";

import { useEffect } from "react";
import { applyTheme, getStoredTheme } from "./ThemeToggle";

/** Applies saved theme before paint flash on client. */
export default function ThemeScript() {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);
  return null;
}
