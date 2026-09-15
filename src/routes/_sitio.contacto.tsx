import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { Magnetico, Marquesina } from "@/components/home/efectos";
import { FormularioContacto } from "@/components/home/formulario-contacto";
import { Aparecer, EASE, Emerge } from "@/components/home/movimiento";
import { CONTACTO, correoCon } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/_sitio/contacto")({
  // ?proyecto=slug llega desde "Cotizar algo similar" en el modal de proyectos.
  validateSearch: (search: Record<string, unknown>): { proyecto?: string } => ({
    proyecto: typeof search.proyecto === "string" ? search.proyecto : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contacto — Mármoles de Honduras" },
      {
        name: "description",
        content: "Consultas de proyectos en Honduras, Estados Unidos, Centroamérica y el Caribe.",
      },
    ],
  }),
  component: ContactoPagina,
});

/** Hora local de la planta. Se calcula en el cliente para no desfasar el HTML del servidor. */
function useHoraTegucigalpa() {
  const [hora, setHora] = useState<string | null>(null);
  useEffect(() => {
    const formato = new Intl.DateTimeFormat("es-HN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Tegucigalpa",
    });
    const actualizar = () => setHora(formato.format(new Date()));
    actualizar();
    const id = setInterval(actualizar, 30_000);
    return () => clearInterval(id);
  }, []);
  return hora;
}

function ContactoPagina() {
  const { t, lang } = useLang();
  const { proyecto } = Route.useSearch();
  const hora = useHoraTegucigalpa();

  const regiones = [
    "Honduras",
    t("Estados Unidos", "United States"),
    t("Centroamérica", "Central America"),
    t("El Caribe", "The Caribbean"),
  ];

  return (
    <>
      <section aria-labelledby="contacto-titulo" className="bg-white pt-36 md:pt-48">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <div className="mdh-label flex items-center gap-4 text-mdh-pizarra">
            <span>04</span>
            <motion.span
              aria-hidden="true"
              className="block h-px w-12 origin-left bg-mdh-tinta/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            />
            <span>{t("Contacto", "Contact")}</span>
          </div>

          <h1
            id="contacto-titulo"
            className="mt-8 text-[clamp(2.8rem,8vw,8rem)] font-extralight leading-[0.95] tracking-[-0.035em]"
          >
            <Emerge
              key={lang}
              alCargar
              retraso={0.25}
              lineas={lang === "en" ? ["Tell us about", "your project."] : ["Cuéntanos sobre", "tu proyecto."]}
            />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.1, ease: EASE }}
            className="mt-14 flex flex-col gap-6 border-t border-mdh-niebla pt-8 md:flex-row md:items-center md:justify-between"
          >
            <p className="max-w-lg text-lg leading-relaxed text-mdh-acero">
              {t(
                "Respondemos consultas de proyectos en Honduras y en el extranjero.",
                "We answer project inquiries from Honduras and abroad.",
              )}
            </p>
            <p className="mdh-label flex items-center gap-3 text-mdh-pizarra">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="mdh-pulso absolute inset-0 rounded-full bg-mdh-tinta" />
                <span className="relative h-2 w-2 rounded-full bg-mdh-tinta" />
              </span>
              {t("Hora local en Tegucigalpa", "Local time in Tegucigalpa")}
              <span className="tabular-nums text-mdh-tinta">{hora ?? "--:--"}</span>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-20 px-6 py-24 md:px-10 md:py-32 lg:grid-cols-12 lg:gap-10">
          <Aparecer className="lg:col-span-7">
            <FormularioContacto proyectoSlug={proyecto} />
          </Aparecer>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-4 lg:sticky lg:top-28">
              <Canal
                etiqueta={t("Correo", "Email")}
                valor={CONTACTO.correo}
                href={correoCon(t("Consulta de proyecto", "Project inquiry"))}
              />
              <Canal etiqueta={t("Teléfono", "Phone")} valor={CONTACTO.telefono} href={CONTACTO.telefonoHref} />

              <Aparecer retraso={0.15} className="border-t border-mdh-niebla pt-10">
                <p className="mdh-label text-mdh-pizarra">{t("Trabaja con nosotros", "Work with us")}</p>
                <p className="mt-4 leading-relaxed text-mdh-acero">
                  {t(
                    "Envíanos tu CV y cuéntanos en qué área te gustaría sumarte.",
                    "Send us your CV and tell us where you'd like to contribute.",
                  )}
                </p>
                <Magnetico className="mt-6">
                  <a
                    href={correoCon(t("Únete al equipo — CV", "Join the team — CV"), CONTACTO.correoRRHH)}
                    className="mdh-label group inline-flex items-center gap-3 border-b border-mdh-tinta pb-2"
                  >
                    {t("Únete al equipo", "Join the team")}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                      strokeWidth={1.5}
                    />
                  </a>
                </Magnetico>
              </Aparecer>
            </div>
          </aside>
        </div>
      </section>

      <section aria-label={t("Alcance", "Reach")} className="overflow-hidden border-t border-mdh-niebla bg-mdh-hueso py-10 md:py-14">
        <Marquesina duracion={40}>
          {regiones.map((region) => (
            <span
              key={region}
              className="flex items-center text-[clamp(2.5rem,6vw,5.5rem)] font-extralight leading-none tracking-[-0.03em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(23,24,25,0.35)] hover:text-mdh-tinta"
            >
              {region}
              <span aria-hidden="true" className="mx-10 text-[0.25em] text-mdh-tinta/25 [-webkit-text-stroke:0]">
                ●
              </span>
            </span>
          ))}
        </Marquesina>
      </section>
    </>
  );
}

/** Tarjeta de canal directo: el fondo sube y la flecha gira al hover. */
function Canal({ etiqueta, valor, href }: { etiqueta: string; valor: string; href: string }) {
  return (
    <Aparecer>
      <a
        href={href}
        className="group relative block overflow-hidden border border-mdh-niebla p-7 transition-colors duration-700 hover:border-mdh-tinta"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 translate-y-full bg-mdh-tinta transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        />
        <span className="relative flex items-start justify-between gap-6">
          <span>
            <span className="mdh-label block text-mdh-pizarra transition-colors duration-500 group-hover:text-white/60">
              {etiqueta}
            </span>
            <span className="mt-3 block break-all text-xl font-light transition-colors duration-500 group-hover:text-white">
              {valor}
            </span>
          </span>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-mdh-tinta/20 transition-[rotate,border-color,color] duration-700 group-hover:rotate-45 group-hover:border-white/40 group-hover:text-white">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </span>
        </span>
      </a>
    </Aparecer>
  );
}
