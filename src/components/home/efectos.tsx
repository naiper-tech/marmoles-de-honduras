import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { EASE } from "./movimiento";

/** Coincidencia de una media query, evaluada en el cliente. */
export function useMedia(consulta: string) {
  const [coincide, setCoincide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(consulta);
    const actualizar = () => setCoincide(mq.matches);
    actualizar();
    mq.addEventListener("change", actualizar);
    return () => mq.removeEventListener("change", actualizar);
  }, [consulta]);
  return coincide;
}

/** Solo los dispositivos con mouse reciben efectos que dependen del cursor. */
export const usePunteroFino = () => useMedia("(hover: hover) and (pointer: fine)");

/** Elemento que se deja atraer por el cursor y regresa con un resorte al salir. */
export function Magnetico({
  children,
  fuerza = 0.3,
  className = "",
}: {
  children: ReactNode;
  fuerza?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const resorte = { stiffness: 170, damping: 15, mass: 0.35 };
  const sx = useSpring(x, resorte);
  const sy = useSpring(y, resorte);

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * fuerza);
        y.set((e.clientY - (r.top + r.height / 2)) * fuerza);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Párrafo cuyas palabras se encienden una a una conforme avanza el scroll. */
export function TextoPorScroll({ texto, className }: { texto: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducir = Boolean(useReducedMotion());
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const palabras = texto.split(" ");

  return (
    <p ref={ref} className={className}>
      {palabras.map((palabra, i) => (
        <Palabra
          key={`${palabra}-${i}`}
          progreso={scrollYProgress}
          desde={i / palabras.length}
          hasta={(i + 1) / palabras.length}
          fija={reducir}
        >
          {palabra}
        </Palabra>
      ))}
    </p>
  );
}

function Palabra({
  children,
  progreso,
  desde,
  hasta,
  fija,
}: {
  children: string;
  progreso: MotionValue<number>;
  desde: number;
  hasta: number;
  fija: boolean;
}) {
  const opacidad = useTransform(progreso, [desde, hasta], [0.15, 1]);
  return (
    <>
      <motion.span style={fija ? undefined : { opacity: opacidad }}>{children}</motion.span>{" "}
    </>
  );
}

/** Número que cuenta hasta su valor la primera vez que entra en pantalla. */
export function Contador({ hasta, duracion = 2.2 }: { hasta: number; duracion?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const enVista = useInView(ref, { once: true, amount: 0.6 });
  const reducir = useReducedMotion();
  const [valor, setValor] = useState(hasta);

  useEffect(() => {
    if (!enVista || reducir) return;
    const control = animate(0, hasta, {
      duration: duracion,
      ease: [...EASE],
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => control.stop();
  }, [enVista, reducir, hasta, duracion]);

  return (
    <span ref={ref} className="tabular-nums">
      {valor}
    </span>
  );
}

/** Cinta que se desplaza sin fin. Se detiene si el usuario pide menos movimiento. */
export function Marquesina({
  children,
  duracion = 40,
  className = "",
}: {
  children: ReactNode;
  duracion?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: duracion, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
