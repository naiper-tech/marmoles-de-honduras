import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import taller from "@/assets/planta-aerea.jpg";
import { Alcance } from "@/components/home/alcance";
import { CasaMarmol } from "@/components/home/casa-marmol";
import { Cierre } from "@/components/home/cierre";
import { TextoPorScroll } from "@/components/home/efectos";
import { LineaTiempo } from "@/components/home/linea-tiempo";
import { Aparecer, EASE } from "@/components/home/movimiento";
import { PortadaPagina } from "@/components/home/portada-pagina";
import { Valores } from "@/components/home/valores";
import { MISION, VISION, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/_sitio/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Mármoles de Honduras" },
      {
        name: "description",
        content:
          "Empresa familiar hondureña fundada en 1970, líder en la fabricación y distribución de piedra natural.",
      },
    ],
  }),
  component: Nosotros,
});

function Nosotros() {
  const { t, lang } = useLang();
  const tx = useTexto();

  const principios = [
    { titulo: t("Misión", "Mission"), texto: tx(MISION), destacado: true },
    { titulo: t("Visión", "Vision"), texto: tx(VISION), destacado: false },
  ];

  return (
    <>
      <PortadaPagina
        numero="01"
        etiqueta={t("Nosotros", "About")}
        lineas={lang === "en" ? ["More than 55 years", "shaping stone."] : ["Más de 55 años", "dando forma a la piedra."]}
        texto={t(
          "Empresa familiar hondureña, líder en la fabricación y distribución de piedra natural.",
          "A Honduran family company, leading the fabrication and distribution of natural stone.",
        )}
        imagen={taller}
        alt={t(
          "Vista aérea de la planta de Mármoles de Honduras en Tegucigalpa",
          "Aerial view of the Mármoles de Honduras plant in Tegucigalpa",
        )}
      />

      <section aria-labelledby="quienes-titulo" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
          <div className="grid gap-10 md:grid-cols-12">
            <Aparecer className="md:col-span-3">
              <h2 id="quienes-titulo" className="mdh-label text-mdh-pizarra">
                {t("Quiénes somos", "Who we are")}
              </h2>
            </Aparecer>
            <TextoPorScroll
              key={lang}
              className="text-[clamp(1.75rem,3.5vw,3.4rem)] font-light leading-[1.18] tracking-[-0.02em] md:col-span-9"
              texto={t(
                "Mármoles de Honduras nació en 1970 y hoy lidera la industria de la piedra natural en el país. Somos una empresa familiar, hondureña y completamente vertical: extraemos en canteras propias, fabricamos en planta y comercializamos dentro y fuera de Honduras.",
                "Mármoles de Honduras was founded in 1970 and today leads the natural stone industry in the country. We are a family-owned, Honduran and fully vertical company: we quarry our own stone, fabricate it in our plant and sell it in Honduras and abroad.",
              )}
            />
          </div>

          <div className="mt-28 md:mt-40">
            {principios.map((principio, i) => (
              <div
                key={principio.titulo}
                className="group grid gap-6 border-t border-mdh-niebla py-12 last:border-b md:grid-cols-12 md:py-16"
              >
                <div className="flex items-center gap-4 md:col-span-3">
                  <span className="mdh-label text-mdh-pizarra">{String(i + 1).padStart(2, "0")}</span>
                  <motion.span
                    aria-hidden="true"
                    className="block h-px w-8 origin-left bg-mdh-tinta"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ duration: 1, ease: EASE }}
                  />
                  <span className="mdh-label">{principio.titulo}</span>
                </div>
                <Aparecer className="md:col-span-9">
                  <p
                    className={
                      principio.destacado
                        ? "text-[clamp(2.2rem,4.8vw,4.75rem)] font-extralight leading-[1.04] tracking-[-0.025em]"
                        : "max-w-4xl text-[clamp(1.4rem,2.4vw,2.25rem)] font-light leading-[1.35] text-mdh-acero"
                    }
                  >
                    {principio.texto}
                  </p>
                </Aparecer>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LaPlanta />
      <LineaTiempo />
      <Valores />
      <Alcance />
      <CasaMarmol />
      <Cierre />
    </>
  );
}

/**
 * Cifras de la operación (brochure de marca): lo que un comprador extranjero
 * necesita saber antes de escribir — tamaño de planta, equipo y cercanía.
 */
function LaPlanta() {
  const { t } = useLang();

  const cifras = [
    { dato: "1970", etiqueta: t("Año de fundación", "Founded") },
    { dato: "70+", etiqueta: t("Artesanos en planta", "Craftsmen on the floor") },
    { dato: "12,450 m²", etiqueta: t("Área de fabricación", "Manufacturing area") },
    { dato: "24 h", etiqueta: t("Desde EE. UU. para inspección", "From the U.S. for an inspection") },
  ];

  return (
    <section aria-labelledby="planta-titulo" className="border-t border-mdh-niebla bg-mdh-hueso">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="grid gap-12 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <h2 id="planta-titulo" className="mdh-label text-mdh-pizarra">
              {t("La planta", "The plant")}
            </h2>
          </Aparecer>
          <Aparecer className="md:col-span-9">
            <p className="max-w-3xl text-[clamp(1.25rem,2.2vw,2rem)] font-light leading-[1.35] text-mdh-acero">
              {t(
                "12,450 m² de fabricación sobre un terreno de 19,000 m², a las afueras de Tegucigalpa y a minutos del aeropuerto internacional: una visita de inspección desde Estados Unidos toma menos de 24 horas.",
                "12,450 m² of manufacturing on a 19,000 m² site just outside Tegucigalpa, minutes from the international airport: an inspection visit from the United States takes under 24 hours.",
              )}
            </p>
          </Aparecer>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 border-t border-mdh-tinta/10 pt-12 md:mt-24 md:grid-cols-4">
          {cifras.map((cifra, i) => (
            <Aparecer key={cifra.dato} retraso={i * 0.08}>
              <dt className="mdh-label text-mdh-pizarra">{cifra.etiqueta}</dt>
              <dd className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-extralight leading-none tracking-[-0.03em]">
                {cifra.dato}
              </dd>
            </Aparecer>
          ))}
        </dl>
      </div>
    </section>
  );
}
