import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Preset de despliegue. Vercel por defecto; se puede sobreescribir con
// NITRO_PRESET (p. ej. "node-server" para un VPS propio, "netlify", "bun").
const preset = process.env.NITRO_PRESET ?? "vercel";

export default defineConfig({
  plugins: [
    tsConfigPaths(),
    tailwindcss(),
    tanstackStart({
      // src/server.ts es el wrapper SSR de errores; nitro construye desde ahí.
      server: { entry: "server" },
    }),
    viteReact(),
    nitro({ preset }),
  ],
  resolve: {
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-start"],
  },
});
