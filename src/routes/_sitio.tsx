import { Outlet, createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";

import { Encabezado } from "@/components/home/encabezado";
import { CursorPremium } from "@/components/home/cursor-premium";
import { Entrada } from "@/components/home/entrada";
import { WhatsappFlotante } from "@/components/home/whatsapp-flotante";
import { Medicion } from "@/components/home/medicion";
import { Pie } from "@/components/home/pie";
import { ScrollSuave } from "@/components/home/scroll-suave";

/**
 * Sitio de Mármoles de Honduras. Ruta sin segmento propio: envuelve la raíz y
 * las páginas interiores con el encabezado fijo, el pie y el scroll suave.
 * El demo anterior quedó archivado en /demo.
 */
export const Route = createFileRoute("/_sitio")({
  head: () => ({
    // Los dos pesos que pinta la primera pantalla se piden de inmediato.
    links: [
      { rel: "preload", href: "/fonts/sweet-sans-pro-light.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/sweet-sans-pro-regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    ],
  }),
  component: SitioNuevo,
});

function SitioNuevo() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mdh min-h-screen bg-white font-mdh text-mdh-tinta antialiased">
        <Entrada />
        <CursorPremium />
        <ScrollSuave />
        <Encabezado />
        <main>
          <Outlet />
        </main>
        <Pie />
        <WhatsappFlotante />
        <Medicion />
      </div>
    </MotionConfig>
  );
}
