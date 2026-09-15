import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import taller from "@/assets/proceso-corte-bloque.jpg";
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
        alt={t("Bloque de piedra entrando al telar en la planta", "A stone block entering the gang saw at the plant")}
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

      <LineaTiempo />
      <Valores />
      <Alcance />
      <CasaMarmol />
      <Cierre />
    </>
  );
}
