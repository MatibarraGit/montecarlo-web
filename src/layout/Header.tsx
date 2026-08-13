"use client";

import Image from "next/image";
import { useState } from "react";
import { Menu } from "lucide-react";

import { CartSheet } from "@/components/cart/CartSheet";
import { ProductSearch } from "@/components/ProductSearch";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui";
import { NAV_LINKS, SITE_NAME } from "@/config/site";

type HeaderProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

/** Header sticky sobre `--color-primary`: logo, buscador, navegación y carrito. */
export function Header({ searchTerm, onSearchChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-primary text-primary-foreground shadow-header sticky top-0 z-40">
      <div className="content-wrapper flex items-center gap-3 py-3 lg:gap-6">
        <a href="#top" className="flex min-w-0 shrink-0 w-fit items-center gap-2">
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={40}
            height={40}
            priority
            className="bg-primary-foreground/95 size-10 shrink-0 rounded-full p-0.5"
          />
        </a>

        {/* Buscador desktop: ocupa el espacio libre entre el logo y los links */}
        <div className="min-w-0 flex-1 lg:px-6">
          <ProductSearch value={searchTerm} onChange={onSearchChange} />
        </div>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/85 hover:bg-primary-foreground/12 hover:text-primary-foreground rounded-full px-3 py-2 text-sm font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          {/* En mobile el toggle vive dentro del menú hamburguesa (abajo) */}
          <ThemeToggle className="hidden lg:inline-flex" />

          <CartSheet />

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menú"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/12 size-10 items-center justify-center rounded-full border transition-colors hidden xs:inline-flex lg:hidden cursor-pointer"
              >
                <Menu className="size-5" aria-hidden />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">Menú</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col px-4" aria-label="Navegación principal">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-border hover:text-secondary border-b py-3 text-left text-base font-semibold transition-colors"
                  >
                    {link.label}
                  </a>
                ))}

                <ThemeToggle variant="menu" />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Links de navegación: debajo de la fila principal, 92% del ancho */}
      <div className="pb-3 xs:hidden">
        <nav className="flex justify-evenly mt-2 py-1 px-4" aria-label="Navegación principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="hover:text-secondary text-left text-base font-semibold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
