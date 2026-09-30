import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import posterMovil from "@/assets/portada-taller-movil.jpg?w=540&format=webp";
import poster from "@/assets/portada-taller.jpg?w=1920&quality=70&format=webp";
import { useLang } from "@/lib/i18n";
import { Emerge } from "./movimiento";
import { useVideoDiferido } from "./video-diferido";

/**
 * Portada a sangre con video de planta. Sin texto sobre el video más allá de lo
 * esencial: la imagen hace el trabajo, como en las referencias. El video corre de
 * fondo y sin voz, así que no lleva botón de reproducción (ronda 1, #16).
 *
 * PROVISIONAL: el loop es material de apoyo; se reemplaza por el MP4 del video
 * institucional que proyectan en tienda en cuanto el cliente lo envíe.
 */
export function Portada() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);

  // Móvil: recorte vertical de 350 KB. Escritorio: 1080p de 1.7 MB.
  useVideoDiferido(loopRef, {
    movil: "/videos/taller-movil.mp4",
    escritorio: "/videos/taller-1080.mp4",
  });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const escala = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacidad = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      id="inicio"
      data-portada
      ref={ref}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-mdh-tinta text-white"
    >
      <motion.div style={{ scale: escala }} className="absolute inset-0">
        {/* El póster es el primer cuadro del video: al arrancar no hay salto. Va como
            <picture> y no como `poster` para que el móvil baje su recorte vertical. */}
        <picture>
          <source media="(max-width: 767px)" srcSet={posterMovil} />
          <img
            src={poster}
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            // 1 px más corta que la pantalla: Chrome descarta como "fondo" las imágenes
            // que la cubren entera y el LCP caía en el logo de la cortina. Invisible
            // sobre el fondo tinta de la sección.
            className="absolute inset-x-0 top-0 h-[calc(100%-1px)] w-full object-cover"
          />
        </picture>
        <video
          ref={loopRef}
          className="absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,24,25,0.6)_0%,rgba(23,24,25,0.12)_32%,rgba(23,24,25,0.2)_58%,rgba(23,24,25,0.88)_100%)]"
      />

      <motion.div
        style={{ opacity: opacidad }}
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="mdh-label text-white/75"
        >
          {t("Honduras · Desde 1970", "Honduras · Since 1970")}
        </motion.p>

        <h1 className="mt-6 text-[clamp(2rem,6.4vw,6.25rem)] font-light leading-[1.02] tracking-[-0.02em]">
          <Emerge
            key={lang}
            alCargar
            retraso={0.45}
            lineas={
              lang === "en"
                ? ["More than 55 years", "carving our legacy."]
                : ["Más de 55 años", "tallando nuestro legado."]
            }
          />
        </h1>
      </motion.div>
    </section>
  );
}
