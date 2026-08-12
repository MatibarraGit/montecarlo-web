"use client";

import { useMemo, useState } from "react";

import {
  AboutSection,
  CategoryFilter,
  ContactSection,
  HeroCarousel,
  ProductGrid,
  WhatsAppFab,
} from "@/components";
import productosData from "@/data/productos.json";
import { Footer, Header } from "@/layout";
import { ALL_CATEGORIES, filterProducts } from "@/libs/filter-products";
import { getUniqueCategories } from "@/libs/get-unique-categories";
import type { ProductoType } from "@/types/producto";

// Dataset estático — sin fetch, sin API. Todo el filtrado ocurre en el cliente.
const productos: ProductoType[] = productosData;
const categories = getUniqueCategories(productos);

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_CATEGORIES);

  const filteredProducts = useMemo(
    () => filterProducts(productos, { searchTerm, category: selectedCategory }),
    [searchTerm, selectedCategory]
  );

  return (
    <>
      <span id="top" />

      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      <main className="flex-1">
        <HeroCarousel />

        <section id="catalogo" className="content-wrapper mt-16 scroll-mt-32">
          <div className="mb-6">
            <span className="text-secondary text-xs font-bold tracking-widest uppercase">
              Catálogo
            </span>
            <h2 className="mt-2 text-3xl uppercase sm:text-4xl">
              Todo para tu hogar
            </h2>
          </div>

          <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <CategoryFilter
              categories={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              className="lg:flex-1"
            />
            <p className="text-muted-foreground shrink-0 text-sm" aria-live="polite">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </p>
          </div>

          <ProductGrid products={filteredProducts} />
        </section>

        <AboutSection />

        <ContactSection />
      </main>

      <Footer />

      <WhatsAppFab />
    </>
  );
}
