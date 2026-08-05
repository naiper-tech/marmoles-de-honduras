import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

import { proceso } from "@/lib/site-data";
import { loc, useLang } from "@/lib/i18n";
import { useIsMobile } from "@/hooks/use-mobile";
import procesoCorteBloque from "@/assets/proceso-corte-bloque.jpg";
import workshop from "@/assets/workshop.jpg";
import procesoCorteLosa from "@/assets/proceso-corte-losa.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

const ease = [0.16, 1, 0.3, 1] as const;
const imagenes = [procesoCorteBloque, procesoCorteLosa, workshop, interiorLiving];

/** Proceso en scroll horizontal anclado: el bloque se fija y las etapas desfilan. */
export function ProcesoHorizontal() {
  const ref = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [distancia, setDistancia] = useState(0);
  const isMobile = useIsMobile();
  const { t, lang } = useLang();
  const pasos = proceso.map((p) => loc(p, lang));
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });
  const x = useTransform(progress, [0, 1], [0, -distancia]);
  const barra = useTransform(progress, [0, 1], ["6%", "100%"]);

  useEffect(() => {
    const medir = () => {
      const row = rowRef.current;
      if (!row) return;
      const extra = Math.max(0, row.scrollWidth - window.innerWidth + 32);
      setDistancia(extra);
    };
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [isMobile]);

  const encabezado = (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-4">
          <span className="h-px w-10 bg-primary" />
          <p className="eyebrow text-primary">{t("Cómo trabajamos", "How we work")}</p>
        </div>
        <h2 className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.02] sm:text-6xl">
          {t("Cuatro etapas, cero improvisación", "Four stages, zero improvisation")}
        </h2>
      </div>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        {t(
          "Del bloque en cantera a la última junta sellada, todo con equipo propio.",
          "From the quarry block to the last sealed joint, all with our own team.",
        )}
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <section className="mx-auto max-w-7xl px-5 py-16">
        {encabezado}
        <div className="mt-10 space-y-5">
          {pasos.map((p, i) => (
            <Tarjeta key={p.paso} paso={p} img={imagenes[i]} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-7xl px-8">{encabezado}</div>

        <motion.div
          ref={rowRef}
          style={{ x }}
          className="mt-12 flex w-max gap-6 pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-8"
        >
          {pasos.map((p, i) => (
            <motion.div
              key={p.paso}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="w-[46vw] shrink-0 lg:w-[38vw]"
            >
              <Tarjeta paso={p} img={imagenes[i]} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-7xl px-8">
          <div className="h-px w-full bg-border">
            <motion.div style={{ width: barra }} className="h-px bg-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Tarjeta({
  paso,
  img,
}: {
  paso: (typeof proceso)[number];
  img: string;
}) {
  return (
    <article className="group relative isolate overflow-hidden rounded-[1.75rem] border border-border bg-card">
      <div className="overflow-hidden">
        <img
          src={img}
          alt={paso.titulo}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex items-start gap-5 p-6 md:p-8">
        <span className="font-display text-4xl font-extrabold leading-none text-primary/40 tabular-nums">
          {paso.paso}
        </span>
        <div>
          <h3 className="font-display text-xl font-bold md:text-2xl">{paso.titulo}</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {paso.detalle}
          </p>
        </div>
      </div>
    </article>
  );
}