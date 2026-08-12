import { PackageSearch } from "lucide-react";

import { ProductCard } from "@/components/ProductCard";
import type { ProductoType } from "@/types/producto";

type ProductGridProps = {
  products: ProductoType[];
};

type CategorySection = {
  id: number;
  name: string;
  products: ProductoType[];
};

/** Agrupa la lista ya filtrada por categoría, en orden alfabético (locale es-AR). */
function groupByCategory(products: ProductoType[]): CategorySection[] {
  const sections = new Map<number, CategorySection>();

  for (const product of products) {
    const section = sections.get(product.category_id);

    if (section) {
      section.products.push(product);
    } else {
      sections.set(product.category_id, {
        id: product.category_id,
        name: product.category_name,
        products: [product],
      });
    }
  }

  return [...sections.values()].sort((a, b) => a.name.localeCompare(b.name, "es-AR"));
}

/** Recibe la lista ya filtrada (ver `filterProducts`) y solo se encarga de renderizarla. */
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-20 text-center">
        <PackageSearch aria-hidden className="text-muted-foreground size-10" />
        <p className="font-subheading text-xl">No se encontraron productos</p>
        <p className="text-muted-foreground text-sm">
          Probá con otra búsqueda o cambiá el filtro de categoría.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {groupByCategory(products).map((section) => (
        <section key={section.id} aria-labelledby={`categoria-${section.id}`}>
          <div className="mb-4 flex items-end gap-3">
            <h3
              id={`categoria-${section.id}`}
              className="text-2xl tracking-wide uppercase sm:text-3xl"
            >
              {section.name}
            </h3>
            <span className="text-muted-foreground mb-1 shrink-0 text-sm">
              {section.products.length}{" "}
              {section.products.length === 1 ? "producto" : "productos"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {section.products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
