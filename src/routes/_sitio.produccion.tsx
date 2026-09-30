import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import planta from "@/assets/taller-columnas.jpg";
import posterMaquinas from "@/assets/sierra-columna.jpg";
import { CapacidadesDetalle } from "@/components/home/capacidades-detalle";
import { Cierre } from "@/components/home/cierre";
import { Magnetico, Marquesina } from "@/components/home/efectos";
import { Aparecer } from "@/components/home/movimiento";
import { PortadaPagina } from "@/components/home/portada-pagina";
import { materiales, useTexto, whatsappCon } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/_sitio/produccion")({
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

/** Mismo botón para toda acción de la página (reunión 29/09: botones uniformes). */
const BOTON =
  "mdh-label group relative inline-flex items-center gap-4 overflow-hidden bg-mdh-tinta px-7 py-5 text-white";

function RellenoBoton() {
  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 translate-y-full bg-mdh-acero transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
    />
  );
}

function ProduccionPagina() {
  const { t, lang } = useLang();
  const tx = useTexto();

  return (
    <>
      <PortadaPagina
        lineas={lang === "en" ? ["What we can", "do for you."] : ["Lo que podemos", "hacer por ti."]}
        texto={t(
          "Cada pieza se fabrica a la medida del proyecto. Si puedes imaginarla en piedra, podemos hacerla.",
          "Every piece is made to measure for the project. If you can picture it in stone, we can make it.",
        )}
        imagen={planta}
        alt={t("Operario cortando losas de piedra en la planta", "Craftsman cutting stone slabs at the plant")}
      />

      <MaquinariaYOficio />
      <CapacidadesDetalle />

      <section aria-labelledby="catalogo-titulo" className="overflow-hidden bg-mdh-hueso">
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
          {/* Reunión 29/09: "Catálogo" en lugar de "Materiales", y se pide por WhatsApp. */}
          <Aparecer className="flex flex-col md:pr-14">
            <h2 id="catalogo-titulo" className="mdh-label text-mdh-pizarra">
              {t("Catálogo", "Catalog")}
            </h2>
            <p className="mt-8 text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-snug">
              {t("Un inventario que cambia constantemente.", "An inventory that is always changing.")}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mdh-acero">
              {t(
                "Lo actualizamos cada mes. Escríbenos para enviarte lo más nuevo dentro de nuestro inventario o para solicitar una cotización.",
                "We update it every month. Write to us and we'll send you the latest from our inventory, or request a quote.",
              )}
            </p>
            <Magnetico className="mt-10 self-start">
              <a
                href={whatsappCon(t("Hola, me gustaría recibir el catálogo de piedra natural.", "Hi, I'd like to receive the natural stone catalog."))}
                target="_blank"
                rel="noopener noreferrer"
                className={BOTON}
              >
                <RellenoBoton />
                <span className="relative">{t("Solicitar catálogo", "Request the catalog")}</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-700 group-hover:rotate-45" strokeWidth={1.5} />
              </a>
            </Magnetico>
          </Aparecer>

          <Aparecer retraso={0.1} className="flex flex-col md:border-l md:border-mdh-tinta/10 md:pl-14">
            <p className="mdh-label text-mdh-pizarra">{t("Exportación", "Export")}</p>
            <p className="mt-8 text-[clamp(1.75rem,3vw,2.75rem)] font-light leading-snug">
              {t("A nivel nacional e internacional.", "At home and abroad.")}
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mdh-acero">
              {t(
                "Preparamos cada pieza para viajar: embalaje por pieza, logística internacional y coordinación con la obra desde la planta.",
                "Every piece is prepared to travel: individual packaging, international logistics and coordination with the site straight from the plant.",
              )}
            </p>
            <Magnetico className="mt-10 self-start">
              <Link to="/proyectos" className={BOTON}>
                <RellenoBoton />
                <span className="relative">{t("Ver proyectos entregados", "See delivered projects")}</span>
                <ArrowUpRight className="relative h-4 w-4 transition-transform duration-700 group-hover:rotate-45" strokeWidth={1.5} />
              </Link>
            </Magnetico>
          </Aparecer>
        </div>
      </section>

      <Cierre />
    </>
  );
}

/**
 * Reunión 29/09: sin listar máquinas por modelo. A la izquierda, clips de la
 * maquinaria trabajando; a la derecha, lo que eso significa para el cliente.
 *
 * PROVISIONAL: corre el loop del taller hasta recibir el video de máquinas
 * de Antonella; se reemplaza cambiando la ruta del <video>.
 */
function MaquinariaYOficio() {
  const { t } = useLang();
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.src = window.innerWidth < 768 ? "/videos/hero-taller-sd.mp4" : "/videos/hero-taller-hd.mp4";
    v.muted = true;
    void v.play().catch(() => {});
  }, []);

  return (
    <section aria-labelledby="maquinaria-titulo" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pt-24 md:grid-cols-12 md:gap-10 md:px-10 md:pt-32">
        <Aparecer className="md:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden bg-mdh-tinta">
            <video
              ref={video}
              className="absolute inset-0 h-full w-full object-cover"
              poster={posterMaquinas}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          </div>
        </Aparecer>

        <Aparecer retraso={0.1} className="md:col-span-5 md:pl-6">
          <p className="mdh-label text-mdh-pizarra">{t("Planta y oficio", "Plant and craft")}</p>
          <h2
            id="maquinaria-titulo"
            className="mt-6 text-[clamp(1.9rem,3.2vw,3rem)] font-light leading-[1.1] tracking-[-0.015em]"
          >
            {t("Maquinaria de último nivel, manos expertas.", "State-of-the-art machinery, expert hands.")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mdh-acero">
            {t(
              "Tenemos la maquinaria para cortar, fresar y tallar lo que tu proyecto necesite, sin importar la escala. Y más de 70 artesanos, muchos con décadas en la empresa, le dan a cada pieza su acabado final.",
              "We have the machinery to cut, mill and carve whatever your project needs, at any scale. And more than 70 craftsmen, many with decades at the company, give every piece its final finish.",
            )}
          </p>
        </Aparecer>
      </div>
    </section>
  );
}
