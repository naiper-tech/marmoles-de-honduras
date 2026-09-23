import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

import { usePunteroFino } from "./efectos";
import { EASE } from "./movimiento";

type Estado = "oculto" | "normal" | "enlace" | "texto" | "ver";

const INTERACTIVOS =
  'a, button, [role="button"], label, summary, select, [data-cursor="enlace"], [tabindex]:not([tabindex="-1"])';

/**
 * Cursor de marca, solo con mouse: un punto que sigue al puntero exacto y un aro
 * que llega con un leve retraso. Sobre enlaces y botones el aro se abre; en campos
 * de texto vuelve el cursor del sistema; en tarjetas de proyecto cede el lugar al
 * círculo "Ver". Con `mix-blend-difference` se lee sobre fondos claros y oscuros.
 */
export function CursorPremium() {
  const fino = usePunteroFino();
  const reducido = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const resorte = { stiffness: 320, damping: 30, mass: 0.55 };
  const ax = useSpring(x, resorte);
  const ay = useSpring(y, resorte);
  const [estado, setEstado] = useState<Estado>("oculto");
  const [presionado, setPresionado] = useState(false);

  useEffect(() => {
    if (!fino) return;
    const raiz = document.documentElement;
    raiz.classList.add("mdh-cursor");

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      if (!el?.closest) return;
      if (el.closest('[data-cursor="ver"]')) setEstado("ver");
      else if (el.closest('input, textarea, [contenteditable="true"]')) setEstado("texto");
      else if (el.closest(INTERACTIVOS)) setEstado("enlace");
      else setEstado("normal");
    };
    const salir = () => setEstado("oculto");
    const abajo = () => setPresionado(true);
    const arriba = () => setPresionado(false);

    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerdown", abajo);
    window.addEventListener("pointerup", arriba);
    raiz.addEventListener("mouseleave", salir);
    return () => {
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerdown", abajo);
      window.removeEventListener("pointerup", arriba);
      raiz.removeEventListener("mouseleave", salir);
      raiz.classList.remove("mdh-cursor");
    };
  }, [fino, x, y]);

  if (!fino) return null;

  const visible = estado === "normal" || estado === "enlace";
  const escalaAro = (estado === "enlace" ? 1.7 : 1) * (presionado ? 0.8 : 1);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: reducido ? x : ax, y: reducido ? y : ay }}
      >
        <motion.span
          className="block h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
          animate={{
            scale: visible ? escalaAro : 0.4,
            opacity: visible ? (estado === "enlace" ? 1 : 0.7) : 0,
            backgroundColor: estado === "enlace" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
          }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x, y }}>
        <motion.span
          className="block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          animate={{ scale: estado === "normal" ? 1 : 0, opacity: estado === "normal" ? 1 : 0 }}
          transition={{ duration: 0.25, ease: EASE }}
        />
      </motion.div>
    </div>
  );
}
