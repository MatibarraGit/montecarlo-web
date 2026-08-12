const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

/** Formatea un precio entero (ej. 61500) como moneda argentina (ej. "$61.500"). */
export function formatPrice(value: number): string {
  return priceFormatter.format(value);
}
