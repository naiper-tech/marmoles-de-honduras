import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export type Capitulo = {
  anio: string;
  titulo: string;
  detalle: string;
  imagen: string;
};

/**
 * Historia en dos columnas: la imagen queda fija y cambia de escala con el
 * scroll mientras los capítulos se revelan uno a uno.
 */
export function HistoriaScroll({ capitulos }: { capitulos: Capitulo[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.4 });
  const scaleLine = useTransform(p, [0, 1], [0, 1]);
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(
      capitulos.length - 1,
      Math.max(0, Math.floor(v * capitulos.length + 0.15)),
    );
    setActive(i);
  });

  return (
    <div
      ref={ref}
      className="relative grid items-start gap-12 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:gap-16"
    >
      <div className="hidden h-full md:block">
        <div className="sticky top-28">
          <div className="relative overflow-hidden rounded-[2rem]">
            {capitulos.map((c, i) => (
              <img
                key={c.anio}
                src={c.imagen}
                alt=""
                aria-hidden
                loading="lazy"
                className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"
                }`}
              />
            ))}
            <div className="aspect-[4/5] w-full" />
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="eyebrow text-muted-foreground">
              {capitulos[active].anio}
            </p>
            <p className="eyebrow text-muted-foreground">
              {String(active + 1).padStart(2, "0")} / {String(capitulos.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-3 h-px w-full bg-border">
            <motion.div style={{ scaleX: scaleLine }} className="h-px origin-left bg-primary" />
          </div>
        </div>
      </div>

      <div className="space-y-16 md:space-y-32 md:py-10">
        {capitulos.map((c, i) => (
          <motion.article
            key={c.anio}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.75, ease }}
          >
            <div className="flex items-baseline gap-5">
              <span className="font-display text-5xl font-extrabold text-primary/25 sm:text-7xl">
                {c.anio}
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="eyebrow text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <img
              src={c.imagen}
              alt={c.titulo}
              loading="lazy"
              className="mt-5 aspect-[16/10] w-full rounded-2xl object-cover md:hidden"
            />
            <h3 className="mt-5 font-display text-2xl font-bold sm:text-3xl">{c.titulo}</h3>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
              {c.detalle}
            </p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}