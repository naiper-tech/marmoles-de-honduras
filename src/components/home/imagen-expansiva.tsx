import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Avance normalizado 0–1 de `p` dentro del tramo [desde, hasta]. */
export const tramo = (p: number, desde: number, hasta: number) =>
  Math.min(1, Math.max(0, (p - desde) / (hasta - desde)));

/** Curva de entrada y salida suave para valores ligados al scroll. */
export const suavizar = (a: number) => (a < 0.5 ? 4 * a ** 3 : 1 - (-2 * a + 2) ** 3 / 2);

/**
 * Foto que parte como ventana y se abre a pantalla completa con el scroll.
 *
 * Los valores se derivan con funciones a propósito: si se mapea scrollYProgress directo
 * a clip-path, Chrome lo acelera con ScrollTimeline nativo y calcula mal el rango
 * (la foto se abre a destiempo y vuelve a cerrarse).
 */
export function ImagenExpansiva({
  imagen,
  alt,
  etiqueta,
  frase,
  className = "",
}: {
  imagen: string;
  alt: string;
  etiqueta: string;
  frase: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const apertura = useTransform(() => suavizar(tramo(scrollYProgress.get(), 0.15, 0.78)));
  const recorte = useTransform(() => {
    const cierre = 1 - apertura.get();
    return `inset(${16 * cierre}% ${26 * cierre}% ${16 * cierre}% ${26 * cierre}%)`;
  });
  const escala = useTransform(() => 1.3 - 0.3 * apertura.get());
  const revelado = useTransform(() => tramo(scrollYProgress.get(), 0.78, 0.96));
  const opacidadTexto = useTransform(() => revelado.get());
  const subirTexto = useTransform(() => 40 * (1 - revelado.get()));

  return (
    <div ref={ref} className={`relative h-[190vh] ${className}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div style={{ clipPath: recorte }} className="absolute inset-0 bg-mdh-tinta">
          <motion.img src={imagen} alt={alt} style={{ scale: escala }} className="h-full w-full object-cover" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,24,25,0.85)_0%,rgba(23,24,25,0.1)_55%)]"
          />
          <motion.div
            style={{ opacity: opacidadTexto, y: subirTexto }}
            className="absolute inset-x-0 bottom-0 mx-auto max-w-[1440px] px-6 pb-14 text-white md:px-10 md:pb-20"
          >
            <p className="mdh-label text-white/70">{etiqueta}</p>
            <p className="mt-5 max-w-3xl text-[clamp(1.75rem,3.6vw,3.5rem)] font-light leading-[1.1] tracking-[-0.015em]">
              {frase}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
