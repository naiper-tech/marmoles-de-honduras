import { motion } from "motion/react";

import { piezas } from "@/lib/site-data";
import { loc, useLang } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

/** Grid editorial de piezas especiales a medida. */
export function PiezasGrid({ limit }: { limit?: number }) {
  const { lang } = useLang();
  const items = (limit ? piezas.slice(0, limit) : piezas).map((p) => loc(p, lang));
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((p, i) => (
        <motion.article
          key={p.slug}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease, delay: (i % 4) * 0.08 }}
          className="group relative overflow-hidden rounded-3xl bg-ink"
        >
          <img
            src={p.imagen}
            alt={p.nombre}
            loading="lazy"
            width={900}
            height={1100}
            className="aspect-[4/5] w-full object-cover opacity-90 transition-transform duration-[1.1s] group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-5 text-background">
            <h3 className="font-display text-lg font-bold leading-tight">
              {p.nombre}
            </h3>
            <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-background/75 opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
              {p.detalle}
            </p>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
