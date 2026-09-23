import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";

import { loc, useLang } from "@/lib/i18n";
import { proceso } from "@/lib/site-data";
import { useMedia } from "./efectos";
import { tramo } from "./imagen-expansiva";
import { Emerge } from "./movimiento";

/**
 * Proceso en cuatro pasos. En escritorio la sección se fija: la línea avanza con el
 * scroll y cada paso se enciende al alcanzarlo. En móvil es una lista vertical.
 */
export function ProcesoScroll() {
  const { t, lang } = useLang();
  const escritorio = useMedia("(min-width: 1024px)");
  const ref = useRef<HTMLElement>(null);
  const total = proceso.length;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const avance = useTransform(() => tramo(scrollYProgress.get(), 0.04, 0.88));
  const [encendidos, setEncendidos] = useState(0);
  useMotionValueEvent(avance, "change", (v) => setEncendidos(Math.ceil(v * total)));

  return (
    <section
      ref={ref}
      aria-labelledby="proceso-titulo"
      className="relative bg-mdh-tinta text-white"
      style={escritorio ? { height: "200vh" } : undefined}
    >
      <div className={escritorio ? "sticky top-0 flex h-screen flex-col justify-center" : "py-28"}>
        <div className="mx-auto w-full max-w-[1440px] px-6 md:px-10">
          <div className="grid gap-10 md:grid-cols-12">
            <p className="mdh-label text-white/55 md:col-span-3">{t("Proceso", "Process")}</p>
            <div className="flex flex-col gap-8 md:col-span-9 md:flex-row md:items-end md:justify-between">
              <h2
                id="proceso-titulo"
                className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.015em]"
              >
                <Emerge key={lang} lineas={lang === "en" ? ["From the quarry", "to the site."] : ["De la cantera", "a la obra."]} />
              </h2>
              <p className="max-w-xs leading-relaxed text-white/55">
                {t("Cuatro etapas y un solo responsable de principio a fin.", "Four stages and one team accountable from start to finish.")}
              </p>
            </div>
          </div>

          <div className="relative mt-16 lg:mt-24">
            <div aria-hidden="true" className="absolute inset-x-0 top-[3px] hidden h-px bg-white/15 lg:block">
              <motion.div style={{ scaleX: avance }} className="h-px origin-left bg-white" />
            </div>

            <ol className="grid gap-14 lg:grid-cols-4 lg:gap-10">
              {proceso.map((original, i) => {
                const paso = loc(original, lang);
                const encendido = !escritorio || i < encendidos;
                return (
                  <li key={paso.paso} className="relative lg:pt-12">
                    <span
                      aria-hidden="true"
                      className={`absolute left-0 top-0 hidden h-[7px] w-[7px] rounded-full border transition-colors duration-500 lg:block ${
                        encendido ? "border-white bg-white" : "border-white/40 bg-mdh-tinta"
                      }`}
                    />
                    <div
                      className={`transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        encendido ? "translate-y-0 opacity-100" : "translate-y-4 opacity-25"
                      }`}
                    >
                      <span className="block text-[clamp(3.5rem,5.6vw,5.75rem)] font-extralight leading-none tracking-[-0.04em]">
                        {paso.paso}
                      </span>
                      <h3 className="mt-8 text-2xl font-light">{paso.titulo}</h3>
                      <p className="mt-4 leading-relaxed text-white/60">{paso.detalle}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
