// Datos del negocio centralizados (nombre, contacto, redes, WhatsApp).

export const SITE_NAME = "Montecarlo Hogar";
export const SITE_DESCRIPTION = "Mayorista y minorista de electrodomésticos, muebles, colchones, artículos de ferretería, bazar y más!";

/* ---------------------------------------------------------------------- */
/* Datos compartidos por las 3 sucursales.                                 */
/* ---------------------------------------------------------------------- */

export const CONTACT_EMAIL = "administracion@montecarlohogar.com";

export const CONTACT_HOURS = [
  { days: "Lunes a sábados", hours: "09:00 – 18:00" },
  { days: "Domingos", hours: "Cerrado" },
];

/* ---------------------------------------------------------------------- */
/* Sucursales. Cada una tiene su propio teléfono, dirección e imagen; el   */
/* email y los horarios de arriba valen para las tres. El sufijo numérico  */
/* (35 / 38 / 44) coincide con el nombre del archivo en public/.           */
/* ---------------------------------------------------------------------- */

export type BranchType = {
  id: string;
  name: string;
  address: string;
  addressHref: string;
  phoneDisplay: string;
  whatsappPhone: string;
  image: string;
  imageAlt: string;
};

export const BRANCH_35: BranchType = {
  id: "35",
  name: "Sucursal Kilómetro 35",
  address: "Av. Río de la Plata 8005, Virrey del Pino, Buenos Aires",
  addressHref: "https://maps.app.goo.gl/zE5eYrunGGoV9qXh8",
  phoneDisplay: "+54 9 11 2745-4711",
  whatsappPhone: "+5491127454711",
  image: "/sucursal-35-1.png",
  imageAlt: "Frente del salón de ventas de Montecarlo Hogar en el Kilómetro 35",
};
// 
export const BRANCH_38: BranchType = {
  id: "38",
  name: "Sucursal Kilómetro 38",
  address: "Hugo Wast 814, Virrey del Pino, Buenos Aires",
  addressHref: "https://maps.app.goo.gl/vrc6DnLs3FMLi97R7",
  phoneDisplay: "+54 9 11 6418-0648",
  whatsappPhone: "+5491164180648",
  image: "/sucursal-38-1.png",
  imageAlt: "Frente del salón de ventas de Montecarlo Hogar en el Kilómetro 38",
};

export const BRANCH_44: BranchType = {
  id: "44",
  name: "Sucursal Kilómetro 44",
  address: "Av. Brig. Gral. Juan Manuel de Rosas 27349, Virrey del Pino, Buenos Aires",
  addressHref: "https://maps.app.goo.gl/pkzW6d2RA8394wUg7",
  phoneDisplay: "+54 9 11 3440-8806",
  whatsappPhone: "+5491134408806",
  image: "/sucursal-44-1.png",
  imageAlt: "Frente del salón de ventas de Montecarlo Hogar en el Kilómetro 44",
};

/** Orden en el que se listan las sucursales en la web. */
export const BRANCHES: BranchType[] = [BRANCH_35, BRANCH_38, BRANCH_44];

/** Casa central: la sucursal que se destaca y a la que caen los links sin contexto. */
export const MAIN_BRANCH = BRANCH_35;

/** Fallback de `buildWhatsAppUrl` cuando el link no nace de una sucursal concreta. */
export const WHATSAPP_PHONE = MAIN_BRANCH.whatsappPhone;

export const SOCIAL_INSTAGRAM = "https://www.instagram.com/montecarlohogar";
export const SOCIAL_FACEBOOK = "https://www.facebook.com/MontecarloHogar";

export const WHATSAPP_DEFAULT_MESSAGE =
  "¡Hola! Estoy viendo el catálogo online y quería hacer una consulta.";

/** Arma el link de la API de WhatsApp con un mensaje prellenado, para la sucursal indicada. */
export function buildWhatsAppUrl(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
  phone: string = WHATSAPP_PHONE
): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/** Secciones a las que apunta la navegación del header (y el scroll suave). */
export const NAV_LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
];
