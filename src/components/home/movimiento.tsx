import { motion } from "motion/react";
import type { ReactNode } from "react";

/** Curva lenta y asentada: el lujo no tiene prisa. */
export const EASE = [0.22, 1, 0.36, 1] as const;

export function Aparecer({
  children,
  className,
  retraso = 0,
  y = 32,
}: {
  children: ReactNode;
  className?: string;
  retraso?: number;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE, delay: retraso }}
    >
      {children}
    </motion.div>
  );
}

/** Titular que emerge línea por línea desde una máscara. */
export function Emerge({
  lineas,
  className,
  retraso = 0,
  alCargar = false,
}: {
  lineas: string[];
  className?: string;
  retraso?: number;
  alCargar?: boolean;
}) {
  return (
    <motion.span
      className={`block ${className ?? ""}`}
      initial="oculto"
      animate={alCargar ? "visible" : undefined}
      whileInView={alCargar ? undefined : "visible"}
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        oculto: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: retraso } },
      }}
    >
      {lineas.map((linea, i) => (
        <span key={`${linea}-${i}`} className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="block"
            variants={{
              oculto: { y: "105%" },
              visible: { y: "0%", transition: { duration: 1.2, ease: EASE } },
            }}
          >
            {linea}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/** Imagen que se descubre con una cortina y se asienta desde un leve acercamiento. */
export function ImagenRevelada({
  src,
  alt,
  className,
  imgClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(10% 0% 10% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.4, ease: EASE }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={imgClassName}
        initial={{ scale: 1.14 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.8, ease: EASE }}
      />
    </motion.div>
  );
}
