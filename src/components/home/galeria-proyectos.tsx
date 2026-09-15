import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { proyectosDestacados } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";
import { CursorVer, useCursorVer } from "./cursor-ver";
import { useMedia } from "./efectos";
import { Aparecer } from "./movimiento";
import { ModalProyecto, useCategoria, useProyectoAbierto } from "./proyectos";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Página de proyectos: un destacado a lo ancho y dos columnas que avanzan a distinta
 * velocidad. Cada foto se desplaza dentro de su marco (parallax) y toma color al hover.
 */
export function GaleriaProyectos() {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const { proyecto, abrir, cerrar } = useProyectoAbierto();
  const cursor = useCursorVer();
  const escritorio = useMedia("(min-width: 768px)");

  const [destacado, ...resto] = proyectosDestacados;
  const izquierda = resto.filter((_, i) => i % 2 === 0);
  const derecha = resto.filter((_, i) => i % 2 === 1);

  const grillaRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: grillaRef, offset: ["start end", "end start"] });
  const desfase = useTransform(() => (escritorio ? scrollYProgress.get() * -180 : 0));

  const abrirProyecto = (slug: string) => {
    cursor.apagar();
    abrir(slug);
  };

  const tarjeta = (original: Proyecto, numero: number, proporcion: string) => (
    <TarjetaProyecto
      key={original.slug}
      proyecto={loc(original, lang)}
      numero={numero}
      proporcion={proporcion}
      categoria={categoria(original.categoria)}
      cursor={cursor}
      alAbrir={() => abrirProyecto(original.slug)}
    />
  );

  return (
    <section id="proyectos" aria-label={t("Proyectos", "Projects")} className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10 md:pb-40">
        {destacado && (
          <Destacado
            proyecto={loc(destacado, lang)}
            categoria={categoria(destacado.categoria)}
            cursor={cursor}
            etiqueta={t("Destacado", "Featured")}
            alAbrir={() => abrirProyecto(destacado.slug)}
          />
        )}

        {escritorio ? (
          <div ref={grillaRef} className="mt-40 grid grid-cols-2 gap-x-16">
            <div className="space-y-40">
              {izquierda.map((p, i) => tarjeta(p, 2 + i * 2, i % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/4]"))}
            </div>
            <motion.div style={{ y: desfase }} className="mt-64 space-y-40">
              {derecha.map((p, i) => tarjeta(p, 3 + i * 2, i % 2 === 0 ? "aspect-[5/4]" : "aspect-[4/5]"))}
            </motion.div>
          </div>
        ) : (
          <div ref={grillaRef} className="mt-20 space-y-20">
            {resto.map((p, i) => tarjeta(p, i + 2, "aspect-[4/5]"))}
          </div>
        )}
      </div>

      <CursorVer cursor={cursor} etiqueta={t("Ver", "View")} visible={!proyecto} />
      <ModalProyecto proyecto={proyecto} alCerrar={cerrar} />
    </section>
  );
}

/** Imagen que se desplaza dentro de su marco mientras la tarjeta cruza la pantalla. */
function useParalaje(intensidad: number) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(() => `${(0.5 - scrollYProgress.get()) * intensidad}%`);
  return { ref, y };
}

function Destacado({
  proyecto: p,
  categoria,
  cursor,
  etiqueta,
  alAbrir,
}: {
  proyecto: Proyecto;
  categoria: string;
  cursor: ReturnType<typeof useCursorVer>;
  etiqueta: string;
  alAbrir: () => void;
}) {
  const { ref, y } = useParalaje(16);

  return (
    <Aparecer>
      <button
        ref={ref}
        type="button"
        onClick={alAbrir}
        aria-haspopup="dialog"
        {...cursor.eventos}
        className={`group relative block w-full overflow-hidden text-left text-white ${cursor.fino ? "cursor-none" : ""}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-mdh-tinta md:aspect-[16/8]">
          <motion.img
            src={p.imagen}
            alt={`${p.titulo}, ${p.lugar}`}
            style={{ y }}
            className="absolute inset-x-0 -top-[12%] h-[124%] w-full object-cover transition-[scale] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,24,25,0.85)_0%,rgba(23,24,25,0)_60%)]"
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-12">
            <div>
              <p className="mdh-label text-white/70">
                01 · {etiqueta}
              </p>
              {/* El padding inferior del subrayado no ocupa espacio en línea: el margen del
                  párrafo siguiente debe superarlo para que la línea no cruce la ubicación. */}
              <h3 className="mt-4 text-[clamp(2.2rem,5vw,5rem)] font-light leading-[1.1] tracking-[-0.02em]">
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                  {p.titulo}
                </span>
              </h3>
              <p className="mt-6 text-white/75">
                {p.lugar}, {p.pais}
              </p>
            </div>
            <span className="mdh-label text-white/70">{categoria}</span>
          </div>
        </div>
      </button>
    </Aparecer>
  );
}

function TarjetaProyecto({
  proyecto: p,
  numero,
  proporcion,
  categoria,
  cursor,
  alAbrir,
}: {
  proyecto: Proyecto;
  numero: number;
  proporcion: string;
  categoria: string;
  cursor: ReturnType<typeof useCursorVer>;
  alAbrir: () => void;
}) {
  const { ref, y } = useParalaje(14);

  return (
    <Aparecer>
      <button
        ref={ref}
        type="button"
        onClick={alAbrir}
        aria-haspopup="dialog"
        {...cursor.eventos}
        className={`group block w-full text-left ${cursor.fino ? "cursor-none" : ""}`}
      >
        <div className={`relative overflow-hidden bg-mdh-niebla ${proporcion}`}>
          <motion.img
            src={p.imagen}
            alt={`${p.titulo}, ${p.lugar}`}
            loading="lazy"
            style={{ y }}
            className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover grayscale-[45%] transition-[filter,scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
          />
        </div>
        <div className="mt-6 flex items-start gap-5">
          <span className="mdh-label pt-2 text-mdh-pizarra">{pad(numero)}</span>
          <div className="min-w-0">
            <h3 className="text-2xl font-light leading-snug md:text-3xl">
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                {p.titulo}
              </span>
            </h3>
            <p className="mt-2 text-sm text-mdh-pizarra">
              {p.lugar}, {p.pais} · {categoria}
            </p>
          </div>
        </div>
      </button>
    </Aparecer>
  );
}
