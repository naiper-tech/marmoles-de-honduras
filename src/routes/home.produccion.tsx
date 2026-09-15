import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import planta from "@/assets/proceso-corte-losa.jpg";
import { CapacidadesDetalle } from "@/components/home/capacidades-detalle";
import { Cierre } from "@/components/home/cierre";
import { Magnetico, Marquesina, TextoPorScroll } from "@/components/home/efectos";
import { EnlaceMas } from "@/components/home/enlaces";
import { Aparecer } from "@/components/home/movimiento";
import { PortadaPagina } from "@/components/home/portada-pagina";
import { ProcesoScroll } from "@/components/home/proceso-scroll";
import { correoCon, materiales, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/home/produccion")({
  head: () => ({
    meta: [
      { title: "Producción — Mármoles de Honduras" },
      {
        name: "description",
        content:
          "Reprocesamiento, cubiertas, pisos, tallado, columnas y piezas a la medida en piedra natural, con capacidad de exportación.",
      },
    ],
  }),
  component: ProduccionPagina,
});

function ProduccionPagina() {
  const { t, lang } = useLang();
  const tx = useTexto();

  return (
    <>
      <PortadaPagina
        numero="02"
        etiqueta={t("Producción", "Production")}
        lineas={lang === "en" ? ["What we can", "do for you."] : ["Lo que podemos", "hacer por ti."]}
        texto={t(
          "Cada pieza se fabrica a la medida del proyecto. Si puedes imaginarla en piedra, podemos hacerla.",
          "Every piece is made to measure for the project. If you can picture it in stone, we can make it.",
        )}
        imagen={planta}
        alt={t("Operario cortando losas de piedra en la planta", "Craftsman cutting stone slabs at the plant")}
      />

      <section aria-labelledby="produccion-intro" className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 pt-28 md:grid-cols-12 md:px-10 md:pt-40">
          <Aparecer className="md:col-span-3">
            <h2 id="produccion-intro" className="mdh-label text-mdh-pizarra">
              {t("Para quién", "Who we work with")}
            </h2>
          </Aparecer>
          <TextoPorScroll
            key={lang}
            className="text-[clamp(1.75rem,3.5vw,3.4rem)] font-light leading-[1.18] tracking-[-0.02em] md:col-span-9"
            texto={t(
              "Trabajamos para arquitectos, desarrolladores, constructoras y clientes finales. Desde una cubierta de cocina hasta la piedra de un hotel completo, en Honduras o al otro lado del mar.",
              "We work with architects, developers, contractors and homeowners. From a single kitchen countertop to the stone of an entire hotel, in Honduras or across the sea.",
            )}
          />
        </div>
      </section>

      <CapacidadesDetalle />
      <ProcesoScroll />

      <section aria-labelledby="materiales-titulo" className="overflow-hidden bg-mdh-hueso">
        <div className="border-b border-mdh-tinta/10 py-12 md:py-16">
          <Marquesina duracion={50}>
            {materiales.map((material) => (
              <span
                key={material.es}
                className="flex items-center text-[clamp(3rem,8vw,7.5rem)] font-extralight leading-none tracking-[-0.03em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(23,24,25,0.35)] hover:text-mdh-tinta"
              >
                {tx(material)}
                <span aria-hidden="true" className="mx-10 text-[0.25em] text-mdh-tinta/25 [-webkit-text-stroke:0]">
                  ●
                </span>
              </span>
            ))}
          </Marquesina>
        </div>

        <div className="mx-auto grid max-w-[1440px] gap-20 px-6 py-24 md:grid-cols-2 md:gap-10 md:px-10 md:py-32">
          <Aparecer className="md:pr-14">
            <h2 id="materiales-titulo" className="mdh-label text-mdh-pizarra">
              {t("Materiales", "Materials")}
            </h2>
            <p className="mt-8 text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-snug">
              {t("Un inventario que cambia cada semana.", "An inventory that changes every week.")}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-mdh-acero">
              {t(
                "No publicamos un catálogo fijo: el inventario rota constantemente. Te enviamos el catálogo actualizado con lo que hay disponible hoy.",
                "We don't publish a fixed catalog because our inventory rotates constantly. We'll send you the current catalog with what's available today.",
              )}
            </p>
            <Magnetico className="mt-10">
              <a
                href={correoCon(t("Solicitud de catálogo de piedra natural", "Natural stone catalog request"))}
                className="mdh-label group relative inline-flex items-center gap-4 overflow-hidden bg-mdh-tinta px-7 py-5 text-white"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full bg-mdh-acero transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                />
                <span className="relative">{t("Solicitar catálogo", "Request the catalog")}</span>
                <ArrowUpRight
                  className="relative h-4 w-4 transition-transform duration-700 group-hover:rotate-45"
                  strokeWidth={1.5}
                />
              </a>
            </Magnetico>
          </Aparecer>

          <Aparecer retraso={0.1} className="md:border-l md:border-mdh-tinta/10 md:pl-14">
            <p className="mdh-label text-mdh-pizarra">{t("Exportación", "Export")}</p>
            <p className="mt-8 text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-snug">
              {t(
                "Honduras, Estados Unidos, Centroamérica y el Caribe.",
                "Honduras, the United States, Central America and the Caribbean.",
              )}
            </p>
            <p className="mt-6 max-w-md leading-relaxed text-mdh-acero">
              {t(
                "Preparamos cada pieza para viajar: embalaje por pieza, logística internacional y coordinación con la obra desde la planta.",
                "Every piece is prepared to travel: individual packaging, international logistics and coordination with the site straight from the plant.",
              )}
            </p>
            <EnlaceMas to="/home/proyectos" className="mt-10">
              {t("Ver proyectos entregados", "See delivered projects")}
            </EnlaceMas>
          </Aparecer>
        </div>
      </section>

      <Cierre />
    </>
  );
}
