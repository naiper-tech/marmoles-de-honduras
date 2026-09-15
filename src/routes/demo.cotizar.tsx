import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { useLang } from "@/lib/i18n";

const title = "Cotizar — Solicita tu cotización | Mármoles de Honduras";
const description =
  "Cuéntanos tu proyecto en piedra natural y te enviamos una cotización a la medida.";

export const Route = createFileRoute("/demo/cotizar")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CotizarPage,
});

function CotizarPage() {
  const { t } = useLang();
  const [enviado, setEnviado] = useState(false);

  const tipos = [
    t("Residencial", "Residential"),
    t("Comercial", "Commercial"),
    t("Institucional", "Institutional"),
    t("Distribución", "Distribution"),
  ];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviado(true);
  }

  const field =
    "mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <div className="mx-auto max-w-7xl px-5 md:px-8">
      <header className="pt-12 md:pt-20">
        <p className="eyebrow text-primary">{t("Cotizar", "Get a quote")}</p>
        <h1 className="mt-4 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1] sm:text-6xl">
          {t("Solicita tu cotización", "Request your quote")}
        </h1>
      </header>

      <div className="mt-12 grid gap-6 md:grid-cols-[1.3fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 md:p-8">
          {enviado ? (
            <div className="py-10 text-center">
              <h2 className="font-display text-2xl font-bold">{t("¡Gracias!", "Thank you!")}</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                {t(
                  "Recibimos tu solicitud. Te contactaremos en menos de 24 horas hábiles.",
                  "We received your request. We will get back to you within 24 business hours.",
                )}
              </p>
              <button
                type="button"
                onClick={() => setEnviado(false)}
                className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm"
              >
                {t("Enviar otra solicitud", "Send another request")}
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-medium">
                  {t("Nombre", "Name")}
                  <input
                    required
                    name="nombre"
                    className={field}
                    placeholder={t("Tu nombre", "Your name")}
                  />
                </label>
                <label className="block text-sm font-medium">
                  {t("Correo", "Email")}
                  <input
                    required
                    type="email"
                    name="correo"
                    className={field}
                    placeholder={t("tucorreo@ejemplo.com", "you@example.com")}
                  />
                </label>
                <label className="block text-sm font-medium">
                  {t("Teléfono", "Phone")}
                  <input name="telefono" className={field} placeholder="+504 0000 0000" />
                </label>
                <label className="block text-sm font-medium">
                  {t("Tipo de proyecto", "Project type")}
                  <select name="tipo" className={field} defaultValue={tipos[0]}>
                    {tipos.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="block text-sm font-medium">
                {t("Mensaje", "Message")}
                <textarea
                  required
                  name="mensaje"
                  rows={5}
                  className={field}
                  placeholder={t(
                    "Cuéntanos metros cuadrados, materiales de interés y fechas.",
                    "Tell us square meters, materials of interest and timeline.",
                  )}
                />
              </label>
              <button
                type="submit"
                className="btn-lux justify-self-start rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground"
              >
                {t("Enviar solicitud", "Send request")}
              </button>
            </form>
          )}
        </div>

        <aside className="grid gap-4 self-start">
          <div className="rounded-3xl bg-secondary p-6">
            <p className="eyebrow text-muted-foreground">
              {t("Showroom y planta", "Showroom and plant")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground">
              {t(
                "Honduras, Centroamérica. Visítanos para ver las losas completas antes de decidir.",
                "Honduras, Central America. Visit us to see the full slabs before deciding.",
              )}
            </p>
          </div>
          <div className="rounded-3xl bg-secondary p-6">
            <p className="eyebrow text-muted-foreground">{t("Horario", "Hours")}</p>
            <ul className="mt-3 space-y-1 text-sm text-foreground">
              <li>{t("Lunes a viernes · 8:00 – 17:00", "Monday to Friday · 8:00 – 17:00")}</li>
              <li>{t("Sábados · 8:00 – 12:00", "Saturdays · 8:00 – 12:00")}</li>
              <li>{t("Domingos · cerrado", "Sundays · closed")}</li>
            </ul>
          </div>
          <div className="rounded-3xl bg-ink p-6 text-background">
            <p className="eyebrow opacity-70">{t("Distribución", "Distribution")}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-90">
              {t(
                "Atendemos proyectos nacionales e internacionales, con logística para obra en curso.",
                "We serve national and international projects, with logistics for work in progress.",
              )}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
