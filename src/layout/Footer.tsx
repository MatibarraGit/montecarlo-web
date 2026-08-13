import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import {
  BRANCHES,
  CONTACT_EMAIL,
  NAV_LINKS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SOCIAL_FACEBOOK,
  SOCIAL_INSTAGRAM,
} from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="content-wrapper py-10">
        {/* Fila 1: identidad y el único dato que comparten las tres sucursales */}
        {/* 3 columnas recién en `lg`: a 640px el reparto da ~151px por columna y
            ni el email ni el handle de Instagram entran (son tokens que no se
            parten), así que el grid desbordaba la página. Entre `sm` y `md` la
            identidad ocupa el ancho completo y las dos listas van a la par. */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt={SITE_NAME}
                width={80}
                height={80}
                loading="lazy"
                className="bg-primary-foreground/95 size-15 rounded-full p-0.5"
              />
              <span className="font-heading text-xl font-bold uppercase">
                {SITE_NAME}
              </span>
            </div>
            <p className="text-primary-foreground/75 mt-3 max-w-sm text-sm">
              {SITE_DESCRIPTION}
            </p>

            <a
              className="text-primary-foreground/80 hover:text-primary-foreground mt-4 inline-flex items-start gap-2 py-1 text-sm transition-colors"
              href={`mailto:${CONTACT_EMAIL}`}
            >
              <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
              {/* `wrap-anywhere` (y no `wrap-break-word`) porque solo ese achica
                  el min-content: es lo que deja que la columna se angoste en
                  celulares en vez de estirar el grid. */}
              <span className="min-w-0 wrap-anywhere">{CONTACT_EMAIL}</span>
            </a>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg uppercase">Navegación</h3>
            <ul className="text-primary-foreground/80 mt-3 space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-primary-foreground inline-block py-0.5 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0">
            <h3 className="text-lg uppercase">Seguinos</h3>
            {/* `items-start` deja cada link del ancho de su contenido, como los
                de Navegación, en vez de estirarse a toda la columna. */}
            <div className="mt-3 flex flex-col items-start gap-3">
              <a
                href={SOCIAL_INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground flex items-center gap-2 py-2 text-sm transition-colors"
              >
                <Image
                  src="/icons/instagram.webp"
                  alt="Instagram"
                  width={80}
                  height={80}
                  className="size-6 shrink-0"
                />
                <span>@montecarlohogar</span>
              </a>

              <a
                href={SOCIAL_FACEBOOK}
                target="_blank"
                rel="noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground flex items-center gap-2 py-2 text-sm transition-colors"
              >
                <Image
                  src="/icons/facebook.webp"
                  alt="Facebook"
                  width={80}
                  height={80}
                  className="size-6 shrink-0"
                />
                <span>Montecarlo hogar</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-lg uppercase">Nuestras sucursales</h3>

          <ul className="mt-5 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {BRANCHES.map((branch) => (
              <li key={branch.id} className="flex gap-3">
                <div className="min-w-0">
                  <p className="font-bold">{branch.name}</p>

                  <a
                    className="text-primary-foreground/75 hover:text-primary-foreground mt-1.5 flex items-start gap-2 py-0.5 text-sm transition-colors"
                    href={branch.addressHref}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                    {branch.address}
                  </a>

                  <a
                    className="text-primary-foreground/75 hover:text-primary-foreground flex items-center gap-2 py-0.5 text-sm tabular-nums transition-colors"
                    href={`tel:${branch.whatsappPhone}`}
                  >
                    <Phone className="size-4 shrink-0" aria-hidden />
                    {branch.phoneDisplay}
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-primary-foreground/15 border-t py-4">
        <p className="content-wrapper text-primary-foreground/60 text-center text-xs">
          © {new Date().getFullYear()} {SITE_NAME}. Sitio de demostración,
          creado por Matías Ibarra.
        </p>
      </div>
    </footer>
  );
}
