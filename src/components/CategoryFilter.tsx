"use client";

import { ALL_CATEGORIES } from "@/libs/filter-products";
import type { CategoryOption } from "@/libs/get-unique-categories";
import { cn } from "@/libs/utils";

type CategoryFilterProps = {
  categories: CategoryOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

/**
 * Chips de categoría (`category_id` como string) en una tira horizontal
 * scrolleable — el dataset trae ~25 categorías con nombres largos, así que
 * envolverlas en varias filas ocuparía media pantalla.
 */
export function CategoryFilter({
  categories,
  value,
  onChange,
  className,
}: CategoryFilterProps) {
  const options = [
    { id: ALL_CATEGORIES, name: "Todas las categorías" },
    ...categories.map((category) => ({ id: String(category.id), name: category.name })),
  ];

  return (
    <div className={cn("relative min-w-0", className)}>
      <div
        role="group"
        aria-label="Filtrar por categoría"
        className="hide-scrollbar flex snap-x gap-2 overflow-x-auto pr-10 pb-1"
      >
        {options.map((option) => {
          const isActive = option.id === value;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 snap-start rounded-full border px-3.5 py-1.5 text-sm font-semibold whitespace-nowrap transition-colors",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
              )}
            >
              {option.name}
            </button>
          );
        })}
      </div>

      {/* Difuminado a la derecha: pista visual de que la tira sigue */}
      <div
        aria-hidden
        className="from-background pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l to-transparent"
      />
    </div>
  );
}
