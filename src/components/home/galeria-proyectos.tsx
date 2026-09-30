import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import * as Popover from "@radix-ui/react-popover";
import { ArrowLeft, ArrowRight, Check, ChevronDown, SlidersHorizontal, X } from "lucide-react";

import { proyectosPortafolio } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";
import { CursorVer, useCursorVer } from "./cursor-ver";
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
 * Portafolio completo (reunión 29/09): una fila horizontal por tipología con
 * flechas para recorrerla. El filtro de tipo deja solo su fila y el de país filtra
 * dentro de cada una. Las fotos toman color al hover.
 */
export function GaleriaProyectos() {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const { proyecto, abrir, cerrar } = useProyectoAbierto(proyectosPortafolio);
  const cursor = useCursorVer();
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
          <div className="flex flex-col gap-20 md:gap-28">
            {TIPOLOGIAS.filter((c) => !filtros.tipo || filtros.tipo === c).map((c) => {
              const obras = filtrados.filter((p) => p.categoria === c);
              if (!obras.length) return null;
              return (
                <FilaProyectos
                  key={c}
                  titulo={categoria(c)}
                  obras={obras}
                  cursor={cursor}
                  alAbrir={abrirProyecto}
                />
              );
            })}
          </div>
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
          <span className={`flex-1 text-base ${elegida ? "text-mdh-tinta" : "text-mdh-acero"}`}>{texto}</span>
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
              <span className="truncate text-base sm:hidden">{textoCorto}</span>
              <span className="hidden truncate text-base sm:inline">{textoSeleccion}</span>
            </>
          ) : (
            <span className="truncate text-base">{textoSeleccion ?? t("Todos", "All")}</span>
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

/** Orden de las filas (reunión 29/09): tres tipologías. */
const TIPOLOGIAS: Proyecto["categoria"][] = ["Residencial", "Comercial", "Institucional"];

/**
 * Una fila por tipología, navegable con flechas (sin mover la página por su
 * cuenta). En táctil también se desliza con el dedo.
 */
function FilaProyectos({
  titulo,
  obras,
  cursor,
  alAbrir,
}: {
  titulo: string;
  obras: Proyecto[];
  cursor: ReturnType<typeof useCursorVer>;
  alAbrir: (slug: string) => void;
}) {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const pista = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fin, setFin] = useState(false);

  const medir = useCallback(() => {
    const el = pista.current;
    if (!el) return;
    setInicio(el.scrollLeft <= 4);
    setFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    medir();
    const el = pista.current;
    if (!el) return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, [medir, obras.length]);

  const mover = (dir: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reducido ? "auto" : "smooth" });
  };

  const flecha = (dir: 1 | -1, apagada: boolean) => (
    <button
      type="button"
      onClick={() => mover(dir)}
      disabled={apagada}
      aria-label={dir === 1 ? t(`Siguientes proyectos: ${titulo}`, `Next projects: ${titulo}`) : t(`Proyectos anteriores: ${titulo}`, `Previous projects: ${titulo}`)}
      className="grid h-12 w-12 place-items-center rounded-full border border-mdh-tinta/20 text-mdh-tinta transition-colors duration-300 hover:border-mdh-tinta hover:bg-mdh-tinta hover:text-white disabled:pointer-events-none disabled:opacity-25"
    >
      {dir === 1 ? <ArrowRight className="h-4 w-4" strokeWidth={1.5} /> : <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />}
    </button>
  );

  return (
    <Aparecer>
      <section aria-label={titulo}>
        <div className="flex items-end justify-between gap-6 border-b border-mdh-niebla pb-6">
          <h2 className="text-[clamp(1.9rem,3.4vw,3.25rem)] font-light leading-none tracking-[-0.02em]">{titulo}</h2>
          {obras.length > 1 && (
            <div className="flex shrink-0 gap-2">
              {flecha(-1, inicio)}
              {flecha(1, fin)}
            </div>
          )}
        </div>

        <ul
          ref={pista}
          onScroll={medir}
          className="-mx-6 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:-mx-10 md:gap-8 md:scroll-px-10 md:px-10 [&::-webkit-scrollbar]:hidden"
        >
          {obras.map((original, i) => {
            const p = loc(original, lang);
            return (
              <li key={original.slug} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
                <button
                  type="button"
                  onClick={() => alAbrir(original.slug)}
                  aria-haspopup="dialog"
                  {...cursor.eventos}
                  className={`group block w-full text-left ${cursor.fino ? "cursor-none" : ""}`}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-mdh-niebla">
                    <img
                      src={p.imagen}
                      alt={`${p.titulo}, ${p.lugar}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover grayscale-[45%] transition-[filter,scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] group-hover:grayscale-0"
                    />
                  </div>
                  <div className="mt-5 flex items-start gap-4">
                    <span className="mdh-label pt-1.5 text-mdh-pizarra">{pad(i + 1)}</span>
                    <div className="min-w-0">
                      <h3 className="text-xl font-light leading-snug md:text-2xl">
                        <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
                          {p.titulo}
                        </span>
                      </h3>
                      <p className="mt-2 text-base text-mdh-pizarra">
                        {p.lugar}, {p.pais} · {categoria(original.categoria)}
                      </p>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </Aparecer>
  );
}
