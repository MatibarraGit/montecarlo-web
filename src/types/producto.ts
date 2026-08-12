/**
 * Shape real de cada fila de `src/data/productos.json`.
 *
 * OJO: difiere del shape descrito en `docs/MVP.md` (sección 3.1) — ese
 * documento define `subcategory_id` / `subcategory_name` / `stock`, pero el
 * dataset entregado no trae subcategorías (solo `category_id` +
 * `category_name`) y no incluye ningún campo de stock. `stock` queda
 * opcional acá para que la lógica de "sin stock" (badge, deshabilitar
 * "Agregar") funcione de una si el cliente en el futuro suma esa columna,
 * sin romper nada con el dataset actual (donde todos los productos se
 * tratan como disponibles).
 */
export type ProductoType = {
  product_id: number;
  product_name: string;
  sell_price: number; // unidades enteras (ej. 61500), sin decimales
  stock?: number; // 0 = sin stock. Ausente en el dataset actual → se asume disponible
  product_description: string | null; // puede venir vacío ("") o directamente null (~17 productos)
  category_id: number;
  category_name: string;
  images: string; // string formato Postgres array: "{url1,url2}", ver parseProductImages
};
