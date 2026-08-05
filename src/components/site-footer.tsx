import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

import { WHATSAPP_URL } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useLang();

  const nav = [
    { to: "/", label: t("Home", "Home") },
    { to: "/nosotros", label: t("Nosotros", "About") },
    { to: "/servicios", label: t("Servicios", "Services") },
    { to: "/proyectos", label: t("Proyectos", "Projects") },
    { to: "/cotizar", label: t("Cotizar", "Get a quote") },
  ] as const;

  const materiales = [
    t("Mármol", "Marble"),
    t("Granito", "Granite"),
    t("Cuarcita", "Quartzite"),
    t("Ónix", "Onyx"),
    t("Travertino", "Travertine"),
  ];

  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-background">
      {/* palabra de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      >
        <p className="translate-y-[10%] whitespace-nowrap py-[3vw] text-center font-display text-[18vw] font-extrabold leading-none tracking-tighter text-background/[0.05]">
          MÁRMOLES
        </p>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 md:px-8 md:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.9fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-stone font-display text-sm font-bold text-ink">
                M
              </span>
              <span className="font-display text-lg font-bold">Mármoles de Honduras</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-background/60">
              {t(
                "Más de 50 años seleccionando bloque, cortando en planta propia y montando piedra natural en obra. Empresa familiar, hecha en Honduras.",
                "Over 50 years selecting blocks, cutting in our own plant and installing natural stone on site. A family company, made in Honduras.",
              )}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-lux mt-7 inline-flex items-center gap-2 rounded-full border border-background/25 px-6 py-3 text-sm font-medium text-background"
            >
              {t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className="eyebrow text-background/40">{t("Navegación", "Navigation")}</p>
            <ul className="mt-5 space-y-1">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-center gap-2 py-1 text-sm text-background/60 transition-colors hover:text-background"
                  >
                    <motion.span
                      aria-hidden="true"
                      className="h-px bg-stone"
                      initial={{ width: 0 }}
                      whileHover={{ width: 16 }}
                    />
                    <span className="transition-transform duration-500 group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-background/40">{t("Materiales", "Materials")}</p>
            <ul className="mt-5 space-y-1 text-sm text-background/60">
              {materiales.map((m) => (
                <li key={m} className="py-1">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-background/40">{t("Contacto", "Contact")}</p>
            <ul className="mt-5 space-y-2 text-sm text-background/60">
              <li>Tegucigalpa, Honduras</li>
              <li>{t("Cobertura nacional y Centroamérica", "Nationwide and Central America")}</li>
              <li className="pt-2 text-background/45">
                {t("Lunes a viernes · 8:00 – 17:00", "Monday to Friday · 8:00 – 17:00")}
              </li>
              <li className="text-background/45">
                {t("Sábados · 8:00 – 12:00", "Saturdays · 8:00 – 12:00")}
              </li>
            </ul>
            <Link
              to="/cotizar"
              className="btn-lux mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
            >
              {t("Solicitar cotización", "Request a quote")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-background/15 pb-[14vw] pt-8 text-xs text-background/45">
          <p>
            © {new Date().getFullYear()} Mármoles de Honduras.{" "}
            {t("Todos los derechos reservados.", "All rights reserved.")}
          </p>
          <p className="uppercase tracking-[0.22em]">
            {t("Piedra natural · desde 1972", "Natural stone · since 1972")}
          </p>
        </div>
      </div>
    </footer>
  );
}