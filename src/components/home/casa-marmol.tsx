import { ArrowUpRight } from "lucide-react";

import interior from "@/assets/proy-la-gorce.jpg";
import { CASA_MARMOL_URL } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Aparecer, ImagenRevelada } from "./movimiento";

/** Puente hacia Casa Mármol: explica la relación entre ambas empresas y redirige. */
export function CasaMarmol() {
  const { t } = useLang();

  return (
    <section aria-labelledby="casa-marmol-titulo" className="bg-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 md:grid-cols-12 md:px-10 md:py-36">
        <ImagenRevelada
          src={interior}
          alt={t("Interior residencial con acabados en mármol", "Residential interior with marble finishes")}
          className="aspect-[4/3] bg-mdh-niebla md:col-span-6"
          imgClassName="h-full w-full object-cover"
        />
        <Aparecer className="md:col-span-5 md:col-start-8">
          <p className="mdh-label text-mdh-pizarra">{t("Nuestra casa de diseño", "Our design house")}</p>
          <h2
            id="casa-marmol-titulo"
            className="mt-6 text-[clamp(2.4rem,4.2vw,4rem)] font-light leading-[1.04] tracking-[-0.015em]"
          >
            Casa Mármol
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mdh-acero">
            {t(
              "Mármoles de Honduras es la fábrica. Casa Mármol, nuestra empresa hija, lleva la piedra a tu espacio con acabados terminados en Honduras.",
              "Mármoles de Honduras is the factory. Casa Mármol, our design subsidiary, brings stone into your space with finished surfaces in Honduras.",
            )}
          </p>
          <a
            href={CASA_MARMOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mdh-label group mt-10 inline-flex items-center gap-3 border-b border-mdh-tinta pb-2"
          >
            {t("Visitar Casa Mármol", "Visit Casa Mármol")}
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </a>
        </Aparecer>
      </div>
    </section>
  );
}
