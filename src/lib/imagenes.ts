/**
 * Miniaturas para fotos que se ven chicas (tarjetas, collage, carruseles móviles).
 * Cada foto importada sale por defecto en WebP de hasta 1600 px (vite.config.ts);
 * aquí se genera además una versión de 800 px y se busca por la URL original, así
 * los datos (site-data, home-contenido) siguen igual y basta con `miniatura(url)`.
 */
const originales = import.meta.glob<string>("/src/assets/*.{jpg,jpeg}", {
  eager: true,
  import: "default",
});
const reducidas = import.meta.glob<string>("/src/assets/*.{jpg,jpeg}", {
  eager: true,
  import: "default",
  query: { w: "800", quality: "66", format: "webp" },
});

const porUrl = new Map(Object.entries(originales).map(([ruta, url]) => [url, reducidas[ruta]]));

/** Versión de 800 px de una foto de src/assets; si no la conoce, devuelve la misma URL. */
export function miniatura(url: string) {
  return porUrl.get(url) ?? url;
}
