import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import poster from "@/assets/proceso-corte-bloque.jpg";
import { useLang } from "@/lib/i18n";
import { Emerge } from "./movimiento";

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

  // React no escribe el atributo `muted` en el HTML del servidor, y sin él varios
  // navegadores bloquean el autoplay. Se fuerza al montar.
  useEffect(() => {
    const loop = loopRef.current;
    if (!loop) return;
    // La fuente se asigna en el cliente para elegir peso según pantalla (12 MB → 4-6 MB)
    // y para que el póster se vea de inmediato mientras el video carga.
    loop.src = window.innerWidth < 768 ? "/videos/hero-taller-sd.mp4" : "/videos/hero-taller-hd.mp4";
    loop.muted = true;
    void loop.play().catch(() => {});
  }, []);

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
        <video
          ref={loopRef}
          className="h-full w-full object-cover"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
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
