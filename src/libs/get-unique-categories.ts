import type { ProductoType } from "@/types/producto";

export type CategoryOption = {
  id: number;
  name: string;
};

/**
 * Deriva la lista de categorías únicas presentes en el dataset (dedupe por
 * `category_id`), ordenadas alfabéticamente por nombre para el selector de
 * filtro. El dataset no trae subcategorías, solo categoría.
 */
export function getUniqueCategories(products: ProductoType[]): CategoryOption[] {
  const seen = new Map<number, string>();

  for (const product of products) {
    if (!seen.has(product.category_id)) {
      seen.set(product.category_id, product.category_name);
    }
  }

  return Array.from(seen, ([id, name]) => ({ id, name })).sort((a, b) =>
    a.name.localeCompare(b.name, "es")
  );
}
