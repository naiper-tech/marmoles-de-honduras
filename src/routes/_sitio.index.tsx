import { createFileRoute } from "@tanstack/react-router";

import { Alcance } from "@/components/home/alcance";
import { CapacidadesHome } from "@/components/home/capacidades-home";
import { CasaMarmol } from "@/components/home/casa-marmol";
import { Cierre } from "@/components/home/cierre";
import { HistoriaResumen } from "@/components/home/historia-resumen";
import { Manifiesto } from "@/components/home/manifiesto";
import { Portada } from "@/components/home/portada";
import { ProyectosHorizontal } from "@/components/home/proyectos-horizontal";

export const Route = createFileRoute("/_sitio/")({
  head: () => ({
    meta: [
      { title: "Mármoles de Honduras — Fabricantes de piedra natural desde 1970" },
      {
        name: "description",
        content:
          "Fabricantes y exportadores de piedra natural. Operación vertical, de canteras propias al producto terminado, para Honduras, Estados Unidos, Centroamérica y el Caribe.",
      },
    ],
  }),
  component: Inicio,
});

/** Inicio: un recorrido por la marca con salida a cada página. */
function Inicio() {
  return (
    <>
      <Portada />
      <Manifiesto />
      <HistoriaResumen />
      <CapacidadesHome />
      <ProyectosHorizontal />
      <Alcance />
      <CasaMarmol />
      <Cierre />
    </>
  );
}
