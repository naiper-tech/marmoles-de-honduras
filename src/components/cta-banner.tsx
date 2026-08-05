import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

import heroMarble from "@/assets/hero-marble.jpg";
import { WHATSAPP_URL } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";

type Props = {
  eyebrow?: string;
  titulo?: string;
  texto?: string;
  cta?: string;
};

/** Banner de cierre: marquesina tipográfica, veta en movimiento y doble acción. */
export function CtaBanner({ eyebrow, titulo, texto, cta }: Props) {
  const { t } = useLang();
  const eyebrowTxt = eyebrow ?? t("Siguiente paso", "Next step");
  const tituloTxt = titulo ?? t("Cuéntanos tu proyecto", "Tell us about your project");
  const textoTxt =
    texto ??
    t(
      "Te ayudamos a elegir la piedra correcta, calcular el material y coordinar la instalación.",
      "We help you choose the right stone, estimate the material and coordinate the installation.",
    );
  const ctaTxt = cta ?? t("Solicitar cotización", "Request a quote");

  return (
    <section className="mx-auto mt-20 max-w-7xl px-5 md:mt-32 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative isolate overflow-hidden rounded-[2.5rem] bg-ink text-background"
      >
        <img
          src={heroMarble}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_115%,color-mix(in_oklab,var(--stone)_45%,transparent),transparent_65%)]"
        />

        <div className="relative px-6 py-20 text-center md:px-10 md:py-28">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-stone" />
            <p className="eyebrow text-stone">{eyebrowTxt}</p>
            <span className="h-px w-8 bg-stone" />
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] sm:text-7xl">
            {tituloTxt}
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-background/70">
            {textoTxt}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/cotizar"
              className="btn-lux group inline-flex items-center gap-2 rounded-full bg-background px-8 py-4 text-sm font-medium text-foreground"
            >
              {ctaTxt}
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-lux inline-flex items-center gap-2 rounded-full border border-background/30 px-8 py-4 text-sm font-medium text-background"
            >
              <MessageCircle className="h-4 w-4" />
              {t("Escribir por WhatsApp", "Message us on WhatsApp")}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}