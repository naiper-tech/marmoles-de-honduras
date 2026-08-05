import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import interiorLiving from "@/assets/interior-living.jpg";
import workshop from "@/assets/workshop.jpg";
import { useLang } from "@/lib/i18n";

function Palabra({
  palabra,
  progress,
  range,
}: {
  palabra: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.28em] inline-block">
      {palabra}
    </motion.span>
  );
}

/** Declaración de casa: texto que se enciende palabra por palabra + placa de piedra en paralaje. */
export function Declaracion() {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });

  const mediaRef = useRef<HTMLDivElement>(null);
  const media = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const yA = useTransform(media.scrollYProgress, [0, 1], ["6%", "-10%"]);
  const yB = useTransform(media.scrollYProgress, [0, 1], ["-8%", "12%"]);

  const texto = t(
    "Un bloque tarda millones de años en formarse. Nosotros nos tomamos el tiempo de leer su veta, cortarla en el sentido correcto y devolverla convertida en el centro de un espacio.",
    "A block takes millions of years to form. We take the time to read its veining, cut it in the right direction, and turn it into the centerpiece of a space.",
  );
  const palabras = texto.split(" ");

  const tarjetas: [string, string][] = [
    [
      t("Selección", "Selection"),
      t("Elegimos el bloque en cantera, no un catálogo.", "We choose the block at the quarry, not from a catalog."),
    ],
    [
      t("Planta propia", "Own plant"),
      t("Corte, calibrado y pulido bajo un mismo techo.", "Cutting, calibrating, and polishing under one roof."),
    ],
    [
      t("Montaje", "Installation"),
      t("Cuadrilla propia, veta continua, junta mínima.", "Our own crew, continuous veining, minimal joints."),
    ],
  ];

  return (
    <section className="relative mx-auto mt-20 max-w-7xl px-5 md:mt-32 md:px-8">
      <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
        {/* texto */}
        <div ref={ref}>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-primary" />
            <p className="eyebrow text-primary">{t("Casa fundada en 1972", "House founded in 1972")}</p>
          </div>
          <p className="mt-9 max-w-2xl font-display text-[1.8rem] font-extrabold leading-[1.14] tracking-tight sm:text-[2.6rem] lg:text-[3.1rem]">
            {palabras.map((p, i) => (
              <Palabra
                key={`${p}-${i}`}
                palabra={p}
                progress={scrollYProgress}
                range={[i / palabras.length, (i + 1.6) / palabras.length]}
              />
            ))}
          </p>

          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-border sm:grid-cols-3">
            {tarjetas.map(([titulo, d]) => (
              <div key={titulo} className="bg-background p-6">
                <p className="font-display text-sm font-bold uppercase tracking-wide">{titulo}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* placas */}
        <div ref={mediaRef} className="relative hidden lg:block">
          <motion.div
            style={{ y: yA }}
            className="absolute right-0 top-0 w-[78%] overflow-hidden rounded-[2rem]"
          >
            <img
              src={interiorLiving}
              alt={t("Muro de mármol crema en una sala de estar", "Cream marble wall in a living room")}
              loading="lazy"
              width={1200}
              height={1500}
              className="aspect-[4/5] w-full object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: yB }}
            className="absolute bottom-[-2rem] left-0 w-[52%] overflow-hidden rounded-[1.5rem] ring-8 ring-background"
          >
            <img
              src={workshop}
              alt={t("Artesano puliendo una losa", "Artisan polishing a slab")}
              loading="lazy"
              width={900}
              height={900}
              className="aspect-square w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
