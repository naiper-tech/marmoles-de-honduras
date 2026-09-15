import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { materiales, servicios } from "@/lib/site-data";
import { useLang, loc } from "@/lib/i18n";
import { AnimatedHeadline, Reveal } from "@/components/motion";
import { ProcesoHorizontal } from "@/components/proceso-horizontal";
import { PiezasGrid } from "@/components/piezas-grid";
import { HoverIndexList } from "@/components/hover-index-list";
import { CtaBanner } from "@/components/cta-banner";
import workshop from "@/assets/workshop.jpg";
import matGranito from "@/assets/mat-granito.jpg";
import matOnix from "@/assets/mat-onix.jpg";
import interiorLiving from "@/assets/interior-living.jpg";

const title = "Servicios, piezas a medida y materiales — Mármoles de Honduras";
const description =
  "Fabricación, corte a medida, instalación y distribución. Escaleras, chimeneas, columnas, bustos, tinas y detalles arquitectónicos en piedra natural.";

export const Route = createFileRoute("/demo/servicios")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ServiciosPage,
});

const serviciosImg = [workshop, matOnix, interiorLiving, matGranito];

function ServiciosPage() {
  const { t, lang } = useLang();

  return (
    <div>
      {/* Portada tipográfica */}
      <header className="mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-28">
        <div className="flex items-center gap-4">
          <span className="h-px w-12 bg-primary" />
          <p className="eyebrow text-primary">{t("Servicios", "Services")}</p>
        </div>
        <h1 className="mt-8 font-display text-[3rem] font-extrabold leading-[0.86] sm:text-[7.5rem]">
          <AnimatedHeadline text={t("Todo el proceso", "The entire process")} />
          <br />
          <span className="text-muted-foreground">
            <AnimatedHeadline text={t("bajo un techo", "under one roof")} delay={0.2} />
          </span>
        </h1>
        <div className="mt-12 grid gap-8 border-t border-border pt-8 md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
            {t(
              "Seleccionamos, fabricamos, instalamos y damos mantenimiento. Sin intermediarios entre el bloque y tu obra.",
              "We select, fabricate, install, and maintain. No middlemen between the block and your project."
            )}
          </p>
          <p className="eyebrow text-muted-foreground">
            {t(
              "Planta propia · Escultores propios · Montaje propio",
              "Own plant · Own sculptors · Own installation crews"
            )}
          </p>
        </div>
      </header>

      {/* Índice de servicios con preview flotante */}
      <section className="mx-auto mt-16 max-w-7xl px-5 md:mt-24 md:px-8">
        <HoverIndexList
          rows={servicios.map((s0, i) => {
            const s = loc(s0, lang);
            return {
              titulo: s.titulo,
              detalle: s.detalle,
              imagen: serviciosImg[i % serviciosImg.length],
            };
          })}
        />
      </section>

      {/* Materiales: fichas apiladas tipo catálogo */}
      <section className="mx-auto mt-24 max-w-7xl px-5 md:mt-36 md:px-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <h2 className="max-w-xl font-display text-3xl font-extrabold leading-[1.02] sm:text-6xl">
              {t("Piedras con carácter propio", "Stones with a character of their own")}
            </h2>
            <p className="eyebrow text-muted-foreground">
              {materiales.length} {t("familias de material", "material families")}
            </p>
          </div>
        </Reveal>

        <div className="mt-10 space-y-5 md:mt-16 md:space-y-8">
          {materiales.map((m0, i) => {
            const m = loc(m0, lang);
            return (
              <Reveal key={m.slug} delay={0.04}>
                <article
                  className={`group grid items-center gap-6 md:grid-cols-12 md:gap-10 ${
                    i % 2 === 1 ? "md:[&>figure]:order-2" : ""
                  }`}
                >
                  <figure className="relative overflow-hidden rounded-[1.75rem] md:col-span-5">
                    <img
                      src={m.imagen}
                      alt={`${t("Textura de", "Texture of")} ${m.nombre}`}
                      loading="lazy"
                      width={900}
                      height={700}
                      className="aspect-[5/4] w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                    />
                    <figcaption className="absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 font-display text-xs font-bold backdrop-blur">
                      {String(i + 1).padStart(2, "0")}
                    </figcaption>
                  </figure>
                  <div className="md:col-span-7">
                    <h3 className="font-display text-3xl font-extrabold sm:text-5xl">
                      {m.nombre}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                      {m.descripcion}
                    </p>
                    <dl className="mt-8 grid gap-6 border-t border-border pt-6 sm:grid-cols-2">
                      <div>
                        <dt className="eyebrow text-muted-foreground">{t("Usos", "Uses")}</dt>
                        <dd className="mt-3 flex flex-wrap gap-2">
                          {m.usos.map((u) => (
                            <span
                              key={u}
                              className="rounded-full border border-border px-3 py-1 text-xs"
                            >
                              {u}
                            </span>
                          ))}
                        </dd>
                      </div>
                      <div>
                        <dt className="eyebrow text-muted-foreground">{t("Acabados", "Finishes")}</dt>
                        <dd className="mt-3 flex flex-wrap gap-2">
                          {m.acabados.map((a) => (
                            <span
                              key={a}
                              className="rounded-full bg-secondary px-3 py-1 text-xs"
                            >
                              {a}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Piezas a medida — banda oscura */}
      <section className="mt-24 bg-ink py-20 text-background md:mt-36 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-background/50">{t("Piezas a medida", "Custom pieces")}</p>
            <h2 className="mt-5 max-w-4xl font-display text-3xl font-extrabold leading-[1.02] sm:text-6xl">
              {t("Tú lo imaginas,", "You imagine it,")}{" "}
              <span className="text-background/45">{t("nosotros lo tallamos", "we carve it")}</span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-background/60">
              {t(
                "Maquinaria especializada y escultores propios. Si se puede dibujar, se puede tallar en piedra.",
                "Specialized machinery and in-house sculptors. If it can be drawn, it can be carved in stone."
              )}
            </p>
          </Reveal>
          <div className="mt-12 md:mt-16">
            <PiezasGrid />
          </div>
        </div>
      </section>

      {/* Proceso */}
      <div className="py-10 md:py-16">
        <ProcesoHorizontal />
      </div>

      <CtaBanner
        eyebrow={t("Cotización", "Quote")}
        titulo={t(
          "Envíanos tus planos y te ayudamos con el cálculo",
          "Send us your plans and we'll help with the calculation"
        )}
        texto={t(
          "Revisamos medidas, rendimiento de la placa y acabados para que el presupuesto salga sin sorpresas.",
          "We review measurements, slab yield, and finishes so the estimate comes out with no surprises."
        )}
      />
    </div>
  );
}
