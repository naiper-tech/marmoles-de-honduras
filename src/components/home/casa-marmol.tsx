import { ArrowUpRight } from "lucide-react";

import interior from "@/assets/proy-cocoplum.jpg";
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
          alt={t("Exterior terminado en piedra natural", "An outdoor space finished in natural stone")}
          className="aspect-[4/3] bg-mdh-niebla md:col-span-6"
          imgClassName="h-full w-full object-cover"
        />
        <Aparecer className="md:col-span-5 md:col-start-8">
          <p className="mdh-label text-mdh-pizarra">{t("Nuestro centro de diseño", "Our design center")}</p>
          <h2
            id="casa-marmol-titulo"
            className="mt-6 text-[clamp(2.4rem,4.2vw,4rem)] font-light leading-[1.04] tracking-[-0.015em]"
          >
            CasaMármol
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-mdh-acero">
            {t(
              "La experiencia de Mármoles de Honduras, llevada a tu espacio. En nuestros centros de diseño CasaMármol, en Tegucigalpa y San Pedro Sula, encontrarás piedra natural, muebles de cocina y baño, pisos, enchapes, griferías, electrodomésticos y exteriores. Desde ahí atendemos proyectos en todo Honduras.",
              "The Mármoles de Honduras experience, brought to your space. At our CasaMármol design centers in Tegucigalpa and San Pedro Sula you'll find natural stone, kitchen and bath cabinetry, flooring, cladding, fixtures, appliances and outdoor living. From there we serve projects across Honduras.",
            )}
          </p>
          <a
            href={CASA_MARMOL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mdh-label group mt-10 inline-flex items-center gap-3 border-b border-mdh-tinta pb-2"
          >
            {t("Visitar CasaMármol", "Visit CasaMármol")}
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
