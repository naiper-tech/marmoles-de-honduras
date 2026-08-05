import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

export type IndexRow = {
  titulo: string;
  detalle: string;
  imagen: string;
  meta?: string;
};

/**
 * Índice editorial numerado: al pasar el cursor sobre una fila
 * aparece una lámina de la piedra siguiendo el puntero.
 */
export function HoverIndexList({ rows }: { rows: IndexRow[] }) {
  const [active, setActive] = useState<number | null>(null);
  const zoneRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.4 });

  return (
    <div
      ref={zoneRef}
      className="relative"
      onMouseMove={(e) => {
        const r = zoneRef.current?.getBoundingClientRect();
        if (!r) return;
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      onMouseLeave={() => setActive(null)}
    >
      <div className="border-t border-border">
        {rows.map((row, i) => (
          <motion.div
            key={row.titulo}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease, delay: i * 0.06 }}
            onMouseEnter={() => setActive(i)}
            className="group relative border-b border-border"
          >
            <span className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
            <div className="relative grid gap-3 py-7 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-9">
              <span className="eyebrow text-muted-foreground transition-colors duration-500 group-hover:text-background/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight transition-all duration-500 group-hover:text-background sm:text-4xl md:group-hover:translate-x-2">
                {row.titulo}
              </h3>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-background/70">
                {row.detalle}
                {row.meta ? (
                  <span className="mt-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground/80 group-hover:text-background/50">
                    {row.meta}
                  </span>
                ) : null}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            style={{ x: sx, y: sy }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.35, ease }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
          >
            <img
              src={rows[active].imagen}
              alt=""
              aria-hidden
              className="-ml-32 -mt-24 h-64 w-[17rem] rounded-2xl object-cover shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}