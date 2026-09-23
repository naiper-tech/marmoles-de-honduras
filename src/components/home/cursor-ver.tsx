import { useState, type PointerEvent } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { usePunteroFino } from "./efectos";
import { EASE } from "./movimiento";

/**
 * Cursor circular "Ver" para tarjetas de proyecto. Devuelve los eventos para
 * esparcir en cada tarjeta; en táctil los eventos quedan vacíos.
 */
export function useCursorVer() {
  const fino = usePunteroFino();
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const resorte = { stiffness: 380, damping: 32, mass: 0.5 };
  const sx = useSpring(cx, resorte);
  const sy = useSpring(cy, resorte);
  const x = useTransform(() => sx.get() - 48);
  const y = useTransform(() => sy.get() - 48);
  const [activo, setActivo] = useState(false);

  const mover = (e: PointerEvent) => {
    cx.set(e.clientX);
    cy.set(e.clientY);
  };

  const eventos = fino
    ? {
        "data-cursor": "ver",
        onPointerEnter: (e: PointerEvent) => {
          // Aparece donde está el mouse, sin viajar desde la última posición.
          if (!activo) {
            sx.jump(e.clientX);
            sy.jump(e.clientY);
          }
          mover(e);
          setActivo(true);
        },
        onPointerMove: mover,
        onPointerLeave: () => setActivo(false),
      }
    : {};

  return { fino, activo, apagar: () => setActivo(false), eventos, x, y };
}

export function CursorVer({
  cursor,
  etiqueta,
  visible = true,
}: {
  cursor: ReturnType<typeof useCursorVer>;
  etiqueta: string;
  visible?: boolean;
}) {
  if (!cursor.fino) return null;
  return (
    <AnimatePresence>
      {cursor.activo && visible && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-40 grid h-24 w-24 place-items-center rounded-full bg-mdh-tinta text-white"
          style={{ x: cursor.x, y: cursor.y }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <span className="mdh-label">{etiqueta}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
