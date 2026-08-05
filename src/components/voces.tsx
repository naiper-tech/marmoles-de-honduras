import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

import { useLang } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

const voces = [
  {
    texto:
      "Coordinaron un edificio completo sin una sola diferencia de tono entre pisos. Eso no lo logra cualquiera.",
    textoEn:
      "They coordinated an entire building without a single tone difference between floors. Not everyone can do that.",
    autor: "Dirección de obra",
    autorEn: "Site management",
    rol: "Torre residencial · Tegucigalpa",
    rolEn: "Residential tower · Tegucigalpa",
  },
  {
    texto:
      "Nos entregaron el muro de recepción con la veta continua exacta que habíamos modelado. Cero sorpresas.",
    textoEn:
      "They delivered the reception wall with exactly the continuous vein we had modeled. Zero surprises.",
    autor: "Estudio de arquitectura",
    autorEn: "Architecture studio",
    rol: "Hotelería · Honduras",
    rolEn: "Hospitality · Honduras",
  },
  {
    texto:
      "Trabajaron de noche, con el templo funcionando, y no perdimos un solo día de actividad.",
    textoEn:
      "They worked at night, with the church still open, and we did not lose a single day of activity.",
    autor: "Comité de obra",
    autorEn: "Project committee",
    rol: "Proyecto institucional",
    rolEn: "Institutional project",
  },
];

/** Testimonios en tarjeta grande con navegación por flechas. */
export function Voces() {
  const [[i, dir], setEstado] = useState<[number, number]>([0, 0]);
  const { t, lang } = useLang();
  const en = lang === "en";
  const v = voces[i];

  const mover = (d: number) =>
    setEstado(([prev]) => [(prev + d + voces.length) % voces.length, d]);

  return (
    <section className="mt-20 border-y border-border bg-secondary/40 py-16 md:mt-32 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-primary" />
            <p className="eyebrow text-primary">{t("En sus palabras", "In their words")}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-display text-sm tabular-nums text-muted-foreground">
              0{i + 1} <span className="text-muted-foreground/50">/ 0{voces.length}</span>
            </span>
            <button
              type="button"
              onClick={() => mover(-1)}
              aria-label={t("Testimonio anterior", "Previous testimonial")}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => mover(1)}
              aria-label={t("Siguiente testimonio", "Next testimonial")}
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="relative mt-10 min-h-[22rem] md:min-h-[24rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.blockquote
              key={v.autor}
              custom={dir}
              initial={{ opacity: 0, x: dir >= 0 ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir >= 0 ? -60 : 60 }}
              transition={{ duration: 0.55, ease }}
              className="relative flex min-h-[22rem] flex-col justify-between rounded-[2rem] border border-border bg-card p-8 md:min-h-[24rem] md:p-14"
            >
              <Quote className="h-8 w-8 text-primary/40" />
              <p className="mt-8 max-w-4xl font-display text-2xl font-semibold leading-[1.18] sm:text-4xl lg:text-[2.9rem]">
                {en ? v.textoEn : v.texto}
              </p>
              <footer className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6">
                <span className="h-px w-10 bg-primary" />
                <span className="text-sm font-medium">{en ? v.autorEn : v.autor}</span>
                <span className="text-xs text-muted-foreground">{en ? v.rolEn : v.rol}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
