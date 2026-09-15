import { useRef } from "react";
import { motion, useScroll } from "motion/react";

import { useLang } from "@/lib/i18n";
import { Contador } from "./efectos";
import { EnlaceMas } from "./enlaces";
import { Aparecer } from "./movimiento";

/** Resumen de la historia. La línea de tiempo completa vive en Nosotros. */
export function HistoriaResumen() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });

  const hitos = [
    { marca: "1970", texto: t("Fundación en Honduras", "Founded in Honduras") },
    { marca: t("Origen", "Origin"), texto: t("Canteras propias", "Our own quarries") },
    {
      marca: t("Hoy", "Today"),
      texto: t("Obra en EE. UU., Centroamérica y el Caribe", "Work in the US, Central America and the Caribbean"),
    },
  ];

  return (
    <section aria-labelledby="historia-resumen" className="bg-mdh-hueso">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid items-end gap-14 md:grid-cols-12">
          <div className="md:col-span-6">
            <h2 id="historia-resumen" className="mdh-label text-mdh-pizarra">
              {t("Nuestra historia", "Our story")}
            </h2>
            <p
              aria-label={t("Más de 55 años", "More than 55 years")}
              className="mt-8 flex items-start text-[clamp(7rem,19vw,16rem)] font-extralight leading-[0.8] tracking-[-0.06em]"
            >
              <Contador hasta={55} />
              <span aria-hidden="true" className="mt-[0.06em] text-[0.34em] font-light">
                +
              </span>
            </p>
            <p className="mdh-label mt-8 text-mdh-pizarra">{t("Años de oficio", "Years of craft")}</p>
          </div>

          <Aparecer className="md:col-span-5 md:col-start-8">
            <p className="text-xl font-light leading-relaxed md:text-2xl">
              {t(
                "Desde 1970 lideramos la industria de la piedra natural en Honduras. Una empresa familiar y hondureña que hoy entrega obra en tres regiones del continente.",
                "Since 1970 we have led the natural stone industry in Honduras. A Honduran family company that today delivers work across three regions of the Americas.",
              )}
            </p>
            <EnlaceMas to="/nosotros" className="mt-10">
              {t("Conoce nuestra historia", "Discover our story")}
            </EnlaceMas>
          </Aparecer>
        </div>

        <div ref={ref} className="mt-24 md:mt-32">
          <div aria-hidden="true" className="h-px bg-mdh-tinta/15">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-px origin-left bg-mdh-tinta" />
          </div>
          <ol className="grid gap-10 pt-10 sm:grid-cols-3">
            {hitos.map((hito, i) => (
              <li key={hito.marca} className="group">
                <Aparecer retraso={i * 0.1} y={16}>
                  <span className="mdh-label text-mdh-pizarra">{hito.marca}</span>
                  <p className="mt-3 text-xl font-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {hito.texto}
                  </p>
                </Aparecer>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
