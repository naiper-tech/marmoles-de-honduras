import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { proceso } from "@/lib/site-data";

const ease = [0.16, 1, 0.3, 1] as const;

/** Línea de proceso que se dibuja con el scroll y revela cada etapa en secuencia. */
export function ProcesoTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.4,
  });
  const height = useTransform(progress, [0, 1], ["0%", "100%"]);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* riel vertical (móvil) */}
      <div className="absolute left-[15px] top-2 bottom-2 w-px bg-border md:hidden">
        <motion.div style={{ height }} className="w-px origin-top bg-primary" />
      </div>
      {/* riel horizontal (desktop) */}
      <div className="absolute inset-x-0 top-[15px] hidden h-px bg-border md:block">
        <motion.div style={{ width }} className="h-px origin-left bg-primary" />
      </div>

      <div className="grid gap-10 md:grid-cols-4 md:gap-6">
        {proceso.map((p, i) => (
          <motion.div
            key={p.paso}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
            className="relative pl-12 md:pl-0"
          >
            <motion.span
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.5, ease, delay: i * 0.12 + 0.1 }}
              className="absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-primary bg-background font-display text-xs font-bold text-primary md:relative md:mb-7"
            >
              {p.paso}
            </motion.span>
            <h3 className="font-display text-lg font-bold md:mt-0">{p.titulo}</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {p.detalle}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
