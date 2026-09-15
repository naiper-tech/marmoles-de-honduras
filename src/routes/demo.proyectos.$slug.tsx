import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { proyectos, type Proyecto } from "@/lib/site-data";
import { useLang, loc } from "@/lib/i18n";
import { Reveal } from "@/components/motion";
import { CtaBanner } from "@/components/cta-banner";

export const Route = createFileRoute("/demo/proyectos/$slug")({
  loader: ({ params }): { proyecto: Proyecto } => {
    const proyecto = proyectos.find((p) => p.slug === params.slug);
    if (!proyecto) throw notFound();
    return { proyecto };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Proyecto no encontrado — Mármoles de Honduras" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { proyecto } = loaderData;
    const t = `${proyecto.titulo}, ${proyecto.lugar} — Mármoles de Honduras`;
    return {
      meta: [
        { title: t },
        { name: "description", content: proyecto.resumen },
        { property: "og:title", content: t },
        { property: "og:description", content: proyecto.resumen },
      ],
    };
  },
  component: ProyectoDetalle,
  notFoundComponent: ProyectoNoEncontrado,
});

function ProyectoNoEncontrado() {
  const { t } = useLang();
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center md:px-8">
      <h1 className="font-display text-4xl font-extrabold">
        {t("Proyecto no encontrado", "Project not found")}
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {t(
          "Puede que el enlace haya cambiado. Revisa la bitácora completa.",
          "The link may have changed. Browse the full journal."
        )}
      </p>
      <Link
        to="/demo/proyectos"
        className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
      >
        {t("Ver proyectos", "View projects")}
      </Link>
    </div>
  );
}

function ProyectoDetalle() {
  const { t, lang } = useLang();
  const { proyecto: proyecto0 }: { proyecto: Proyecto } = Route.useLoaderData();
  const proyecto = loc(proyecto0, lang);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const { scrollYProgress: pageProgress } = useScroll();

  const otros = proyectos
    .filter((p) => p.slug !== proyecto.slug)
    .slice(0, 3)
    .map((p) => loc(p, lang));

  return (
    <article>
      <motion.div
        style={{ scaleX: pageProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary"
      />

      <section ref={heroRef} className="relative h-[72vh] min-h-[440px] overflow-hidden">
        <motion.img
          src={proyecto.imagen}
          alt={proyecto.titulo}
          width={1400}
          height={1000}
          style={{ y }}
          className="absolute inset-0 h-full w-full scale-110 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/40" />
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-end px-5 pb-14 text-background md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              to="/demo/proyectos"
              className="inline-flex items-center gap-2 text-sm text-background/70 transition-colors hover:text-background"
            >
              <ArrowLeft className="h-4 w-4" /> {t("Proyectos", "Projects")}
            </Link>
            <p className="eyebrow mt-8 text-background/70">
              {proyecto.categoria} · {proyecto.pais}
            </p>
            <h1 className="mt-4 font-display text-[2.6rem] font-extrabold leading-[0.95] sm:text-6xl">
              {proyecto.titulo}
            </h1>
            <p className="mt-3 text-base text-background/80">
              {proyecto.lugar}, {proyecto.pais}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="border-b border-border py-10">
          <p className="max-w-3xl font-display text-xl font-semibold leading-relaxed sm:text-2xl">
            {proyecto.resumen}
          </p>
        </Reveal>

        <div className="grid gap-12 py-14 md:grid-cols-[1fr_240px] md:gap-16">
          <div className="space-y-12">
            {proyecto.contenido.map((bloque, i) => (
              <Reveal key={bloque.titulo} delay={i * 0.05}>
                <h2 className="font-display text-2xl font-bold">{bloque.titulo}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {bloque.texto}
                </p>
              </Reveal>
            ))}
          </div>

          <aside className="space-y-8 md:sticky md:top-28 md:self-start">
            <div>
              <p className="eyebrow text-muted-foreground">{t("Alcance", "Scope")}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {proyecto.alcance.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">{t("Materiales", "Materials")}</p>
              <ul className="mt-3 space-y-1.5 text-sm">
                {proyecto.materiales.map((m) => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow text-muted-foreground">{t("Ubicación", "Location")}</p>
              <p className="mt-3 text-sm">{proyecto.lugar}</p>
            </div>
            <Link
              to="/demo/cotizar"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              {t("Quiero algo así", "I want something like this")} <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>

        <div className="grid gap-4 pb-16 sm:grid-cols-3">
          {proyecto.galeria.map((g, i) => (
            <Reveal key={`${g}-${i}`} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={g}
                  alt={`${proyecto.titulo} — ${t("imagen", "image")} ${i + 1}`}
                  loading="lazy"
                  width={1200}
                  height={1200}
                  className="aspect-square w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <h2 className="font-display text-2xl font-extrabold">{t("Otros proyectos", "Other projects")}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otros.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/demo/proyectos/$slug"
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
                  <h3 className="mt-4 font-display text-lg font-bold group-hover:text-primary">
                    {p.titulo}
                  </h3>
                  <p className="text-sm text-muted-foreground">{p.lugar}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        eyebrow={t("Siguiente obra", "Next project")}
        titulo={t("¿Querés algo así en tu proyecto?", "Would you like something like this in your project?")}
        texto={t(
          "Te acompañamos desde la selección del bloque hasta el montaje final en obra.",
          "We'll be with you from block selection to final installation on site."
        )}
      />
    </article>
  );
}
