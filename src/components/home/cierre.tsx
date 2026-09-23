import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CONTACTO, correoCon, type Bilingue } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Magnetico } from "./efectos";
import { Aparecer, Emerge } from "./movimiento";

/**
 * Cierre de página: una sola acción, grande y magnética, hacia el formulario, y los
 * datos de contacto directos. Compacto a propósito (ronda 1, #32).
 * `lineas` separa los renglones del titular con "|".
 */
export function Cierre({ lineas }: { lineas?: Bilingue }) {
  const { t, lang } = useLang();
  const renglones = lineas
    ? (lang === "en" ? lineas.en : lineas.es).split("|")
    : lang === "en"
      ? ["Have a project", "in mind?"]
      : ["¿Tienes un proyecto", "en mente?"];

  const datos = [
    {
      etiqueta: t("Correo", "Email"),
      valor: CONTACTO.correo,
      href: correoCon(t("Consulta de proyecto", "Project inquiry")),
    },
    { etiqueta: t("Teléfono", "Phone"), valor: CONTACTO.telefono, href: CONTACTO.telefonoHref },
    {
      etiqueta: t("Oficinas", "Offices"),
      valor: CONTACTO.direccion,
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Mármoles de Honduras, ${CONTACTO.direccion}`)}`,
    },
  ];

  return (
    <section id="contacto" aria-labelledby="cierre-titulo" className="overflow-hidden bg-mdh-acero text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        <p className="mdh-label text-white/55">{t("Contacto", "Contact")}</p>

        <div className="mt-8 grid items-end gap-12 lg:grid-cols-12">
          <h2
            id="cierre-titulo"
            className="text-[clamp(2.6rem,5.2vw,5.25rem)] font-extralight leading-[0.95] tracking-[-0.035em] lg:col-span-9"
          >
            <Emerge key={renglones.join("|")} lineas={renglones} />
          </h2>

          <Aparecer retraso={0.2} className="lg:col-span-3 lg:flex lg:justify-end">
            <Magnetico fuerza={0.4}>
              <Link
                to="/contacto"
                className="group relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-white text-mdh-tinta md:h-44 md:w-44"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 translate-y-full rounded-full bg-mdh-tinta transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                />
                <span className="relative flex flex-col items-center gap-3 transition-colors duration-500 group-hover:text-white">
                  <ArrowUpRight
                    className="h-7 w-7 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
                    strokeWidth={1.25}
                  />
                  <span className="mdh-label">{t("Hablemos", "Let's talk")}</span>
                </span>
              </Link>
            </Magnetico>
          </Aparecer>
        </div>

        <div className="mt-14 grid gap-8 border-t border-white/15 pt-8 md:mt-16 md:grid-cols-3">
          {datos.map((dato) => (
            <div key={dato.etiqueta}>
              <p className="mdh-label text-white/45">{dato.etiqueta}</p>
              <a
                href={dato.href}
                {...(dato.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mdh-enlace mt-3 inline-block break-words text-lg font-light md:text-xl"
              >
                {dato.valor}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
