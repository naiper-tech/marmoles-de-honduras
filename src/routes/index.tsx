import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

import heroMarble from "@/assets/hero-marble.jpg";
import { materiales, proyectos } from "@/lib/site-data";
import { useLang, loc } from "@/lib/i18n";
import { AnimatedHeadline, Reveal, StaggerGroup, StaggerItem } from "@/components/motion";
import { ProcesoHorizontal } from "@/components/proceso-horizontal";
import { VideoCorporativo } from "@/components/video-corporativo";
import { PiezasGrid } from "@/components/piezas-grid";
import { Declaracion } from "@/components/declaracion";
import { Voces } from "@/components/voces";
import { CoberturaMapa } from "@/components/cobertura-mapa";
import { CtaBanner } from "@/components/cta-banner";

const title = "Mármoles de Honduras — Piedra natural desde hace más de 50 años";
const description =
  "Fabricación, distribución e instalación de mármol, granito, cuarcita, ónix y travertino para proyectos residenciales, comerciales e institucionales.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, lang } = useLang();
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const cifras = [
    { valor: "+50", label: t("años de trayectoria", "years of craftsmanship") },
    { valor: "5", label: t("piedras naturales", "natural stones") },
    { valor: "5", label: t("países con obra entregada", "countries with completed projects") },
    { valor: "100%", label: t("fabricación propia", "in-house fabrication") },
  ];

  const tomas = [
    {
      src: "/videos/hero-marble.mp4",
      label: t("Selección de bloque", "Block selection"),
      alt: t(
        "Recorrido sobre una losa de mármol crema con vetas doradas",
        "A pan across a cream marble slab with golden veining"
      ),
    },
    {
      src: "/videos/hero-taller.mp4",
      label: t("Corte y pulido en planta", "Cutting and polishing in-plant"),
      alt: t(
        "Losa de mármol siendo cortada con sierra de agua en el taller",
        "A marble slab being cut with a water saw in the workshop"
      ),
    },
    {
      src: "/videos/hero-showroom.mp4",
      label: t("Mármol, granito, ónix, travertino", "Marble, granite, onyx, travertine"),
      alt: t(
        "Sala de exhibición con losas de piedra natural iluminadas",
        "Showroom with backlit natural stone slabs"
      ),
    },
    {
      src: "/videos/hero-interior.mp4",
      label: t("Instalación en obra", "On-site installation"),
      alt: t(
        "Interior residencial con piso y escalera de mármol instalados",
        "Residential interior with installed marble flooring and staircase"
      ),
    },
  ];

  const [toma, setToma] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setToma((t) => (t + 1) % tomas.length), 6000);
    return () => clearInterval(id);
  }, [tomas.length]);

  const destacados = proyectos.slice(0, 3);

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative h-[92vh] min-h-[560px] overflow-hidden">
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <AnimatePresence initial={false}>
            <motion.video
              key={tomas[toma].src}
              src={tomas[toma].src}
              poster={heroMarble}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={tomas[toma].alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink/85" />
        <motion.div
          style={{ opacity: fade }}
          className="relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-16 text-background md:px-8 md:pb-24"
        >
          <h1 className="max-w-5xl font-display text-[3rem] font-extrabold leading-[0.9] sm:text-7xl lg:text-[6.5rem]">
            <AnimatedHeadline text={t("Piedra que", "Stone that")} delay={0.2} />
            <br />
            <span className="italic font-light">
              <AnimatedHeadline text={t("trasciende el tiempo", "transcends time")} delay={0.4} />
            </span>
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <p className="max-w-md text-base leading-relaxed text-background/80">
              {t(
                "Seleccionamos el bloque, lo cortamos en planta propia y lo colocamos pieza por pieza. De la cantera a tu espacio, con manos hondureñas.",
                "We select the block, cut it in our own plant, and set it piece by piece. From the quarry to your space, with Honduran hands."
              )}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/cotizar"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-medium text-foreground transition-transform hover:-translate-y-0.5"
              >
                {t("Solicitar cotización", "Request a quote")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/proyectos"
                className="rounded-full border border-background/40 px-6 py-3.5 text-sm font-medium text-background transition-colors hover:bg-background/10"
              >
                {t("Ver proyectos", "View projects")}
              </Link>
            </div>
          </motion.div>

          {/* índice de tomas */}
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-background/20 pt-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={tomas[toma].label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5 }}
                className="eyebrow text-background/75"
              >
                {tomas[toma].label}
              </motion.p>
            </AnimatePresence>
            <div className="ml-auto flex items-center gap-2">
              {tomas.map((toma_, i) => (
                <button
                  key={toma_.src}
                  type="button"
                  onClick={() => setToma(i)}
                  aria-label={`${t("Ver toma", "View shot")}: ${toma_.label}`}
                  className="h-px w-10 bg-background/25"
                >
                  <motion.span
                    className="block h-px bg-background"
                    animate={{ width: i === toma ? "100%" : "0%" }}
                    transition={{ duration: i === toma ? 5.8 : 0.3, ease: "linear" }}
                  />
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-border bg-secondary/50 py-5">
        <motion.div
          className="flex w-max gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1].map((rep) => (
            <div key={rep} className="flex gap-12">
              {[
                t("Mármol", "Marble"),
                t("Granito", "Granite"),
                t("Cuarcita", "Quartzite"),
                t("Ónix", "Onyx"),
                t("Travertino", "Travertine"),
                t("Fabricación propia", "In-house fabrication"),
                t("Instalación", "Installation"),
                t("Distribución", "Distribution"),
              ].map((label) => (
                <span
                  key={`${rep}-${label}`}
                  className="font-display text-2xl font-bold tracking-tight text-muted-foreground/70 md:text-3xl"
                >
                  {label} <span className="text-primary">·</span>
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      {/* CIFRAS */}
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {cifras.map((c) => (
            <StaggerItem key={c.label} className="border-t border-border pt-5">
              <p className="font-display text-5xl font-extrabold leading-none text-primary md:text-6xl">
                {c.valor}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{c.label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <Declaracion />

      <VideoCorporativo />

      {/* MATERIALES */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:mt-32 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-primary">{t("Materiales", "Materials")}</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
              {t("Cinco piedras, un mismo estándar", "Five stones, one same standard")}
            </h2>
          </div>
          <Link
            to="/servicios"
            className="group inline-flex items-center gap-1 text-sm font-medium text-primary"
          >
            {t("Ver materiales y servicios", "View materials and services")}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {materiales.map((m0) => {
            const m = loc(m0, lang);
            return (
              <StaggerItem key={m.slug}>
                <Link
                  to="/servicios"
                  className="group block overflow-hidden rounded-2xl border border-border bg-card"
                >
                  <div className="overflow-hidden">
                    <img
                      src={m.imagen}
                      alt={`${t("Textura de", "Texture of")} ${m.nombre}`}
                      loading="lazy"
                      width={800}
                      height={800}
                      className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold">{m.nombre}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {m.acabados.join(" · ")}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* PIEZAS A MEDIDA */}
      <section className="mt-20 bg-ink py-20 text-background md:mt-32 md:py-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-background/60">{t("Piezas a medida", "Custom pieces")}</p>
              <h2 className="mt-4 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">
                {t("Tú lo imaginas,", "You imagine it,")}{" "}
                <span className="italic font-light text-background/70">
                  {t("nosotros lo tallamos", "we carve it")}
                </span>
              </h2>
            </div>
            <Link
              to="/servicios"
              className="group inline-flex items-center gap-1 text-sm font-medium text-background/80"
            >
              {t("Ver todas las piezas", "View all pieces")}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
          <div className="mt-10">
            <PiezasGrid limit={4} />
          </div>
        </div>
      </section>

      {/* PROCESO */}
      <div className="mt-20 md:mt-32">
        <ProcesoHorizontal />
      </div>

      {/* PROYECTOS */}
      <section className="mx-auto mt-20 max-w-7xl px-5 md:mt-32 md:px-8">
        <Reveal>
          <p className="eyebrow text-primary">{t("Proyectos", "Projects")}</p>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {t("Obra entregada", "Delivered work")}
          </h2>
        </Reveal>
        <div className="mt-10 space-y-4">
          {destacados.map((p0, i) => {
            const p = loc(p0, lang);
            return (
              <Reveal key={p.slug} delay={i * 0.06}>
                <Link
                  to="/proyectos/$slug"
                  params={{ slug: p.slug }}
                  className="group grid items-center gap-6 rounded-3xl border border-border bg-card p-4 transition-colors hover:bg-secondary/60 md:grid-cols-[300px_1fr_auto] md:p-5"
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
                  <div>
                    <p className="eyebrow text-primary">
                      {p.categoria} · {p.pais}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
                      {p.titulo}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {p.lugar}, {p.pais}
                    </p>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                      {p.resumen}
                    </p>
                  </div>
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-8">
          <Link
            to="/proyectos"
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-secondary"
          >
            {t("Ver todos los proyectos", "View all projects")} <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </section>

      <Voces />

      <CoberturaMapa />

      <CtaBanner />
    </div>
  );
}
