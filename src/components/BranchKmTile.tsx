import { cn } from "@/libs/utils";

/**
 * Chapa con el número de kilómetro de la sucursal. Es el dato con el que la
 * gente de la zona identifica cada local ("el del 35"), así que funciona como
 * ancla visual donde haya que elegir entre las tres.
 */
export function BranchKmTile({ id, className }: { id: string; className?: string }) {
  return (
    <span
      className={cn(
        "bg-secondary text-secondary-foreground grid size-9 shrink-0 place-items-center rounded-lg text-base font-bold tabular-nums",
        className
      )}
    >
      {id}
    </span>
  );
}
