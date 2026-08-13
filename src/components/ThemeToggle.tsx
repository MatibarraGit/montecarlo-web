"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/libs/utils";
import { getServerTheme, getTheme, setTheme, subscribeToTheme } from "@/libs/theme";

type ThemeToggleProps = {
  variant?: "icon" | "menu";
  className?: string;
};

/** Botón que alterna entre modo claro y oscuro y persiste la elección. */
export function ThemeToggle({ variant = "icon", className }: ThemeToggleProps) {
  // El tema real lo fija el script inline del layout antes del primer pintado, así
  // que el server no puede conocerlo: renderiza "light" y React lo corrige al
  // hidratar (el atributo del <html> ya es el correcto, no hay flash).
  const theme = useSyncExternalStore(subscribeToTheme, getTheme, getServerTheme);

  const isDark = theme === "dark";
  const label = isDark ? "Activar modo claro" : "Activar modo oscuro";
  const handleToggle = () => setTheme(isDark ? "light" : "dark");

  const icon = isDark ? (
    <Sun className="size-5 shrink-0" aria-hidden />
  ) : (
    <Moon className="size-5 shrink-0" aria-hidden />
  );

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={handleToggle}
        aria-label={label}
        className={cn(
          "border-border hover:text-secondary flex w-full items-center justify-between gap-2 border-b py-3 text-left text-base font-semibold transition-colors",
          className
        )}
      >
        {isDark ? "Modo claro" : "Modo oscuro"}
        {icon}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={label}
      title={label}
      className={cn(
        "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/12 focus-visible:ring-primary-foreground/60 inline-flex size-10 shrink-0 items-center justify-center rounded-full border bg-transparent transition-colors focus-visible:ring-2 focus-visible:outline-none",
        className
      )}
    >
      {icon}
    </button>
  );
}
