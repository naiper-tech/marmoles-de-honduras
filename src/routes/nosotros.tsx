import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import workshop from "@/assets/workshop.jpg";
import interiorLiving from "@/assets/interior-living.jpg";
import matMarmol from "@/assets/mat-marmol.jpg";
import projClock from "@/assets/project-clocktower.jpg";
import projTorreSky from "@/assets/proj-torre-sky.jpg";
import matTravertino from "@/assets/mat-travertino.jpg";
import { AnimatedHeadline, Reveal } from "@/components/motion";
import { CountUp } from "@/components/count-up";
import { HistoriaScroll, type Capitulo } from "@/components/historia-scroll";
import { CtaBanner } from "@/components/cta-banner";
import { useLang } from "@/lib/i18n";

const title = "Nosotros — Mármoles de Honduras";
const description =
  "Empresa familiar hondureña con más de 50 años fabricando, distribuyendo e instalando piedra natural en Centroamérica y Estados Unidos.";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: NosotrosPage,
});

function NosotrosPage() {
  const { t } = useLang();

  const valores = [
    {
      titulo: t("Oficio antes que volumen", "Craft before volume"),
      detalle: t(
        "Preferimos entregar menos metros y que cada junta esté donde tiene que estar.",
        "We'd rather deliver fewer square meters and make sure every joint sits exactly where it should."
      ),
    },
    {
      titulo: t("Una sola conversación", "One single conversation"),
      detalle: t(
        "Selección, fabricación e instalación con el mismo equipo. Nadie se pasa la responsabilidad.",
        "Selection, fabrication, and installation handled by the same team. No one passes the responsibility along."
      ),
    },
    {
      titulo: t("Hecho en Honduras", "Made in Honduras"),
      detalle: t(
        "Talento local formado durante décadas, con obra entregada dentro y fuera del país.",
        "Local talent trained over decades, with projects delivered both at home and abroad."
      ),
    },
  ];

  const capitulos: Capitulo[] = [
    {
      anio: "1972",
      titulo: t("Un bloque, una sierra y un apellido", "A block, a saw, and a family name"),
      detalle: t(
        "La familia abre un taller pequeño para cortar mármol a mano en Tegucigalpa. La primera regla del oficio se escribe ahí: la piedra no se corrige, se entiende antes de cortarla.",
        "The family opens a small workshop to cut marble by hand in Tegucigalpa. The first rule of the craft is written there: stone isn't corrected, it's understood before it's cut."
      ),
      imagen: workshop,
    },
    {
      anio: "1990",
      titulo: t("De taller a planta", "From workshop to plant"),
      detalle: t(
        "Llegan las primeras sierras de puente y el calibrado industrial. Empezamos a abastecer obra comercial en todo el país sin dejar de trabajar pieza por pieza.",
        "The first bridge saws and industrial calibration arrive. We begin supplying commercial projects nationwide without ever losing our piece-by-piece approach."
      ),
      imagen: matTravertino,
    },
    {
      anio: "2006",
      titulo: t("Instalación propia", "In-house installation"),
      detalle: t(
        "Formamos nuestros propios equipos de montaje. Desde entonces la misma gente que selecciona el bloque es la que responde por la junta final en obra.",
        "We form our own installation teams. Since then, the same people who select the block are the ones accountable for the final joint on site."
      ),
      imagen: interiorLiving,
    },
    {
      anio: t("Hoy", "Today"),
      titulo: t("Obra dentro y fuera del país", "Work at home and abroad"),
      detalle: t(
        "Proyectos entregados en Honduras, Guatemala, Nicaragua, Costa Rica y Estados Unidos —incluida la torre del reloj en Palm Beach, Florida—, con escultores y despiece digital en casa.",
        "Projects delivered in Honduras, Guatemala, Nicaragua, Costa Rica, and the United States —including the clock tower in Palm Beach, Florida— with in-house sculptors and digital layout planning."
      ),
      imagen: projClock,
    },
  ];

  const cifras = [
    { valor: 50, suffix: "+", label: t("Años de oficio", "Years of craft") },
    { valor: 5, suffix: t(" países", " countries"), label: t("Con obra entregada", "With delivered work") },
    { valor: 6, suffix: t(" piedras", " stones"), label: t("Familias de material", "Material families") },
    { valor: 100, suffix: "%", label: t("Fabricación propia", "In-house fabrication") },
  ];

  return (
    <div>
      {/* Portada editorial a sangre */}
      <header className="relative overflow-hidden bg-ink text-background">
        <img
          src={matMarmol}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/80 to-ink" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
          <div className="flex items-center gap-4">
            <span className="h-px w-12 bg-background/40" />
            <p className="eyebrow text-background/60">{t("Nosotros — desde 1972", "About us — since 1972")}</p>
          </div>
          <h1 className="mt-8 max-w-5xl font-display text-[3rem] font-extrabold leading-[0.88] sm:text-8xl">
            <AnimatedHeadline text={t("Cincuenta años", "Fifty years")} />
            <br />
            <span className="text-background/45">
              <AnimatedHeadline text={t("entendiendo la piedra", "understanding stone")} delay={0.2} />
            </span>
          </h1>
          <div className="mt-12 grid gap-8 border-t border-background/15 pt-8 md:grid-cols-[1fr_auto] md:items-end">
            <p className="max-w-xl text-base leading-relaxed text-background/70">
              {t(
                "Somos una empresa familiar hondureña. Seleccionamos el bloque, lo fabricamos en planta propia y lo instalamos con nuestra gente. Nadie más toca la pieza en el camino.",
                "We're a Honduran family business. We select the block, fabricate it in our own plant, and install it with our own people. No one else touches the piece along the way."
              )}
            </p>
            <p className="font-display text-sm text-background/50">
              {t("Tegucigalpa, Honduras · 15°30′N 87°12′W", "Tegucigalpa, Honduras · 15°30′N 87°12′W")}
            </p>
          </div>
        </div>
      </header>

      {/* Cifras */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-border md:grid-cols-4">
          {cifras.map((c) => (
            <div key={c.label} className="bg-background px-5 py-10 md:px-8 md:py-14">
              <p className="font-display text-4xl font-extrabold leading-none sm:text-6xl">
                <CountUp to={c.valor} suffix={c.suffix} />
              </p>
              <p className="eyebrow mt-4 text-muted-foreground">{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Manifiesto */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-10 md:grid-cols-[minmax(0,0.4fr)_minmax(0,1fr)] md:gap-16">
          <Reveal>
            <p className="eyebrow sticky top-28 text-primary">{t("Manifiesto", "Manifesto")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-display text-2xl font-bold leading-[1.25] sm:text-4xl">
              {t(
                "El mármol, el granito, la cuarcita, el ónix y el travertino tienen un carácter tan notable que fácilmente pueden considerarse arte.",
                "Marble, granite, quartzite, onyx, and travertine carry such remarkable character that they could easily be considered art."
              )}{" "}
              <span className="text-muted-foreground">
                {t(
                  "Nuestro trabajo no es domesticarlos: es leerlos, ordenarlos y colocarlos donde su veta cuente algo.",
                  "Our job isn't to tame them: it's to read them, arrange them, and place them where their veining tells a story."
                )}
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Línea de tiempo con imagen fija */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-32">
        <Reveal className="mb-12 md:mb-20">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border pb-6">
            <h2 className="font-display text-3xl font-extrabold sm:text-5xl">
              {t("La historia, en cuatro capítulos", "Our story, in four chapters")}
            </h2>
            <p className="eyebrow text-muted-foreground">{t("1972 → hoy", "1972 → today")}</p>
          </div>
        </Reveal>
        <HistoriaScroll capitulos={capitulos} />
      </section>

      {/* Valores como filas numeradas */}
      <section className="bg-ink py-20 text-background md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-background/50">{t("Cómo pensamos", "How we think")}</p>
          </Reveal>
          <div className="mt-10 border-t border-background/15">
            {valores.map((v, i) => (
              <Reveal key={v.titulo} delay={i * 0.08}>
                <div className="grid gap-3 border-b border-background/15 py-8 md:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-12">
                  <span className="eyebrow text-background/35">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-bold sm:text-4xl">
                    {v.titulo}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-background/60">
                    {v.detalle}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cita + obra */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-[2rem] border border-border bg-secondary p-8 md:p-10">
              <p className="font-display text-2xl font-bold leading-snug sm:text-3xl">
                {t(
                  "“La piedra no se corrige: se entiende antes de cortarla.”",
                  "“Stone isn't corrected: it's understood before it's cut.”"
                )}
              </p>
              <p className="eyebrow mt-10 text-muted-foreground">
                {t("Taller de fabricación · Tegucigalpa", "Fabrication workshop · Tegucigalpa")}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-7">
            <img
              src={projTorreSky}
              alt={t(
                "Fachada de torre revestida en piedra natural",
                "Tower facade clad in natural stone"
              )}
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full min-h-[18rem] w-full rounded-[2rem] object-cover"
            />
          </Reveal>
        </div>
      </section>

      <CtaBanner
        eyebrow={t("Trabajemos juntos", "Let's work together")}
        titulo={t("¿Trabajamos juntos en tu próximo proyecto?", "Shall we work together on your next project?")}
        texto={t(
          "Contanos qué tenés en mente: seleccionamos el bloque, fabricamos en planta propia y montamos en obra.",
          "Tell us what you have in mind: we select the block, fabricate it in our own plant, and install it on site."
        )}
        cta={t("Hablemos", "Let's talk")}
      />
    </div>
  );
}
