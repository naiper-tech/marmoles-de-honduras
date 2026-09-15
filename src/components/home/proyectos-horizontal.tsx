import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { proyectosDestacados } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";
import { CursorVer, useCursorVer } from "./cursor-ver";
import { useMedia } from "./efectos";
import { EnlaceMas } from "./enlaces";
import { Emerge } from "./movimiento";
import { ModalProyecto, useCategoria, useProyectoAbierto } from "./proyectos";

const pad = (n: number) => String(n).padStart(2, "0");

/** Ritmo de la pista: alterna verticales y horizontales para que no parezca una grilla. */
const PROPORCIONES = [
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[5/4]",
  "aspect-[4/5]",
  "aspect-[5/4]",
];

/**
 * Proyectos en la home. En escritorio la sección se fija y la pista avanza en
 * horizontal con el scroll vertical; en móvil es un carrusel con deslizamiento.
 */
export function ProyectosHorizontal() {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const { proyecto, abrir, cerrar } = useProyectoAbierto();
  const escritorio = useMedia("(min-width: 1024px)");
  const cursor = useCursorVer();
  const total = proyectosDestacados.length;

  const seccionRef = useRef<HTMLElement>(null);
  const pistaRef = useRef<HTMLDivElement>(null);
  const distancia = useMotionValue(0);
  const [alto, setAlto] = useState<number | null>(null);

  // La altura de la sección es lo que dura el recorrido horizontal.
  useEffect(() => {
    const pista = pistaRef.current;
    if (!escritorio || !pista) {
      setAlto(null);
      return;
    }
    const medir = () => {
      const d = Math.max(0, pista.scrollWidth - window.innerWidth);
      distancia.set(d);
      setAlto(d + window.innerHeight);
    };
    medir();
    const observador = new ResizeObserver(medir);
    observador.observe(pista);
    window.addEventListener("resize", medir);
    return () => {
      observador.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, [escritorio, distancia]);

  const { scrollYProgress } = useScroll({ target: seccionRef, offset: ["start start", "end end"] });
  const x = useTransform(() => -scrollYProgress.get() * distancia.get());
  const paralaje = useTransform(() => `${6 - scrollYProgress.get() * 12}%`);

  const [indice, setIndice] = useState(1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIndice(Math.min(total, Math.floor(v * total) + 1));
  });

  const encabezado = (
    <div>
      <p className="mdh-label text-mdh-pizarra">{t("Proyectos seleccionados", "Selected projects")}</p>
      <h2 className="mt-5 text-[clamp(2.1rem,4vw,4rem)] font-light leading-[1.06] tracking-[-0.015em]">
        <Emerge
          key={lang}
          lineas={
            lang === "en" ? ["Delivered work,", "in Honduras and abroad."] : ["Obra entregada,", "dentro y fuera de Honduras."]
          }
        />
      </h2>
    </div>
  );

  const tarjetas = proyectosDestacados.map((original, i) => (
    <Tarjeta
      key={original.slug}
      proyecto={loc(original, lang)}
      numero={i + 1}
      proporcion={PROPORCIONES[i % PROPORCIONES.length]}
      escritorio={escritorio}
      cursor={cursor}
      paralaje={paralaje}
      categoria={categoria(original.categoria)}
      alAbrir={() => {
        cursor.apagar();
        abrir(original.slug);
      }}
    />
  ));

  return (
    <>
      {escritorio ? (
        <section
          ref={seccionRef}
          id="proyectos"
          className="relative bg-white"
          style={{ height: alto ? `${alto}px` : "100vh" }}
        >
          <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
            <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-10 px-10">
              {encabezado}
              <div className="flex items-center gap-6 pb-2">
                <span className="mdh-label tabular-nums">
                  {pad(indice)} <span className="text-mdh-pizarra">/ {pad(total)}</span>
                </span>
                <span aria-hidden="true" className="relative block h-px w-44 bg-mdh-niebla">
                  <motion.span
                    style={{ scaleX: scrollYProgress }}
                    className="absolute inset-0 origin-left bg-mdh-tinta"
                  />
                </span>
              </div>
            </div>

            <motion.div
              ref={pistaRef}
              style={{ x }}
              className="mt-12 flex w-max items-start gap-10 pl-10 pr-[12vw] min-[1520px]:pl-[calc((100vw-1440px)/2+2.5rem)]"
            >
              {tarjetas}
              <Link
                to="/home/proyectos"
                className="group flex aspect-[4/5] h-[50vh] shrink-0 flex-col justify-between border border-mdh-tinta/15 p-9 transition-colors duration-700 hover:border-mdh-tinta hover:bg-mdh-tinta hover:text-white"
              >
                <span className="mdh-label text-mdh-pizarra transition-colors duration-700 group-hover:text-white/60">
                  {t("Portafolio completo", "Full portfolio")}
                </span>
                <span className="text-4xl font-light leading-tight">
                  {t("Ver todos los proyectos", "View all projects")}
                </span>
                <ArrowUpRight
                  className="h-10 w-10 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
                  strokeWidth={1}
                />
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        <section ref={seccionRef} id="proyectos" className="bg-white py-28">
          <div className="px-6 md:px-10">{encabezado}</div>
          {/* items-start: un <button> estirado centra su contenido y desalinea las fotos. */}
          <div className="mt-12 flex snap-x snap-mandatory scroll-px-6 items-start gap-5 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden">
            {tarjetas}
          </div>
          <div className="mt-12 px-6 md:px-10">
            <EnlaceMas to="/home/proyectos">{t("Ver todos los proyectos", "View all projects")}</EnlaceMas>
          </div>
        </section>
      )}

      <CursorVer cursor={cursor} etiqueta={t("Ver", "View")} visible={!proyecto} />
      <ModalProyecto proyecto={proyecto} alCerrar={cerrar} />
    </>
  );
}

function Tarjeta({
  proyecto: p,
  numero,
  proporcion,
  escritorio,
  cursor,
  paralaje,
  categoria,
  alAbrir,
}: {
  proyecto: Proyecto;
  numero: number;
  proporcion: string;
  escritorio: boolean;
  cursor: ReturnType<typeof useCursorVer>;
  paralaje: MotionValue<string>;
  categoria: string;
  alAbrir: () => void;
}) {
  return (
    <button
      type="button"
      onClick={alAbrir}
      aria-haspopup="dialog"
      {...cursor.eventos}
      className={`group block shrink-0 text-left ${escritorio ? "" : "w-[80vw] snap-start sm:w-[55vw]"} ${
        cursor.fino ? "cursor-none" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-mdh-niebla ${proporcion} ${escritorio ? "h-[50vh]" : "w-full"}`}
      >
        <motion.img
          src={p.imagen}
          alt={`${p.titulo}, ${p.lugar}`}
          loading="lazy"
          style={escritorio ? { x: paralaje } : undefined}
          className={`absolute inset-y-0 h-full max-w-none object-cover grayscale-[45%] transition-[filter,scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:grayscale-0 ${
            escritorio ? "-left-[8%] w-[116%]" : "left-0 w-full"
          }`}
        />
      </div>
      <div className="mt-5 flex items-start gap-5">
        <span className="mdh-label pt-2 text-mdh-pizarra">{pad(numero)}</span>
        <div className="min-w-0">
          <h3 className="text-xl font-light leading-snug md:text-2xl">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
              {p.titulo}
            </span>
          </h3>
          <p className="mt-1 text-sm text-mdh-pizarra">
            {p.lugar}, {p.pais} · {categoria}
          </p>
        </div>
      </div>
    </button>
  );
}
