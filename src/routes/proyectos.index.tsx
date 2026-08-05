import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { proyectos, type Categoria } from "@/lib/site-data";
import { useLang, loc } from "@/lib/i18n";
import { AnimatedHeadline, Reveal } from "@/components/motion";
import { CtaBanner } from "@/components/cta-banner";

const title = "Proyectos — Mármoles de Honduras";
const description =
  "Bitácora de proyectos residenciales, comerciales e institucionales en piedra natural: el encargo, el reto y cómo se resolvió.";

export const Route = createFileRoute("/proyectos/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProyectosPage,
});

function ProyectosPage() {
  const { t, lang } = useLang();
  const filtros = [
    t("Todos", "All"),
    t("Residencial", "Residential"),
    t("Comercial", "Commercial"),
    t("Institucional", "Institutional"),
  ] as const;
  const categoriaMap: Record<string, Categoria> = {
    [t("Residencial", "Residential")]: "Residencial",
    [t("Comercial", "Commercial")]: "Comercial",
    [t("Institucional", "Institutional")]: "Institucional",
  };

  const [filtro, setFiltro] = useState<(typeof filtros)[number]>(filtros[0]);
  const lista =
    filtro === filtros[0]
      ? proyectos
      : proyectos.filter((p) => p.categoria === categoriaMap[filtro]);

  const [destacado0, ...resto0] = lista;
  const destacado = destacado0 ? loc(destacado0, lang) : undefined;
  const resto = resto0.map((p) => loc(p, lang));

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="pt-14 md:pt-24">
        <p className="eyebrow text-primary">{t("Bitácora", "Journal")}</p>
        <h1 className="mt-5 font-display text-[2.8rem] font-extrabold leading-[0.95] sm:text-7xl">
          <AnimatedHeadline text={t("Nuestros proyectos", "Our projects")} />
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
        >
          {t(
            "Cada obra empieza con la selección del bloque y termina con la última junta ajustada en sitio. Entra a cualquiera para leer cómo se resolvió.",
            "Every project begins with block selection and ends with the last joint set on site. Open any of them to read how it was solved."
          )}
        </motion.p>
      </header>

      <div className="mt-10 flex flex-wrap gap-2 border-b border-border pb-6">
        {filtros.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setFiltro(c)}
            className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
              filtro === c
                ? "text-primary-foreground"
                : "border border-border text-muted-foreground hover:bg-secondary"
            }`}
          >
            {filtro === c && (
              <motion.span
                layoutId="filtro-activo"
                className="absolute inset-0 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>

      {destacado && (
        <AnimatePresence mode="wait">
          <motion.div
            key={filtro}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            className="mt-10"
          >
            <Link
              to="/proyectos/$slug"
              params={{ slug: destacado.slug }}
              className="group grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className="overflow-hidden rounded-3xl">
                <img
                  src={destacado.imagen}
                  alt={destacado.titulo}
                  width={1400}
                  height={1000}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
              </div>
              <div>
                <p className="eyebrow text-primary">
                  {t("Destacado", "Featured")} · {destacado.categoria} · {destacado.pais}
                </p>
                <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
                  {destacado.titulo}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {destacado.lugar}, {destacado.pais}
                </p>
                <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                  {destacado.resumen}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {t("Leer el proyecto", "Read the project")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="mt-16 grid gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {resto.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 3) * 0.08}>
            <Link
              to="/proyectos/$slug"
              params={{ slug: p.slug }}
              className="group block"
            >
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={p.imagen}
                  alt={p.titulo}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="eyebrow mt-5 text-primary">
                {p.categoria} · {p.pais}
              </p>
              <h3 className="mt-2 font-display text-xl font-bold group-hover:text-primary">
                {p.titulo}
              </h3>
              <p className="text-sm text-muted-foreground">
                {p.lugar}, {p.pais}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {p.resumen}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                {t("Leer más", "Read more")} <ArrowUpRight className="h-4 w-4" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <CtaBanner
        eyebrow={t("Tu obra, la próxima", "Your project, next")}
        titulo={t("¿Tenés un proyecto en camino?", "Do you have a project underway?")}
        texto={t(
          "Desde una isla de cocina hasta una fachada completa: fabricamos, transportamos e instalamos.",
          "From a kitchen island to a full facade: we fabricate, transport, and install."
        )}
      />
    </div>
  );
}
