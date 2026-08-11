import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(""), // https://tu-dominio.com

  title: {
    default: "", // Nombre del sitio
    template: "%s | ", // Nombre del sitio
  },
  applicationName: "", // Nombre del sitio

  creator: "Matías Ibarra", // Autor del sitio
  authors: [ { name: 'Matías Ibarra', url: '' } ], // Autor del sitio

  icons: {
    icon: "/icon.png", // 32x32 o 48x48
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // 180x180
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  },

  generator: "Next.js",
  keywords: [
    'electrodomésticos',
    'electrodomesticos',
    'tienda online',
    'ofertas',
    'herramientas',
    'ventiladores',
    'climatización',
    'climatizacion',
    'muebles',
    'línea blanca',
    'blanqueria',
    'bazar',
    'artículos varios',
    'articulos varios',
    'Pritia',
    'comprar online',
    'Argentina'
  ],

  openGraph: {
    title: "", // Nombre del sitio
    description: "", // Descripción del sitio
    url: "", // https://tu-dominio.com
    siteName: "", // Nombre del sitio
    images: [
      {
        url: "", // URL de la imagen (og:image)
        width: 1200,
        height: 630,
        alt: "", // Alt de la imagen
        type: "image/png",
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "", // Nombre del sitio
    description: "", // Descripción del sitio
    images: [""], // URL de la imagen
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    }
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
