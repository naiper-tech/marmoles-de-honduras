import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { EASE, Emerge } from "./movimiento";

/**
 * Portada de las páginas interiores: foto a sangre con parallax y titular que se
 * retira al hacer scroll. Marca `data-portada` para que el encabezado sepa hasta
 * dónde mantenerse transparente.
 */
export function PortadaPagina({
  numero,
  etiqueta,
  lineas,
  texto,
  imagen,
  alt = "",
}: {
  numero: string;
  etiqueta: string;
  lineas: string[];
  texto?: string;
  imagen: string;
  alt?: string;
}) {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Derivados con funciones: evita la aceleración nativa de Chrome sobre transform/opacity.
  const y = useTransform(() => `${scrollYProgress.get() * 24}%`);
  const escala = useTransform(() => 1.06 + scrollYProgress.get() * 0.12);
  const opacidad = useTransform(() => 1 - Math.min(1, scrollYProgress.get() * 1.7));
  const subir = useTransform(() => scrollYProgress.get() * -80);

  return (
    <section
      ref={ref}
      data-portada
      className="relative flex h-[90svh] min-h-[620px] items-end overflow-hidden bg-mdh-tinta text-white"
    >
      <motion.div style={{ y, scale: escala }} className="absolute inset-0">
        <motion.img
          src={imagen}
          alt={alt}
          initial={{ scale: 1.14 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: EASE }}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,24,25,0.65)_0%,rgba(23,24,25,0.15)_38%,rgba(23,24,25,0.9)_100%)]"
      />

      <motion.div
        style={{ opacity: opacidad, y: subir }}
        className="relative mx-auto w-full max-w-[1440px] px-6 pb-12 md:px-10 md:pb-16"
      >
        <div className="mdh-label flex items-center gap-4 text-white/75">
          <span>{numero}</span>
          <motion.span
            aria-hidden="true"
            className="block h-px w-12 origin-left bg-white/60"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          />
          <span>{etiqueta}</span>
        </div>

        <h1 className="mt-8 text-[clamp(2.5rem,7.2vw,7.25rem)] font-light leading-[0.98] tracking-[-0.03em]">
          <Emerge key={lineas.join("|")} alCargar retraso={0.35} lineas={lineas} />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.1, ease: EASE }}
          className="mt-10 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between"
        >
          {texto && <p className="max-w-xl text-lg leading-relaxed text-white/75">{texto}</p>}
          <span className="mdh-label flex items-center gap-3 text-white/60">
            {t("Desliza", "Scroll")}
            <motion.span
              aria-hidden="true"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" strokeWidth={1.25} />
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}
