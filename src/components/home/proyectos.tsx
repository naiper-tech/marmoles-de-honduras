import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

import { proyectosDestacados } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import type { Proyecto } from "@/lib/site-data";

const CATEGORIA_EN: Record<Proyecto["categoria"], string> = {
  Residencial: "Residential",
  Comercial: "Commercial",
  Institucional: "Institutional",
};

/** El proyecto abierto viaja en la URL: el enlace se puede compartir directo. */
const PARAMETRO = "proyecto";

export function useCategoria() {
  const { lang } = useLang();
  return (c: Proyecto["categoria"]) => (lang === "en" ? CATEGORIA_EN[c] : c);
}

export function useProyectoAbierto() {
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    const inicial = new URLSearchParams(window.location.search).get(PARAMETRO);
    if (inicial && proyectosDestacados.some((p) => p.slug === inicial)) setSlug(inicial);
  }, []);

  const cambiar = useCallback((nuevo: string | null) => {
    setSlug(nuevo);
    const url = new URL(window.location.href);
    if (nuevo) url.searchParams.set(PARAMETRO, nuevo);
    else url.searchParams.delete(PARAMETRO);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return {
    proyecto: proyectosDestacados.find((p) => p.slug === slug),
    abrir: (nuevo: string) => cambiar(nuevo),
    cerrar: () => cambiar(null),
  };
}

export function ModalProyecto({
  proyecto,
  alCerrar,
}: {
  proyecto: Proyecto | undefined;
  alCerrar: () => void;
}) {
  const { t, lang } = useLang();
  const categoria = useCategoria();
  const [indice, setIndice] = useState(0);

  // Conserva el último proyecto mientras corre la animación de cierre.
  const ultimo = useRef(proyecto);
  if (proyecto) ultimo.current = proyecto;
  const p = ultimo.current ? loc(ultimo.current, lang) : undefined;

  useEffect(() => setIndice(0), [proyecto?.slug]);

  if (!p) return null;

  // Galería solo con fotos reales del proyecto; hoy la mayoría tiene una.
  const imagenes = [p.imagen];
  const variasFotos = imagenes.length > 1;
  const mover = (paso: number) => setIndice((v) => (v + paso + imagenes.length) % imagenes.length);

  return (
    <Dialog.Root open={Boolean(proyecto)} onOpenChange={(v) => !v && alCerrar()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-mdh-tinta/70 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          data-lenis-prevent
          className="mdh fixed inset-0 z-[90] m-auto flex h-[100dvh] w-full flex-col overflow-y-auto bg-white font-mdh text-mdh-tinta outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98] md:h-[min(88vh,820px)] md:w-[min(92vw,1240px)] md:flex-row md:overflow-hidden"
        >
          <div className="relative shrink-0 bg-mdh-niebla md:w-[58%]">
            <img
              src={imagenes[indice]}
              alt={`${p.titulo}, ${p.lugar}`}
              className="aspect-[4/3] h-full w-full object-cover md:aspect-auto"
            />
            {variasFotos && (
              <div className="absolute bottom-5 right-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => mover(-1)}
                  aria-label={t("Foto anterior", "Previous photo")}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/90"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => mover(1)}
                  aria-label={t("Foto siguiente", "Next photo")}
                  className="grid h-11 w-11 place-items-center rounded-full bg-white/90"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          {/* En móvil queda fija sobre la foto para cerrar sin tener que desplazarse. */}
          <Dialog.Close
            aria-label={t("Cerrar proyecto", "Close project")}
            className="fixed right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-white/90 text-mdh-tinta backdrop-blur transition-colors hover:bg-white md:absolute md:right-6 md:top-6 md:bg-transparent md:text-mdh-acero md:backdrop-blur-none md:hover:bg-transparent md:hover:text-mdh-tinta"
          >
            <X strokeWidth={1.25} />
          </Dialog.Close>

          <div className="flex flex-1 flex-col p-7 md:overflow-y-auto md:p-12">
            <p className="mdh-label pr-14 text-mdh-pizarra">
              {categoria(p.categoria)} · {p.pais}
            </p>

            <Dialog.Title className="mt-6 text-4xl font-light leading-tight md:text-5xl">
              {p.titulo}
            </Dialog.Title>
            <p className="mt-2 text-mdh-pizarra">
              {p.lugar}, {p.pais}
            </p>
            <Dialog.Description className="mt-8 leading-relaxed text-mdh-acero">
              {p.resumen}
            </Dialog.Description>

            <dl className="mt-10 grid gap-8 border-t border-mdh-niebla pt-8 sm:grid-cols-2">
              <div>
                <dt className="mdh-label text-mdh-pizarra">{t("Alcance", "Scope")}</dt>
                <dd className="mt-3 space-y-1.5 text-[0.95rem]">
                  {p.alcance.map((a) => (
                    <span key={a} className="block">
                      {a}
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="mdh-label text-mdh-pizarra">{t("Materiales", "Materials")}</dt>
                <dd className="mt-3 space-y-1.5 text-[0.95rem]">
                  {p.materiales.map((m) => (
                    <span key={m} className="block">
                      {m}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-10">
              {/* Lleva al formulario con el proyecto ya referenciado. */}
              <Link
                to="/home/contacto"
                search={{ proyecto: p.slug }}
                className="group flex w-full items-center justify-between bg-mdh-tinta px-7 py-5 text-white transition-colors duration-500 hover:bg-mdh-acero"
              >
                <span className="mdh-label">{t("Cotizar algo similar", "Quote something similar")}</span>
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
