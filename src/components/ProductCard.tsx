/* eslint-disable @next/next/no-img-element */
"use client";

import { memo, useState } from "react";
import { Check, Minus, Plus, ShoppingCart } from "lucide-react";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { cartContext } from "@/contexts/cart-context";
import { formatPrice } from "@/libs/format-price";
import { parseProductImages } from "@/libs/parse-product-images";
import type { ProductoType } from "@/types/producto";

type ProductCardProps = {
  product: ProductoType;
};

/** Valor del `Select` que abre el input de cantidad libre. */
const CUSTOM = "custom";

function ProductCardComponent({ product }: ProductCardProps) {
  const image = parseProductImages(product.images)[0];
  // El dataset actual no trae la columna `stock`: si no viene, se asume disponible.
  const hasStock = product.stock !== 0;

  const [quantity, setQuantity] = useState("1");
  const [customQuantity, setCustomQuantity] = useState("");

  const quantityInCart = cartContext(
    (state) =>
      state.items.find((item) => item.productId === product.product_id)?.quantity ?? 0
  );
  const addToCart = cartContext((state) => state.addToCart);
  const increaseQuantity = cartContext((state) => state.increaseQuantity);
  const decreaseQuantity = cartContext((state) => state.decreaseQuantity);

  const handleAdd = (units: number) => {
    if (!Number.isFinite(units) || units < 1) return;

    addToCart(
      {
        productId: product.product_id,
        name: product.product_name,
        price: product.sell_price,
        image: image ?? "",
      },
      units
    );

    setQuantity("1");
    setCustomQuantity("");
  };

  return (
    // theme-light: la card se ve igual en modo claro y oscuro. Las fotos de
    // producto vienen con fondo blanco fijo, así que toda la card (fondo, texto,
    // bordes y controles) se fuerza a la paleta clara. Ver globals.css.
    <Card className="theme-light shadow-elevated flex h-full flex-col gap-3 overflow-hidden py-0 pb-4 transition-shadow hover:shadow-lg">
      <div className="bg-card relative aspect-square w-full overflow-hidden p-3">
        {image ? (
          <img
            src={image}
            alt={product.product_name}
            loading="lazy"
            className="size-full object-contain"
          />
        ) : (
          <div className="text-muted-foreground flex size-full items-center justify-center text-sm">
            Sin imagen
          </div>
        )}

        {!hasStock && (
          <Badge variant="danger" className="absolute top-2 right-2 font-bold">
            Sin stock
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-1 px-4">
        <p className="text-secondary line-clamp-1 text-xs font-semibold tracking-wide uppercase">
          {product.category_name}
        </p>
        <h3 className="line-clamp-2 text-base leading-snug">
          {product.product_name}
        </h3>
        {product.product_description && (
          <p className="text-muted-foreground line-clamp-2 text-sm">
            {product.product_description}
          </p>
        )}
        <p className="font-heading mt-auto pt-2 text-2xl font-bold">
          {formatPrice(product.sell_price)}
        </p>
      </CardContent>

      <CardFooter className="mt-auto flex-col items-stretch gap-2 px-4">
        {quantityInCart === 0 ? (
          <>
            <div className="flex flex-col gap-2 text-sm lg:flex-row lg:items-center">
              Cantidad:
              <Select value={quantity} onValueChange={setQuantity} disabled={!hasStock}>
                <SelectTrigger className="w-full font-bold lg:w-20" aria-label="Cantidad">
                  <SelectValue />
                </SelectTrigger>
                {/* El contenido va en un portal fuera de la card, así que
                    necesita su propio `theme-light` para no salir oscuro. */}
                <SelectContent className="theme-light">
                  {[1, 2, 3, 4, 5, 6].map((unit) => (
                    <SelectItem key={unit} value={String(unit)}>
                      {unit}
                    </SelectItem>
                  ))}
                  <SelectItem value={CUSTOM}>+6</SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="w-full font-bold lg:flex-1"
                disabled={!hasStock || quantity === CUSTOM}
                onClick={() => handleAdd(Number(quantity))}
              >
                <ShoppingCart aria-hidden />
                {hasStock ? "Agregar" : "Sin stock"}
              </Button>
            </div>

            {quantity === CUSTOM && (
              <div className="flex flex-col gap-2 lg:flex-row">
                <Input
                  type="number"
                  min={7}
                  inputMode="numeric"
                  placeholder="Otra cantidad"
                  value={customQuantity}
                  onChange={(event) => setCustomQuantity(event.target.value)}
                  aria-label="Otra cantidad"
                  className="font-bold"
                />
                <Button
                  variant="secondary"
                  className="font-bold"
                  disabled={!hasStock || Number(customQuantity) < 1}
                  onClick={() => handleAdd(Number(customQuantity))}
                >
                  <Check aria-hidden />
                  Agregar
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="border-border flex items-center justify-between gap-2 rounded-lg border p-1">
            <Button
              size="icon"
              variant="ghost"
              aria-label="Restar cantidad"
              onClick={() => decreaseQuantity(product.product_id)}
            >
              <Minus aria-hidden />
            </Button>
            <span className="text-sm font-bold" aria-live="polite">
              {quantityInCart} en el carrito
            </span>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Sumar cantidad"
              onClick={() => increaseQuantity(product.product_id)}
            >
              <Plus aria-hidden />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

// memo: la card se renderiza en listas de hasta 80 productos, evitamos rerenders innecesarios
export const ProductCard = memo(ProductCardComponent);
