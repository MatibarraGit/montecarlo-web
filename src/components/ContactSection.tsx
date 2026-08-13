import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@/components/ui";
import { BRANCHES, buildWhatsAppUrl, CONTACT_EMAIL, CONTACT_HOURS, MAIN_BRANCH } from "@/config/site";
import { cn } from "@/libs/utils";

export function ContactSection() {
  return (
    <section id="contacto" className="content-wrapper mt-16 scroll-mt-32">
      <div className="max-w-2xl">
        <span className="text-secondary text-xs font-bold tracking-widest uppercase">
          Contacto
        </span>
        <h2 className="mt-2 text-3xl uppercase sm:text-4xl">Estamos para ayudarte</h2>
        <p className="text-muted-foreground mt-4">
          Tenemos tres sucursales para atenderte. Escribinos por WhatsApp a la que te quede más
          cerca y coordinamos precios, stock y entrega.
        </p>
      </div>

      {/* Datos comunes a las tres sucursales */}
      <div className="bg-primary text-primary-foreground mt-8 grid gap-6 rounded-2xl p-6 sm:grid-cols-2 sm:p-8">
        {/* `min-w-0` en el item del grid: el `truncate` del email no alcanza si
            la celda no puede achicarse por debajo de su min-content. */}
        <div className="flex min-w-0 items-start gap-3">
          <Mail className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="min-w-0">
            <p className="font-bold">Email</p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-primary-foreground/80 hover:text-primary-foreground block truncate text-sm transition-colors"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-primary-foreground/60 mt-1 text-xs">
              Mismo email para las tres sucursales.
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <Clock className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="min-w-0">
            <p className="font-bold">Horarios</p>
            <ul className="text-primary-foreground/80 text-sm">
              {CONTACT_HOURS.map((entry) => (
                <li key={entry.days}>
                  {entry.days}: {entry.hours}
                </li>
              ))}
            </ul>
            <p className="text-primary-foreground/60 mt-1 text-xs">
              Mismos horarios para las tres sucursales.
            </p>
          </div>
        </div>
      </div>

      {/* Una tarjeta por sucursal: imagen, dirección y teléfono propios */}
      <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {BRANCHES.map((branch) => (
          <li
            key={branch.id}
            className={cn(
              "border-border bg-card shadow-elevated flex flex-col overflow-hidden rounded-2xl border",
              branch.id === MAIN_BRANCH.id ? "md:row-start-2 md:col-span-2 lg:row-start-auto lg:col-span-1" : "md:row-start-1 lg:row-start-auto"
            )}
          >
            <div className="relative">
              <Image
                src={branch.image}
                alt={branch.imageAlt}
                width={1200}
                height={900}
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                className="aspect-4/3 w-full object-cover"
              />
              <span className="bg-secondary text-secondary-foreground absolute top-3 left-3 rounded-md px-2 py-0.5 text-xs font-bold tracking-widest uppercase">
                Kilómetro {branch.id}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-5">
              <h3 className="text-xl uppercase">{branch.name}</h3>

              <ul className="grid gap-3">
                <li className="flex items-start gap-3">
                  <MapPin className="text-secondary mt-0.5 size-5 shrink-0" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Dirección</p>
                    <a
                      href={branch.addressHref}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {branch.address}
                    </a>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="text-secondary mt-0.5 size-5 shrink-0" aria-hidden />
                  <div className="min-w-0">
                    <p className="text-sm font-bold">Teléfono</p>
                    <a
                      href={`tel:${branch.whatsappPhone}`}
                      className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                    >
                      {branch.phoneDisplay}
                    </a>
                  </div>
                </li>
              </ul>

              <Button asChild className="mt-auto w-full font-bold">
                <a
                  href={buildWhatsAppUrl(
                    `¡Hola! Estoy viendo el catálogo online y quería hacer una consulta sobre la ${branch.name}.`,
                    branch.whatsappPhone
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image
                    src="/icons/whatsapp-white.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-5"
                    aria-hidden
                  />
                  Escribir por WhatsApp
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
