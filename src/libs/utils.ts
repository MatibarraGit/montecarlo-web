import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge no conoce las sombras propias del tema (`--shadow-*` de
 * globals.css): sin esto las clasifica como *color* de sombra, así que
 * `shadow-elevated` no reemplaza al `shadow-sm` que traen los componentes de
 * ui/ y termina ganando el que aparezca último en el CSS generado.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      shadow: [{ shadow: ["elevated", "header"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
