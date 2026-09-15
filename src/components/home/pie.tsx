import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { CASA_MARMOL_URL, CONTACTO, REDES, correoCon } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import logoClaro from "@/assets/logo-mdh-horizontal-claro.png";

export function Pie() {
  const { t } = useLang();

  const enlaces = [
    { to: "/", label: t("Inicio", "Home") },
    { to: "/nosotros", label: t("Nosotros", "About") },
    { to: "/produccion", label: t("Producción", "Production") },
    { to: "/proyectos", label: t("Proyectos", "Projects") },
    { to: "/contacto", label: t("Contacto", "Contact") },
  ] as const;

  // PROVISIONAL: páginas legales en preparación (plantillas de privacidad, términos y cookies).
  const legales = [t("Privacidad", "Privacy"), t("Términos", "Terms"), t("Cookies", "Cookies")];

  return (
    <footer className="overflow-hidden bg-mdh-tinta text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid gap-14 border-b border-white/15 pb-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <img
              src={logoClaro}
              alt="Mármoles de Honduras S.A."
              className="h-9 w-auto md:h-10"
              loading="lazy"
            />
            <p className="mt-5 max-w-xs leading-relaxed text-white/60">
              {t(
                "Fabricantes y exportadores de piedra natural desde 1970.",
                "Natural stone manufacturers and exporters since 1970.",
              )}
            </p>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/40">
              Honduras · {t("Estados Unidos", "United States")} · {t("Centroamérica", "Central America")}{" "}
              · {t("El Caribe", "The Caribbean")}
            </p>
          </div>

          <nav aria-label={t("Pie de página", "Footer")} className="md:col-span-2 md:col-start-6">
            <p className="mdh-label text-white/40">{t("Sitio", "Site")}</p>
            <ul className="mt-5 space-y-3">
              {enlaces.map((enlace) => (
                <li key={enlace.to}>
                  <Link
                    to={enlace.to}
                    activeOptions={{ exact: true }}
                    className="mdh-enlace text-white/75 transition-colors hover:text-white"
                  >
                    {enlace.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="mdh-label text-white/40">{t("Contacto", "Contact")}</p>
            <ul className="mt-5 space-y-3 text-white/75">
              <li>
                <a
                  href={correoCon(t("Consulta de proyecto", "Project inquiry"))}
                  className="mdh-enlace break-all transition-colors hover:text-white"
                >
                  {CONTACTO.correo}
                </a>
              </li>
              <li>
                <a href={CONTACTO.telefonoHref} className="mdh-enlace transition-colors hover:text-white">
                  {CONTACTO.telefono}
                </a>
              </li>
              <li className="pt-4">
                <a
                  href={correoCon(t("Únete al equipo — CV", "Join the team — CV"), CONTACTO.correoRRHH)}
                  className="mdh-label inline-flex items-center gap-2 text-white transition-opacity hover:opacity-80"
                >
                  {t("Únete al equipo", "Join the team")}
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="mdh-label text-white/40">{t("Síguenos", "Follow us")}</p>
            <ul className="mt-5 space-y-3">
              {REDES.map((red) => (
                <li key={red.nombre}>
                  <a
                    href={red.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mdh-enlace text-white/75 transition-colors hover:text-white"
                  >
                    {red.nombre}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href={CASA_MARMOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mdh-label inline-flex items-center gap-2 text-white transition-opacity hover:opacity-80"
                >
                  Casa Mármol
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 py-8 text-sm text-white/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Mármoles de Honduras.{" "}
            {t("Todos los derechos reservados.", "All rights reserved.")}
          </p>
          <ul className="flex gap-6">
            {legales.map((legal) => (
              <li key={legal}>
                <span aria-disabled="true" title={t("Próximamente", "Coming soon")}>
                  {legal}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none mt-10 -mb-[0.2em] select-none whitespace-nowrap text-center text-[17vw] font-extralight leading-none tracking-[-0.05em] text-white/[0.07]"
      >
        MÁRMOLES
      </p>
    </footer>
  );
}
