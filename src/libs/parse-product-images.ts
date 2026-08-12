/**
 * El campo `images` de cada producto no viene como array JSON, sino como un
 * string con formato de array de Postgres: "{url1,url2}" (o "{url1}" para
 * productos con una sola imagen). Acá se le sacan las llaves y se separa por
 * coma para obtener el array real de URLs (todas apuntan a Cloudinary).
 */
export function parseProductImages(images: string): string[] {
  if (!images) return [];

  const withoutBraces = images.replace(/^\{/, "").replace(/\}$/, "");
  if (!withoutBraces) return [];

  return withoutBraces.split(",").map((url) => url.trim());
}
