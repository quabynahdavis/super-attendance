export type ThemeChoice = "light" | "dark" | "system"

const STORAGE_KEY = "theme"

export function resolveDark(choice: ThemeChoice): boolean {
  if (choice === "dark") return true
  if (choice === "light") return false
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function applyTheme(choice: ThemeChoice) {
  const dark = resolveDark(choice)
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

export function readThemeChoice(): ThemeChoice {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === "light" || stored === "dark" || stored === "system") return stored
  return "system"
}

export function writeThemeChoice(choice: ThemeChoice) {
  localStorage.setItem(STORAGE_KEY, choice)
  applyTheme(choice)
}
