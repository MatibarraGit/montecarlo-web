"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";

import {
  Button,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui";
import { buildWhatsAppUrl } from "@/config/site";
import { cartContext } from "@/contexts/cart-context";
import { formatPrice } from "@/libs/format-price";

/** Botón de carrito (con contador) + panel lateral con el detalle, el total y el envío por WhatsApp. */
export function CartSheet() {
  const items = cartContext((state) => state.items);
  const increaseQuantity = cartContext((state) => state.increaseQuantity);
  const decreaseQuantity = cartContext((state) => state.decreaseQuantity);
  const removeFromCart = cartContext((state) => state.removeFromCart);
  const clearCart = cartContext((state) => state.clearCart);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const whatsappMessage = `¡Hola! Quiero hacer un pedido:\n${items
    .map((item) => `• ${item.quantity} x ${item.name}`)
    .join("\n")}\nTotal: ${formatPrice(total)}`;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label={`Abrir carrito, ${totalItems} ${totalItems === 1 ? "producto" : "productos"}`}
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/12 focus-visible:ring-primary-foreground/60 relative inline-flex h-10 shrink-0 items-center gap-2 rounded-full border bg-transparent px-3 text-sm font-semibold transition-colors cursor-pointer focus-visible:ring-2 focus-visible:outline-none sm:px-4"
        >
          <ShoppingCart className="size-4" aria-hidden />
          <span className="hidden sm:inline">Carrito</span>
          {totalItems > 0 && (
            <span className="bg-secondary text-secondary-foreground absolute -top-1.5 -right-1.5 grid size-5 place-items-center rounded-full text-[0.6875rem] font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-2xl">Tu carrito</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "Todavía no agregaste productos."
              : `${totalItems} ${totalItems === 1 ? "unidad" : "unidades"} en tu pedido.`}
          </SheetDescription>
        </SheetHeader>

        {items.length > 0 && (
          <ul className="flex-1 space-y-3 overflow-y-auto px-4">
            {items.map((item) => (
              <li
                key={item.productId}
                className="border-border bg-card grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border p-2"
              >
                <div className="bg-muted grid size-16 shrink-0 place-items-center overflow-hidden rounded-lg">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="size-full object-contain"
                    />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-bold">{item.name}</p>
                  <p className="text-muted-foreground text-sm">{formatPrice(item.price)}</p>

                  <div className="mt-1 flex items-center gap-1">
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      className="size-7 cursor-pointer"
                      aria-label="Restar cantidad"
                      onClick={() => decreaseQuantity(item.productId)}
                    >
                      <Minus className="size-3.5" aria-hidden />
                    </Button>
                    <span className="w-7 text-center text-sm font-bold" aria-live="polite">
                      {item.quantity}
                    </span>
                    <Button
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      className="size-7 cursor-pointer"
                      aria-label="Sumar cantidad"
                      onClick={() => increaseQuantity(item.productId)}
                    >
                      <Plus className="size-3.5" aria-hidden />
                    </Button>
                  </div>
                </div>

                <Button
                  type="button"
                  size="icon-sm"
                  variant="ghost"
                  className="text-muted-foreground cursor-pointer hover:text-danger"
                  aria-label={`Quitar ${item.name} del carrito`}
                  onClick={() => removeFromCart(item.productId)}
                >
                  <Trash2 className="size-4" aria-hidden />
                </Button>
              </li>
            ))}
          </ul>
        )}

        <Separator />

        <SheetFooter className="gap-3">
          <div className="flex items-center justify-between text-base">
            <span className="text-muted-foreground">Total</span>
            <span className="font-heading text-2xl font-bold">{formatPrice(total)}</span>
          </div>

          <Button asChild={items.length > 0} disabled={items.length === 0} className="w-full font-bold">
            {items.length > 0 ? (
              <a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                Enviar pedido por WhatsApp
              </a>
            ) : (
              <span>Enviar pedido por WhatsApp</span>
            )}
          </Button>

          {items.length > 0 && (
            <Button type="button" variant="ghost" onClick={clearCart} className="cursor-pointer">
              Vaciar carrito
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
