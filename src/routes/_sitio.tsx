import { Outlet, createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";

import { Encabezado } from "@/components/home/encabezado";
import { Pie } from "@/components/home/pie";
import { ScrollSuave } from "@/components/home/scroll-suave";

/**
 * Sitio de Mármoles de Honduras. Ruta sin segmento propio: envuelve la raíz y
 * las páginas interiores con el encabezado fijo, el pie y el scroll suave.
 * El demo anterior quedó archivado en /demo.
 */
export const Route = createFileRoute("/_sitio")({
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Jost:wght@200;300;400;500&display=swap",
      },
    ],
  }),
  component: SitioNuevo,
});

function SitioNuevo() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="mdh min-h-screen bg-white font-mdh text-mdh-tinta antialiased">
        <ScrollSuave />
        <Encabezado />
        <main>
          <Outlet />
        </main>
        <Pie />
      </div>
    </MotionConfig>
  );
}
