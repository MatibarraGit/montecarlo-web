import type { Metadata } from "next";

import { THEME_INIT_SCRIPT } from "@/libs/theme";
import "./globals.css";

const SITE_NAME = "Montecarlo Hogar";
const SITE_DESCRIPTION =
  "Electrodomésticos, herramientas, bicicletas y artículos para el hogar. Catálogo online de Montecarlo Hogar.";
// TODO: reemplazar por el dominio real una vez que el cliente lo defina/compre.
const SITE_URL = "https://montecarlohogar.com.ar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} | Electrodomésticos y artículos para el hogar`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },

  creator: "Matías Ibarra",
  authors: [{ name: "Matías Ibarra" }],

  generator: "Next.js",
  keywords: [
    "electrodomésticos",
    "electrodomesticos",
    "tienda online",
    "ofertas",
    "herramientas",
    "bicicletas",
    "climatización",
    "climatizacion",
    "muebles",
    "línea blanca",
    "blanquería",
    "bazar",
    "artículos para el hogar",
    "Montecarlo Hogar",
    "comprar online",
    "Argentina",
  ],

  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: "/logo.webp",
        width: 480,
        height: 480,
        alt: SITE_NAME,
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/logo.webp"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: el script de abajo escribe `data-theme` en el
    // <html> antes de que React hidrate, así que el markup del server no coincide.
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
