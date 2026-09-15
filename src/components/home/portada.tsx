import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";

import poster from "@/assets/proceso-corte-bloque.jpg";
import { useLang } from "@/lib/i18n";
import { EASE, Emerge } from "./movimiento";
import { VideoModal } from "./video-modal";

/**
 * Portada a sangre con video de planta. Sin texto sobre el video más allá de lo
 * esencial: la imagen hace el trabajo, como en las referencias.
 *
 * PROVISIONAL: el loop es material de apoyo; se reemplaza por el MP4 del video
 * institucional que proyectan en tienda en cuanto el cliente lo envíe.
 */
export function Portada() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const loopRef = useRef<HTMLVideoElement>(null);
  const [video, setVideo] = useState(false);

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
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-12 md:px-10 md:pb-16"
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
                ? ["Leading the natural", "stone industry"]
                : ["Liderando la industria", "de la piedra natural"]
            }
          />
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.1, ease: EASE }}
          className="mt-12 flex flex-col gap-8 border-t border-white/20 pt-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="max-w-md text-[0.95rem] leading-relaxed text-white/75">
            {t(
              "De la extracción en canteras propias al producto terminado. Fabricamos para Honduras, Estados Unidos, Centroamérica y el Caribe.",
              "From extraction at our own quarries to the finished product. We fabricate for Honduras, the United States, Central America and the Caribbean.",
            )}
          </p>

          <button
            type="button"
            onClick={() => setVideo(true)}
            className="group flex items-center gap-4 self-start md:self-auto"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/40 transition-colors duration-500 group-hover:border-white group-hover:bg-white group-hover:text-mdh-tinta">
              <Play className="ml-0.5 h-4 w-4" strokeWidth={1.5} fill="currentColor" />
            </span>
            <span className="mdh-label">{t("Ver video institucional", "Watch the film")}</span>
          </button>
        </motion.div>
      </motion.div>

      <VideoModal abierto={video} alCerrar={() => setVideo(false)} />
    </section>
  );
}
