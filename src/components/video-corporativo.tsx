import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";

import coverVideo from "@/assets/cover-video.jpg";
import { useLang } from "@/lib/i18n";

/** Video corporativo en YouTube. */
const YOUTUBE_ID = "DIX-ObqYLiM";

/**
 * Video corporativo a sangre con marco que se abre al hacer scroll.
 *
 * Usa fachada: hasta que el usuario pulsa play solo se muestra el póster, así
 * el home no carga el reproductor de YouTube (~1 MB de JS + cookies) de entrada.
 */
export function VideoCorporativo() {
  const ref = useRef<HTMLDivElement>(null);
  const [activo, setActivo] = useState(false);
  const { t } = useLang();
  const reducirMovimiento = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const escala = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  const radio = useTransform(scrollYProgress, [0, 0.5], ["3rem", "1.5rem"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const etiqueta = t(
    "Video corporativo de Mármoles de Honduras",
    "Mármoles de Honduras corporate video",
  );

  return (
    <section ref={ref} className="mt-20 md:mt-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-primary" />
            <p className="eyebrow text-primary">{t("La casa por dentro", "Inside the house")}</p>
            </div>
            <h2 className="mt-5 max-w-xl font-display text-3xl font-extrabold leading-[1.02] sm:text-5xl">
            {t("Medio siglo de oficio, en movimiento", "Half a century of craft, in motion")}
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          {t(
            "Un recorrido por la planta, el taller de escultura y las obras donde la piedra termina su viaje.",
            "A walk through the plant, the sculpture workshop and the projects where the stone ends its journey.",
          )}
          </p>
        </div>
      </div>

      <motion.div
        style={{ scale: escala, borderRadius: radio }}
        className="relative mx-auto mt-10 w-[min(100%,90rem)] overflow-hidden bg-ink"
      >
        {activo ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={etiqueta}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="h-[52vh] min-h-[320px] w-full border-0 md:h-[78vh]"
          />
        ) : (
          <>
            <motion.img
              style={{ y }}
              src={coverVideo}
              alt=""
              aria-hidden="true"
              className="h-[52vh] min-h-[320px] w-full scale-110 object-cover md:h-[78vh]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/25"
            />
            {/*
             * Halo radial detrás del botón. Sin esto, el control y la etiqueta
             * en blanco se pierden cuando el póster es claro (losa pulida,
             * cantera de mármol blanco). Garantiza contraste con cualquier foto.
             */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--ink) 62%, transparent) 0%, color-mix(in oklab, var(--ink) 30%, transparent) 22%, transparent 45%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <div className="flex flex-col items-center gap-5">
                <button
                  type="button"
                  onClick={() => setActivo(true)}
                  aria-label={t("Reproducir video", "Play video")}
                  className="group relative grid h-20 w-20 place-items-center rounded-full bg-background/95 text-foreground shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-105 md:h-24 md:w-24"
                >
                  {/* Ondas que laten hacia afuera: señal continua de "esto se reproduce". */}
                  {!reducirMovimiento &&
                    [0, 1].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-full border border-background/70"
                        animate={{ scale: [1, 1.95], opacity: [0.55, 0] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          delay: i * 1.4,
                          ease: "easeOut",
                        }}
                      />
                    ))}

                  {/* Al hover el trazo recorre el círculo, como una barra de progreso. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    className="pointer-events-none absolute -inset-1.5 -rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="47"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      className="text-background [stroke-dasharray:295] [stroke-dashoffset:295] transition-[stroke-dashoffset] duration-[900ms] ease-out group-hover:[stroke-dashoffset:0]"
                    />
                  </svg>

                  <Play className="ml-0.5 h-6 w-6 transition-transform duration-500 group-hover:translate-x-1 md:h-7 md:w-7" />
                </button>

                <p
                  className="eyebrow text-background"
                  style={{ textShadow: "0 2px 12px color-mix(in oklab, var(--ink) 70%, transparent)" }}
                >
                  {t("Ver video", "Watch video")}
                </p>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}
