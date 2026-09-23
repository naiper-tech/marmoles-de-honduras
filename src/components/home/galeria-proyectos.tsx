import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";

import { proyectosPortafolio } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";
import { CursorVer, useCursorVer } from "./cursor-ver";
import { useMedia } from "./efectos";
import { Aparecer, EASE } from "./movimiento";
import { ModalProyecto, useCategoria, useProyectoAbierto } from "./proyectos";

const pad = (n: number) => String(n).padStart(2, "0");

const PAIS_EN: Record<string, string> = {
  Honduras: "Honduras",
  "Estados Unidos": "United States",
  Guatemala: "Guatemala",
  "El Salvador": "El Salvador",
  Nicaragua: "Nicaragua",
  "Costa Rica": "Costa Rica",
};

type Filtros = { pais: string | null; tipo: string | null };

/**
 * Filtros por país y tipo (pedidos en el brief). Viven en la URL para que un
 * comercial pueda mandar "nuestra obra en Estados Unidos" como un enlace directo.
 */
function useFiltros() {
  const [filtros, setFiltros] = useState<Filtros>({ pais: null, tipo: null });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setFiltros({ pais: p.get("pais"), tipo: p.get("tipo") });
  }, []);

  const cambiar = useCallback((clave: keyof Filtros, valor: string | null) => {
    setFiltros((previos) => {
      const siguiente = { ...previos, [clave]: valor };
      const url = new URL(window.location.href);
      for (const k of ["pais", "tipo"] as const) {
        if (siguiente[k]) url.searchParams.set(k, siguiente[k]!);
        else url.searchParams.delete(k);
      }
      window.history.replaceState(window.history.state, "", url);
      return siguiente;
    });
  }, []);

  const limpiar = useCallback(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("pais");
    url.searchParams.delete("tipo");
    window.history.replaceState(window.history.state, "", url);
    setFiltros({ pais: null, tipo: null });
  }, []);

  return { filtros, cambiar, limpiar };
}

/**
 * Portafolio completo: un destacado a lo ancho cuando no hay filtro y una grilla
 * de dos columnas que se reordena al filtrar. Cada foto se desplaza dentro de su
 * marco (parallax) y toma color al hover.
 */
export function GaleriaProyectos() {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const { proyecto, abrir, cerrar } = useProyectoAbierto(proyectosPortafolio);
  const cursor = useCursorVer();
  const escritorio = useMedia("(min-width: 768px)");
  const { filtros, cambiar, limpiar } = useFiltros();

  const paises = useMemo(
    () => [...new Set(proyectosPortafolio.map((p) => p.pais))],
    [],
  );
  const tipos = useMemo(
    () => [...new Set(proyectosPortafolio.map((p) => p.categoria))],
    [],
  );

  const filtrados = useMemo(
    () =>
      proyectosPortafolio.filter(
        (p) =>
          (!filtros.pais || p.pais === filtros.pais) &&
          (!filtros.tipo || p.categoria === filtros.tipo),
      ),
    [filtros],
  );

  const sinFiltro = !filtros.pais && !filtros.tipo;
  const [destacado, ...resto] = filtrados;
  const grilla = sinFiltro ? resto : filtrados;

  const abrirProyecto = (slug: string) => {
    cursor.apagar();
    abrir(slug);
  };

  return (
    <section id="proyectos" aria-label={t("Proyectos", "Projects")} className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pb-28 md:px-10 md:pb-40">
        <BarraFiltros
          paises={paises}
          tipos={tipos}
          filtros={filtros}
          alCambiar={cambiar}
          alLimpiar={limpiar}
          total={filtrados.length}
          etiquetaTipo={categoria}
        />

        {filtrados.length === 0 ? (
          <VacioFiltro alLimpiar={limpiar} />
        ) : (
          <>
            {sinFiltro && destacado && (
              <Destacado
                proyecto={loc(destacado, lang)}
                categoria={categoria(destacado.categoria)}
                cursor={cursor}
                etiqueta={t("Destacado", "Featured")}
                alAbrir={() => abrirProyecto(destacado.slug)}
              />
            )}

            <motion.div
              layout
              className={`grid gap-x-10 gap-y-20 md:gap-x-16 md:gap-y-28 ${
                escritorio ? "md:grid-cols-2" : ""
              } ${sinFiltro && destacado ? "mt-20 md:mt-40" : "mt-14 md:mt-20"}`}
            >
              <AnimatePresence mode="popLayout">
                {grilla.map((original, i) => (
                  <motion.div
                    key={original.slug}
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    // La segunda columna baja un poco para romper la retícula.
                    className={escritorio && i % 2 === 1 ? "md:mt-24" : ""}
                  >
                    <TarjetaProyecto
                      proyecto={loc(original, lang)}
                      numero={sinFiltro ? i + 2 : i + 1}
                      proporcion={i % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/4]"}
                      categoria={categoria(original.categoria)}
                      cursor={cursor}
                      alAbrir={() => abrirProyecto(original.slug)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </div>

      <CursorVer cursor={cursor} etiqueta={t("Ver", "View")} visible={!proyecto} />
      <ModalProyecto proyecto={proyecto} alCerrar={cerrar} />
    </section>
  );
}

/**
 * Ronda 1 (#46): los filtros tienen que leerse como filtros. Píldoras con borde,
 * opción "Todos" en cada grupo, estado activo relleno y un "Limpiar" visible.
 * En móvil cada grupo es una fila con desplazamiento lateral.
 */
function BarraFiltros({
  paises,
  tipos,
  filtros,
  alCambiar,
  alLimpiar,
  total,
  etiquetaTipo,
}: {
  paises: string[];
  tipos: Proyecto["categoria"][];
  filtros: Filtros;
  alCambiar: (clave: keyof Filtros, valor: string | null) => void;
  alLimpiar: () => void;
  total: number;
  etiquetaTipo: (c: Proyecto["categoria"]) => string;
}) {
  const { t, lang } = useLang();
  const hayFiltro = Boolean(filtros.pais || filtros.tipo);

  const grupos = [
    {
      clave: "pais" as const,
      titulo: t("País", "Country"),
      opciones: paises.map((p) => ({ valor: p, texto: lang === "en" ? (PAIS_EN[p] ?? p) : p })),
    },
    {
      clave: "tipo" as const,
      titulo: t("Tipo de proyecto", "Project type"),
      opciones: tipos.map((c) => ({ valor: c, texto: etiquetaTipo(c) })),
    },
  ];

  const pildora = (activo: boolean) =>
    `inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-[0.95rem] transition-colors duration-300 ${
      activo
        ? "border-mdh-tinta bg-mdh-tinta text-white"
        : "border-mdh-tinta/20 text-mdh-acero hover:border-mdh-tinta hover:text-mdh-tinta"
    }`;

  return (
    <Aparecer className="mb-16 md:mb-24">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-mdh-niebla pb-5">
        <p className="mdh-label flex items-center gap-3 text-mdh-tinta">
          <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {t("Filtrar proyectos", "Filter projects")}
        </p>
        <div className="flex items-center gap-6">
          <p aria-live="polite" className="mdh-label text-mdh-pizarra">
            {total} {total === 1 ? t("obra", "project") : t("obras", "projects")}
          </p>
          {hayFiltro && (
            <button
              type="button"
              onClick={alLimpiar}
              className="mdh-label inline-flex min-h-11 items-center gap-2 text-mdh-tinta transition-opacity hover:opacity-60"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              {t("Limpiar", "Clear")}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        {grupos.map((grupo) => (
          <div key={grupo.clave} className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <span id={`filtro-${grupo.clave}`} className="mdh-label shrink-0 text-mdh-pizarra md:w-36">
              {grupo.titulo}
            </span>
            <div
              role="group"
              aria-labelledby={`filtro-${grupo.clave}`}
              className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0"
            >
              <button
                type="button"
                onClick={() => alCambiar(grupo.clave, null)}
                aria-pressed={!filtros[grupo.clave]}
                className={pildora(!filtros[grupo.clave])}
              >
                {t("Todos", "All")}
              </button>
              {grupo.opciones.map((opcion) => {
                const activo = filtros[grupo.clave] === opcion.valor;
                return (
                  <button
                    key={opcion.valor}
                    type="button"
                    onClick={() => alCambiar(grupo.clave, opcion.valor)}
                    aria-pressed={activo}
                    className={pildora(activo)}
                  >
                    {opcion.texto}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Aparecer>
  );
}

function VacioFiltro({ alLimpiar }: { alLimpiar: () => void }) {
  const { t } = useLang();
  return (
    <div className="border-b border-mdh-niebla py-24 text-center md:py-32">
      <p className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-light text-mdh-acero">
        {t("No hay obra de ese tipo en ese país.", "No projects of that type in that country.")}
      </p>
      <button
        type="button"
        onClick={alLimpiar}
        className="mdh-label mt-8 inline-flex min-h-11 items-center border-b border-mdh-tinta pb-1 transition-opacity duration-300 hover:opacity-60"
      >
        {t("Ver todo el portafolio", "See the whole portfolio")}
      </button>
    </div>
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
  );
}
