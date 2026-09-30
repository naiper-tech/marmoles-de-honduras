import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { imagetools } from "vite-imagetools";

// Preset de despliegue. Vercel por defecto; se puede sobreescribir con
// NITRO_PRESET (p. ej. "node-server" para un VPS propio, "netlify", "bun").
const preset = process.env.NITRO_PRESET ?? "vercel";

/** Páginas del sitio que se generan como HTML estático y se sirven desde el CDN. */
const PAGINAS = ["/", "/nosotros", "/produccion", "/proyectos", "/contacto"];

/**
 * Toda foto importada sin parámetros sale en WebP y a un ancho máximo razonable:
 * los originales se quedan intactos en src/assets. Los logos, que se ven chicos,
 * se reducen más. Un import con `?w=…` propio (p. ej. los srcset de las portadas)
 * no se toca.
 */
function directivasPorDefecto(url: URL) {
  if (url.searchParams.size > 0 || !/\/src\/assets\/.+\.(jpe?g|png)$/.test(url.pathname)) {
    return new URLSearchParams();
  }
  const logo = /\/logo-[^/]+\.png$/.test(url.pathname);
  return new URLSearchParams({
    format: "webp",
    w: logo ? "480" : "1600",
    withoutEnlargement: "",
    quality: logo ? "82" : "72",
  });
}

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    imagetools({ defaultDirectives: directivasPorDefecto }),
    tanstackStart({
      // src/server.ts es el wrapper SSR de errores; nitro construye desde ahí.
      server: { entry: "server" },
      // HTML estático: sin arranque en frío de la función en cada visita.
      prerender: { enabled: true, crawlLinks: false, failOnError: true },
      pages: PAGINAS.map((path) => ({ path })),
    }),
    viteReact(),
    nitro({
      preset,
      // Fuentes y videos no llevan hash en el nombre: 30 días de caché, no un año.
      routeRules: {
        "/fonts/**": { headers: { "cache-control": "public, max-age=2592000" } },
        "/videos/**": { headers: { "cache-control": "public, max-age=2592000" } },
      },
    }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});
