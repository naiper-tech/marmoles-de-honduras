import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import taller from "@/assets/artesano-acabado.jpg";
import plantaAerea from "@/assets/planta-aerea.jpg";
import { CasaMarmol } from "@/components/home/casa-marmol";
import { Cierre } from "@/components/home/cierre";
import { TextoPorScroll } from "@/components/home/efectos";
import { GaleriaPlanta } from "@/components/home/galeria-planta";
import { Aparecer, EASE, ImagenRevelada } from "@/components/home/movimiento";
import { PortadaPagina } from "@/components/home/portada-pagina";
import { Valores } from "@/components/home/valores";
import { MISION, VISION, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/_sitio/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Mármoles de Honduras" },
      {
        name: "description",
        content:
          "Empresa familiar hondureña fundada en 1970, líder en la fabricación y distribución de piedra natural.",
      },
    ],
  }),
  component: Nosotros,
});

function Nosotros() {
  const { t, lang } = useLang();
  const tx = useTexto();

  const principios = [
    { titulo: t("Misión", "Mission"), texto: tx(MISION) },
    { titulo: t("Visión", "Vision"), texto: tx(VISION) },
  ];

  return (
    <>
      <PortadaPagina
        numero="01"
        etiqueta={t("Nosotros", "About")}
        lineas={lang === "en" ? ["More than 55 years", "shaping stone."] : ["Más de 55 años", "dando forma a la piedra."]}
        imagen={taller}
        alt={t(
          "Artesano de Mármoles de Honduras terminando una pieza de piedra",
          "A Mármoles de Honduras craftsman finishing a stone piece",
        )}
      />

      <section aria-labelledby="quienes-titulo" className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
          <div className="grid gap-10 md:grid-cols-12">
            <Aparecer className="md:col-span-3">
              <h2 id="quienes-titulo" className="mdh-label text-mdh-pizarra">
                {t("Quiénes somos", "Who we are")}
              </h2>
            </Aparecer>
            <TextoPorScroll
              key={lang}
              className="text-[clamp(1.75rem,3.5vw,3.4rem)] font-light leading-[1.18] tracking-[-0.02em] md:col-span-9"
              texto={t(
                "Somos una empresa familiar hondureña que desde 1970 trabaja la piedra natural. Nos encargamos de todo el proceso: suministramos el material, lo fabricamos en nuestra planta y lo instalamos en Honduras o lo exportamos a Estados Unidos, Centroamérica y el Caribe.",
                "We are a Honduran family company that has worked natural stone since 1970. We handle the whole process: we supply the material, fabricate it in our plant, and install it in Honduras or export it to the United States, Central America and the Caribbean.",
              )}
            />
          </div>

          <div className="mt-28 md:mt-40">
            {principios.map((principio, i) => (
              <div
                key={principio.titulo}
                className="group grid gap-6 border-t border-mdh-niebla py-12 last:border-b md:grid-cols-12 md:py-16"
              >
                <div className="flex items-center gap-4 md:col-span-3">
                  <span className="mdh-label text-mdh-pizarra">{String(i + 1).padStart(2, "0")}</span>
                  <motion.span
                    aria-hidden="true"
                    className="block h-px w-8 origin-left bg-mdh-tinta"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 1 }}
                    transition={{ duration: 1, ease: EASE }}
                  />
                  <span className="mdh-label">{principio.titulo}</span>
                </div>
                <Aparecer className="md:col-span-9">
                  <p className="max-w-4xl text-[clamp(1.6rem,2.8vw,2.6rem)] font-light leading-[1.3] tracking-[-0.015em]">
                    {principio.texto}
                  </p>
                </Aparecer>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LaPlanta />
      <GaleriaPlanta />
      <Valores />
      <CasaMarmol />
      <Cierre />
    </>
  );
}

/**
 * La planta (ronda 1, #7, #8 y #38): foto aérea a un lado y cifras al otro. Los
 * metrajes se retiraron porque cambiaron; el cliente confirmará los nuevos.
 */
function LaPlanta() {
  const { t } = useLang();

  const cifras = [
    { dato: "1970", etiqueta: t("Año de fundación", "Founded") },
    { dato: "70+", etiqueta: t("Artesanos en planta", "Craftsmen on the floor") },
    { dato: "24 h", etiqueta: t("Desde EE. UU. para inspección", "From the U.S. for an inspection") },
  ];

  return (
    <section aria-labelledby="planta-titulo" className="bg-mdh-hueso">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-32">
        <ImagenRevelada
          src={plantaAerea}
          alt={t(
            "Vista aérea de la planta de Mármoles de Honduras al sur de Tegucigalpa",
            "Aerial view of the Mármoles de Honduras plant south of Tegucigalpa",
          )}
          className="aspect-[4/3] bg-mdh-niebla md:col-span-7"
          imgClassName="h-full w-full object-cover"
        />

        <div className="md:col-span-5 md:pl-6">
          <Aparecer>
            <h2 id="planta-titulo" className="mdh-label text-mdh-pizarra">
              {t("La planta", "The plant")}
            </h2>
            <p className="mt-6 text-[clamp(1.6rem,2.6vw,2.4rem)] font-light leading-[1.25] tracking-[-0.015em]">
              {t(
                "Fabricamos al sur de Tegucigalpa, sobre la Carretera al Sur.",
                "We fabricate south of Tegucigalpa, on the Carretera al Sur.",
              )}
            </p>
          </Aparecer>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-mdh-tinta/10 pt-10">
            {cifras.map((cifra, i) => (
              // dt antes que dd en el DOM (orden válido); la cifra se ve arriba.
              <Aparecer key={cifra.dato} retraso={i * 0.08} className="flex flex-col-reverse justify-end gap-4">
                <dt className="mdh-label leading-relaxed text-mdh-pizarra">{cifra.etiqueta}</dt>
                <dd className="text-[clamp(1.9rem,3.2vw,3rem)] font-extralight leading-none tracking-[-0.03em]">
                  {cifra.dato}
                </dd>
              </Aparecer>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
