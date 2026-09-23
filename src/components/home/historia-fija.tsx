import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

import artesanoCorte from "@/assets/artesano-corte.jpg";
import cncFresado from "@/assets/cnc-fresado.jpg";
import rosetones from "@/assets/rosetones.jpg";
import artesanoTallado from "@/assets/artesano-tallado.jpg";
import sierraColumna from "@/assets/sierra-columna.jpg";
import pulidoMarmolNegro from "@/assets/pulido-marmol-negro.jpg";
import mesaVeta from "@/assets/mesa-veta.jpg";
import artesanoLijado from "@/assets/artesano-lijado.jpg";
import { useLang } from "@/lib/i18n";
import { useMedia } from "./efectos";
import { tramo } from "./imagen-expansiva";

type Lugar = { x: string; y: string; w: string; proporcion: string };

/**
 * Posiciones en vw/vh alrededor del centro, donde vive la frase. En escritorio caben
 * ocho fotos; en móvil seis, arriba y abajo del texto.
 */
const FOTOS: {
  src: string;
  alt: [string, string];
  entra: number;
  escritorio: Lugar;
  movil?: Lugar;
}[] = [
  {
    src: artesanoCorte,
    alt: ["Artesano cortando una losa de mármol negro", "A craftsman cutting a black marble slab"],
    entra: 0.04,
    escritorio: { x: "left:3vw", y: "6vh", w: "19vw", proporcion: "4/5" },
    movil: { x: "left:5vw", y: "10vh", w: "40vw", proporcion: "4/5" },
  },
  {
    src: cncFresado,
    alt: ["Centro CNC fresando una pieza", "A CNC center milling a piece"],
    entra: 0.13,
    escritorio: { x: "right:4vw", y: "9vh", w: "17vw", proporcion: "3/2" },
    movil: { x: "right:5vw", y: "13vh", w: "38vw", proporcion: "3/2" },
  },
  {
    src: rosetones,
    alt: ["Rosetón tallado a mano", "A hand-carved medallion"],
    entra: 0.22,
    escritorio: { x: "left:8vw", y: "53vh", w: "14vw", proporcion: "4/3" },
    movil: { x: "right:9vw", y: "25vh", w: "28vw", proporcion: "1/1" },
  },
  {
    src: sierraColumna,
    alt: ["Disco de corte trabajando una columna", "A saw blade working a column"],
    entra: 0.31,
    escritorio: { x: "right:3vw", y: "43vh", w: "21vw", proporcion: "4/5" },
    movil: { x: "left:6vw", y: "65vh", w: "34vw", proporcion: "4/3" },
  },
  {
    src: artesanoTallado,
    alt: ["Tallado a mano de un relieve", "Hand carving a relief"],
    entra: 0.4,
    escritorio: { x: "left:25vw", y: "66vh", w: "12vw", proporcion: "1/1" },
    movil: { x: "right:5vw", y: "61vh", w: "40vw", proporcion: "4/5" },
  },
  {
    src: pulidoMarmolNegro,
    alt: ["Pulido de mármol negro", "Polishing black marble"],
    entra: 0.49,
    escritorio: { x: "right:25vw", y: "70vh", w: "14vw", proporcion: "3/2" },
    movil: { x: "left:12vw", y: "78vh", w: "30vw", proporcion: "3/2" },
  },
  {
    src: mesaVeta,
    alt: ["Losa de mármol con veta en la mesa de trabajo", "A veined marble slab on the workbench"],
    entra: 0.58,
    escritorio: { x: "left:25vw", y: "5vh", w: "12vw", proporcion: "3/2" },
  },
  {
    src: artesanoLijado,
    alt: ["Artesano ajustando una pieza", "A craftsman fitting a piece"],
    entra: 0.67,
    escritorio: { x: "right:23vw", y: "4vh", w: "11vw", proporcion: "1/1" },
  },
];

const posicion = (l: Lugar) => {
  const [lado, valor] = l.x.split(":");
  return { [lado]: valor, top: l.y, width: l.w } as Record<string, string>;
};

/**
 * Nuestra historia en Nosotros: la frase queda fija al centro y, mientras se hace
 * scroll, las fotos de planta van apareciendo alrededor hasta armar un collage.
 * La frase se enciende palabra por palabra al mismo ritmo.
 */
export function HistoriaFija() {
  const { t, lang } = useLang();
  const reducido = useReducedMotion();
  const escritorio = useMedia("(min-width: 768px)");
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const frase =
    lang === "en" ? "More than five decades, chapter by chapter." : "Más de cinco décadas, capítulo por capítulo.";
  const palabras = frase.split(" ");
  const fotos = FOTOS.filter((f) => escritorio || f.movil);

  return (
    <section
      ref={ref}
      aria-labelledby="historia-titulo"
      className="relative bg-mdh-tinta text-white"
      style={{ height: reducido ? "100svh" : escritorio ? "420vh" : "340vh" }}
    >
      {/* El escenario empieza debajo del menú fijo (77 px) para que ninguna foto quede tapada. */}
      <div className="sticky top-[77px] h-[calc(100svh-77px)] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_50%,rgba(91,106,120,0.22)_0%,rgba(91,106,120,0.05)_42%,rgba(23,24,25,0)_75%)]"
        />

        {fotos.map((f) => (
          <Foto
            key={f.src}
            progreso={scrollYProgress}
            entra={f.entra}
            estatica={Boolean(reducido)}
            estilo={posicion(escritorio ? f.escritorio : f.movil!)}
            proporcion={(escritorio ? f.escritorio : f.movil!).proporcion}
            src={f.src}
            alt={lang === "en" ? f.alt[1] : f.alt[0]}
          />
        ))}

        <div className="absolute inset-0 grid place-items-center px-8">
          <h2
            id="historia-titulo"
            aria-label={frase}
            className="max-w-[16ch] text-center text-[clamp(2.1rem,4.4vw,4.25rem)] font-light leading-[1.08] tracking-[-0.025em] md:max-w-[20ch]"
          >
            {palabras.map((p, i) => (
              <span key={`${lang}-${i}`}>
                <Palabra
                  progreso={scrollYProgress}
                  desde={0.06 + (i / palabras.length) * 0.6}
                  hasta={0.06 + ((i + 1) / palabras.length) * 0.6}
                  estatica={Boolean(reducido)}
                >
                  {p}
                </Palabra>
                {i < palabras.length - 1 && " "}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}

function Foto({
  progreso,
  entra,
  estatica,
  estilo,
  proporcion,
  src,
  alt,
}: {
  progreso: MotionValue<number>;
  entra: number;
  estatica: boolean;
  estilo: Record<string, string>;
  proporcion: string;
  src: string;
  alt: string;
}) {
  // Funciones en lugar de rangos: evita la aceleración nativa de Chrome (ver imagen-expansiva).
  const avance = useTransform(() => (estatica ? 1 : tramo(progreso.get(), entra, entra + 0.09)));
  const opacity = useTransform(() => avance.get());
  const scale = useTransform(() => 0.96 + 0.04 * avance.get());
  // Sube 34 px al aparecer y luego deriva lento hacia arriba: profundidad sin mover la frase.
  const y = useTransform(() => {
    const deriva = estatica ? 0 : -24 * Math.max(0, progreso.get() - entra);
    return 34 * (1 - avance.get()) + deriva;
  });

  return (
    <motion.figure
      className="absolute m-0 will-change-transform"
      style={{ ...estilo, opacity, scale, y }}
    >
      <div className="relative overflow-hidden border border-white/15" style={{ aspectRatio: proporcion }}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </motion.figure>
  );
}

function Palabra({
  progreso,
  desde,
  hasta,
  estatica,
  children,
}: {
  progreso: MotionValue<number>;
  desde: number;
  hasta: number;
  estatica: boolean;
  children: string;
}) {
  const opacity = useTransform(() => (estatica ? 1 : 0.18 + 0.82 * tramo(progreso.get(), desde, hasta)));
  return (
    <motion.span aria-hidden="true" style={{ opacity }} className="inline-block">
      {children}
    </motion.span>
  );
}
