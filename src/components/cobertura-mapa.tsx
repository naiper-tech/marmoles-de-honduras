import { motion } from "motion/react";
import { MapPin } from "lucide-react";

import projClock from "@/assets/project-clocktower.jpg";
import projHotel from "@/assets/proj-hotel.jpg";
import projMall from "@/assets/proj-mall.jpg";
import projTorre from "@/assets/proj-torre-sky.jpg";
import workshop from "@/assets/workshop.jpg";
import { useLang } from "@/lib/i18n";

const ease = [0.16, 1, 0.3, 1] as const;

type Destino = {
  lugar: string;
  pais: string;
  dato: string;
  datoEn: string;
  nota: string;
  notaEn: string;
  img: string;
  clase: string;
};

const destinos: Destino[] = [
  {
    lugar: "Tegucigalpa",
    pais: "Honduras",
    dato: "Casa matriz",
    datoEn: "Headquarters",
    nota: "Planta de corte, calibrado y pulido, con cuadrilla propia de montaje.",
    notaEn: "Cutting, calibrating and polishing plant, with our own installation crews.",
    img: workshop,
    clase: "md:col-span-2 md:row-span-2 min-h-[22rem] md:min-h-[34rem]",
  },
  {
    lugar: "San Pedro Sula",
    pais: "Honduras",
    dato: "Corredor industrial",
    datoEn: "Industrial corridor",
    nota: "Distribución para proyectos comerciales del norte del país.",
    notaEn: "Distribution for commercial projects across the north of the country.",
    img: projMall,
    clase: "min-h-[16rem]",
  },
  {
    lugar: "Islas de la Bahía",
    pais: "Honduras",
    dato: "Resorts",
    datoEn: "Resorts",
    nota: "Logística insular: pieza numerada, embalada y montada en sitio.",
    notaEn: "Island logistics: each piece numbered, crated and installed on site.",
    img: projHotel,
    clase: "min-h-[16rem]",
  },
  {
    lugar: "Palm Beach",
    pais: "Estados Unidos",
    dato: "Obra emblema",
    datoEn: "Flagship project",
    nota: "Clock Tower: fabricado en Honduras, embarcado y montado en Florida.",
    notaEn: "Clock Tower: fabricated in Honduras, shipped and installed in Florida.",
    img: projClock,
    clase: "min-h-[16rem]",
  },
  {
    lugar: "Centroamérica",
    pais: "Guatemala · Nicaragua · Costa Rica",
    dato: "Obra entregada",
    datoEn: "Delivered work",
    nota: "Hotelería en Costa Rica, residencial en Nicaragua y obra litúrgica en Guatemala.",
    notaEn: "Hospitality in Costa Rica, residential in Nicaragua, and liturgical work in Guatemala.",
    img: projTorre,
    clase: "min-h-[16rem]",
  },
];

/** Cobertura en bento: todas las plazas visibles, sin carruseles ni hovers. */
export function CoberturaMapa() {
  const { t, lang } = useLang();
  const en = lang === "en";

  return (
    <section className="mt-20 bg-ink py-16 text-background md:mt-32 md:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-stone" />
              <p className="eyebrow text-background/50">
                {t("Dónde hemos instalado", "Where we have installed")}
              </p>
            </div>
            <h2 className="mt-5 max-w-xl font-display text-4xl font-extrabold leading-[1.03] sm:text-6xl">
              {t("De la planta a la obra, donde esté", "From our plant to your site, wherever it is")}
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-background/60">
            {t(
              "Fabricamos en Honduras y entregamos con equipo propio en el país, la región y el exterior.",
              "We fabricate in Honduras and deliver with our own crews across the country, the region and abroad.",
            )}
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {destinos.map((d, i) => (
            <motion.article
              key={d.lugar}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
              className={`group relative isolate overflow-hidden rounded-[1.75rem] border border-background/15 ${d.clase}`}
            >
              <img
                src={d.img}
                alt={`${d.lugar}, ${d.pais}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10"
              />
              <div className="relative flex h-full flex-col justify-end gap-3 p-6 md:p-8">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-background/25 bg-ink/40 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-stone backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5" />
                  {en ? d.datoEn : d.dato}
                </span>
                <div>
                  <h3
                    className={`font-display font-extrabold leading-none ${
                      i === 0 ? "text-4xl sm:text-6xl" : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {d.lugar}
                  </h3>
                  <p className="mt-2 text-[0.65rem] uppercase tracking-[0.22em] text-background/45">
                    {d.pais}
                  </p>
                </div>
                <p
                  className={`text-sm leading-relaxed text-background/70 ${
                    i === 0 ? "max-w-md" : "max-w-xs"
                  }`}
                >
                  {en ? d.notaEn : d.nota}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
