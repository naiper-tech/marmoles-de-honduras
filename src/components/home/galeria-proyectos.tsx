import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { proyectosPortafolio } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";
import { CursorVer, useCursorVer } from "./cursor-ver";
import { useMedia } from "./efectos";
import { desplazarA } from "./scroll-suave";
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

  const porCantidad = <T extends string>(valores: T[]) => {
    const n = (v: T) => valores.filter((x) => x === v).length;
    return [...new Set(valores)].sort((a, b) => n(b) - n(a) || a.localeCompare(b, "es"));
  };
  const paises = useMemo(() => porCantidad(proyectosPortafolio.map((p) => p.pais)), []);
  const tipos = useMemo(() => porCantidad(proyectosPortafolio.map((p) => p.categoria)), []);

  const filtrados = useMemo(
    () =>
      proyectosPortafolio.filter(
        (p) =>
          (!filtros.pais || p.pais === filtros.pais) &&
          (!filtros.tipo || p.categoria === filtros.tipo),
      ),
    [filtros],
  );

  const contar = (clave: keyof Filtros, valor: string | null) =>
    proyectosPortafolio.filter((p) => {
      const pais = clave === "pais" ? valor : filtros.pais;
      const tipo = clave === "tipo" ? valor : filtros.tipo;
      return (!pais || p.pais === pais) && (!tipo || p.categoria === tipo);
    }).length;

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
          contar={contar}
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

const ALTO_ENCABEZADO = 77;

/**
 * Filtros de proyectos (ronda 1, #46 y ajuste posterior). Una barra compacta que
 * queda fija bajo el menú mientras se recorre el portafolio y se suelta al terminar
 * la sección (sticky dentro del contenedor). Cada filtro abre un menú con el número
 * de obras por opción; las opciones sin obras para el otro filtro se ven apagadas,
 * así nunca se llega a una combinación vacía por sorpresa.
 */
function BarraFiltros({
  paises,
  tipos,
  filtros,
  alCambiar,
  alLimpiar,
  total,
  contar,
  etiquetaTipo,
}: {
  paises: string[];
  tipos: Proyecto["categoria"][];
  filtros: Filtros;
  alCambiar: (clave: keyof Filtros, valor: string | null) => void;
  alLimpiar: () => void;
  total: number;
  contar: (clave: keyof Filtros, valor: string | null) => number;
  etiquetaTipo: (c: Proyecto["categoria"]) => string;
}) {
  const { t, lang } = useLang();
  const hayFiltro = Boolean(filtros.pais || filtros.tipo);
  const centinela = useRef<HTMLDivElement>(null);
  const [fija, setFija] = useState(false);

  // Detecta cuándo la barra queda pegada bajo el menú para darle fondo y sombra.
  useEffect(() => {
    const el = centinela.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setFija(!e.isIntersecting && e.boundingClientRect.top < ALTO_ENCABEZADO + 1),
      { rootMargin: `-${ALTO_ENCABEZADO}px 0px 0px 0px`, threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Al filtrar desde abajo, vuelve al inicio de la grilla para ver los resultados.
  const aplicar = (clave: keyof Filtros, valor: string | null) => {
    alCambiar(clave, valor);
    if (fija && centinela.current) {
      desplazarA(centinela.current.getBoundingClientRect().top + window.scrollY - ALTO_ENCABEZADO);
    }
  };

  const grupos = [
    {
      clave: "pais" as const,
      titulo: t("País", "Country"),
      opciones: paises.map((p) => ({
        valor: p,
        texto: lang === "en" ? (PAIS_EN[p] ?? p) : p,
        corto: p === "Estados Unidos" ? t("EE. UU.", "U.S.") : undefined,
      })),
    },
    {
      clave: "tipo" as const,
      titulo: t("Tipo", "Type"),
      opciones: tipos.map((c) => ({ valor: c as string, texto: etiquetaTipo(c) })),
    },
  ];

  return (
    <>
      <div ref={centinela} aria-hidden="true" className="h-px" />
      <div
        className={`sticky z-30 -mx-6 mb-14 border-b px-6 py-3 transition-[background-color,box-shadow,border-color] duration-500 md:-mx-10 md:mb-20 md:px-10 md:py-4 ${
          fija
            ? "border-mdh-niebla bg-white/90 shadow-[0_18px_40px_-30px_rgba(23,24,25,0.45)] backdrop-blur-md"
            : "border-mdh-niebla bg-white"
        }`}
        style={{ top: ALTO_ENCABEZADO - 1 }}
      >
        <div className="flex items-center gap-2 md:gap-3">
          <span className="mdh-label mr-2 hidden items-center gap-2.5 text-mdh-pizarra lg:inline-flex">
            <SlidersHorizontal className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            {t("Filtrar", "Filter")}
          </span>

          {grupos.map((grupo) => {
            const elegida = (grupo.opciones as { valor: string; texto: string; corto?: string }[]).find(
              (o) => o.valor === filtros[grupo.clave],
            );
            return (
              <MenuFiltro
                key={grupo.clave}
                titulo={grupo.titulo}
                seleccion={filtros[grupo.clave]}
                textoSeleccion={elegida?.texto}
                textoCorto={elegida?.corto}
                opciones={grupo.opciones}
                total={contar(grupo.clave, null)}
                contar={(v) => contar(grupo.clave, v)}
                alElegir={(v) => aplicar(grupo.clave, v)}
              />
            );
          })}

          <div className="ml-auto flex items-center gap-4">
            <p aria-live="polite" className="mdh-label hidden text-mdh-pizarra sm:block">
              {hayFiltro ? total : `${Math.floor(total / 10) * 10}+`}{" "}
              {total === 1 ? t("obra", "project") : t("obras", "projects")}
            </p>
            {hayFiltro && (
              <button
                type="button"
                onClick={() => {
                  alLimpiar();
                  if (fija && centinela.current) {
                    desplazarA(centinela.current.getBoundingClientRect().top + window.scrollY - ALTO_ENCABEZADO);
                  }
                }}
                aria-label={t("Limpiar filtros", "Clear filters")}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-full border border-mdh-tinta/20 text-mdh-tinta transition-colors duration-300 hover:border-mdh-tinta sm:w-auto sm:px-4"
              >
                <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                <span className="mdh-label hidden sm:inline">{t("Limpiar", "Clear")}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/** Botón de filtro con su menú: "País · Todos ⌄" → lista con conteo por opción. */
function MenuFiltro({
  titulo,
  seleccion,
  textoSeleccion,
  textoCorto,
  opciones,
  total,
  contar,
  alElegir,
}: {
  titulo: string;
  seleccion: string | null;
  textoSeleccion?: string;
  /** Versión corta para móvil, cuando el nombre completo no cabe en la píldora. */
  textoCorto?: string;
  opciones: { valor: string; texto: string }[];
  total: number;
  contar: (valor: string | null) => number;
  alElegir: (valor: string | null) => void;
}) {
  const { t } = useLang();
  const [abierto, setAbierto] = useState(false);
  const activo = Boolean(seleccion);

  const elegir = (valor: string | null) => {
    alElegir(valor);
    setAbierto(false);
  };

  const fila = (valor: string | null, texto: string, n: number) => {
    const elegida = seleccion === valor;
    const vacia = n === 0 && !elegida;
    return (
      <li key={valor ?? "todos"}>
        <button
          type="button"
          disabled={vacia}
          onClick={() => elegir(valor)}
          aria-pressed={elegida}
          className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3.5 text-left transition-colors duration-200 ${
            vacia ? "cursor-not-allowed opacity-35" : "hover:bg-mdh-hueso"
          } ${elegida ? "bg-mdh-hueso" : ""}`}
        >
          <span className="grid h-4 w-4 shrink-0 place-items-center">
            {elegida && <Check className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />}
          </span>
          <span className={`flex-1 text-[0.95rem] ${elegida ? "text-mdh-tinta" : "text-mdh-acero"}`}>{texto}</span>
          <span className="text-xs tabular-nums text-mdh-pizarra">{n}</span>
        </button>
      </li>
    );
  };

  return (
    <Popover.Root open={abierto} onOpenChange={setAbierto}>
      <Popover.Trigger
        className={`group inline-flex h-11 min-w-0 flex-1 items-center justify-between gap-2 rounded-full border px-4 transition-colors duration-300 sm:flex-none sm:justify-start md:px-5 ${
          activo
            ? "border-mdh-tinta bg-mdh-tinta text-white"
            : "border-mdh-tinta/20 text-mdh-tinta hover:border-mdh-tinta data-[state=open]:border-mdh-tinta"
        }`}
      >
        <span className="flex min-w-0 items-baseline gap-2">
          <span className={`mdh-label shrink-0 ${activo ? "hidden text-white/60 sm:inline" : "text-mdh-pizarra"}`}>
            {titulo}
          </span>
          {textoCorto ? (
            <>
              <span className="truncate text-[0.95rem] sm:hidden">{textoCorto}</span>
              <span className="hidden truncate text-[0.95rem] sm:inline">{textoSeleccion}</span>
            </>
          ) : (
            <span className="truncate text-[0.95rem]">{textoSeleccion ?? t("Todos", "All")}</span>
          )}
        </span>
        <ChevronDown
          className="h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180"
          strokeWidth={1.5}
          aria-hidden="true"
        />
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={10}
          collisionPadding={16}
          className="mdh z-[70] w-[min(calc(100vw-2rem),300px)] rounded-2xl border border-mdh-niebla bg-white p-1.5 font-mdh text-mdh-tinta shadow-[0_28px_60px_-28px_rgba(23,24,25,0.45)] outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95"
        >
          <p className="mdh-label px-3.5 pb-2 pt-3 text-mdh-pizarra">{titulo}</p>
          <ul>
            {fila(null, t("Todos", "All"), total)}
            {opciones.map((o) => fila(o.valor, o.texto, contar(o.valor)))}
          </ul>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
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
