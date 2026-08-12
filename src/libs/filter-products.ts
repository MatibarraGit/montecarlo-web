import type { ProductoType } from "@/types/producto";

/** Valor de `selectedCategory` que representa "sin filtro de categoría". */
export const ALL_CATEGORIES = "todas";

type FilterProductsOptions = {
  searchTerm: string;
  /** `category_id` como string, o ALL_CATEGORIES para no filtrar por categoría. */
  category: string;
};

/** Saca acentos/diacríticos para poder comparar "bateria" con "Batería". */
function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

/**
 * Filtro puro (sin estado, sin hooks) que combina búsqueda por texto
 * (nombre + descripción, sin distinguir mayúsculas/acentos) y categoría,
 * con lógica AND entre ambos criterios.
 */
export function filterProducts(
  products: ProductoType[],
  { searchTerm, category }: FilterProductsOptions
): ProductoType[] {
  const normalizedSearch = normalizeText(searchTerm.trim());

  return products.filter((product) => {
    const matchesCategory =
      category === ALL_CATEGORIES || String(product.category_id) === category;

    if (!matchesCategory) return false;
    if (!normalizedSearch) return true;

    const haystack = normalizeText(
      `${product.product_name} ${product.product_description ?? ""}`
    );

    return haystack.includes(normalizedSearch);
  });
}
