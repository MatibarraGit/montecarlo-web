export type ThemeType = "light" | "dark";

/** Clave de localStorage donde se guarda la elección del usuario. */
export const THEME_STORAGE_KEY = "montecarlo-theme";

/**
 * El tema vive en `<html data-theme>` — los tokens de globals.css se eligen a
 * partir de ese atributo. El DOM es la fuente de la verdad; este módulo es solo
 * el store externo que la UI consume con `useSyncExternalStore`.
 */

const listeners = new Set<() => void>();

/** Cache del snapshot: `useSyncExternalStore` necesita que el valor sea estable. */
let snapshot: ThemeType | null = null;

function readStoredTheme(): ThemeType | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "dark" || stored === "light" ? stored : null;
  } catch {
    // Modo incógnito / storage bloqueado.
    return null;
  }
}

function applyTheme(theme: ThemeType) {
  snapshot = theme;
  document.documentElement.dataset.theme = theme;
  listeners.forEach((listener) => listener());
}

export function getTheme(): ThemeType {
  snapshot ??= document.documentElement.dataset.theme === "dark" ? "dark" : "light";
  return snapshot;
}

/** En el server no hay DOM ni storage: se asume claro y se corrige al hidratar. */
export function getServerTheme(): ThemeType {
  return "light";
}

/** Cambia el tema por elección explícita del usuario (y la persiste). */
export function setTheme(theme: ThemeType) {
  applyTheme(theme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // El tema igual cambia, solo no sobrevive al reload.
  }
}

export function subscribeToTheme(onStoreChange: () => void) {
  listeners.add(onStoreChange);

  // Mientras el usuario no haya elegido, el sitio sigue al sistema en vivo.
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  const handleSystemChange = (event: MediaQueryListEvent) => {
    if (readStoredTheme()) return;
    applyTheme(event.matches ? "dark" : "light");
  };

  query.addEventListener("change", handleSystemChange);

  return () => {
    listeners.delete(onStoreChange);
    query.removeEventListener("change", handleSystemChange);
  };
}

/**
 * Script que corre inline en el `<head>`, antes del primer pintado: lee la
 * preferencia guardada (o la del sistema si no hay ninguna) y setea el atributo.
 * Va inline y sincrónico a propósito — si esperara a la hidratación, la página
 * aparecería un instante en claro antes de pasar a oscuro (flash).
 */
export const THEME_INIT_SCRIPT = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY
)});var t=s==="dark"||s==="light"?s:(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="light";}})();`;
