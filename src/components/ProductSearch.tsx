"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/libs/utils";

type ProductSearchProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * Input de búsqueda controlado — el filtrado real vive en `filterProducts` (src/libs).
 * Va siempre sobre el header azul, por eso usa los tokens `primary-foreground`
 * en vez del `Input` genérico de ui/.
 */
export function ProductSearch({ value, onChange, className }: ProductSearchProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        aria-hidden
        className="text-primary-foreground/60 pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar productos, categorías…"
        aria-label="Buscar productos"
        className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-primary-foreground/50 focus:bg-primary-foreground/15 h-10 w-full rounded-full border pr-9 pl-9 text-sm focus:outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="text-primary-foreground/70 hover:text-primary-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
        >
          <X className="size-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
