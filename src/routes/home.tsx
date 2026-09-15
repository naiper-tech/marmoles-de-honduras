import { Outlet, createFileRoute } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";

import { Encabezado } from "@/components/home/encabezado";
import { Pie } from "@/components/home/pie";
import { ScrollSuave } from "@/components/home/scroll-suave";

/**
 * Sitio nuevo de Mármoles de Honduras, en revisión con el cliente.
 * Vive bajo /home hasta su aprobación; mientras tanto queda fuera de buscadores.
 */
export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
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
