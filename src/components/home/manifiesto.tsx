import { motion } from "motion/react";

import planta from "@/assets/losa-tallada.jpg";
import { useLang } from "@/lib/i18n";
import { TextoPorScroll } from "./efectos";
import { ImagenExpansiva } from "./imagen-expansiva";
import { Aparecer, EASE } from "./movimiento";

/** La empresa: una declaración que se lee al ritmo del scroll y cuatro pilares. */
export function Manifiesto() {
  const { t, lang } = useLang();

  // Ronda 1 (#19–#21, #26): cuatro pilares en el orden del proceso.
  const pilares = [
    {
      n: "01",
      titulo: t("Materiales", "Materials"),
      texto: t(
        "Suministramos el material que especifica cada proyecto, a través de una red global de proveedores.",
        "We supply the material each project specifies, through a global network of suppliers.",
      ),
    },
    {
      n: "02",
      titulo: t("Fabricación", "Fabrication"),
      texto: t(
        "Tecnología de punta para proyectos de alta producción.",
        "State-of-the-art technology for high-volume projects.",
      ),
    },
    {
      n: "03",
      titulo: t("Instalación", "Installation"),
      texto: t(
        "En Honduras, nuestro equipo acompaña cada pieza hasta su lugar final.",
        "In Honduras, our team takes every piece all the way to its final place.",
      ),
    },
    {
      n: "04",
      titulo: t("Exportación", "Export"),
      texto: t(
        "Logística nacional e internacional hasta la obra, en Honduras, Estados Unidos, Centroamérica y el Caribe.",
        "Domestic and international logistics all the way to the site, in Honduras, the United States, Central America and the Caribbean.",
      ),
    },
  ];

  return (
    <section id="nosotros" aria-labelledby="empresa-titulo" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-28 md:px-10 md:pt-44">
        <div className="grid gap-10 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <h2 id="empresa-titulo" className="mdh-label text-mdh-pizarra">
              {t("La empresa", "The company")}
            </h2>
          </Aparecer>
          <TextoPorScroll
            key={lang}
            className="text-[clamp(1.85rem,3.9vw,3.75rem)] font-light leading-[1.16] tracking-[-0.02em] md:col-span-9"
            texto={t(
              "Suministramos, fabricamos e instalamos piedra natural para proyectos residenciales, comerciales e institucionales en Honduras, Estados Unidos, Centroamérica y el Caribe.",
              "We supply, fabricate and install natural stone for residential, commercial and institutional projects in Honduras, the United States, Central America and the Caribbean.",
            )}
          />
        </div>

        <ol className="mt-24 grid gap-14 sm:grid-cols-2 md:mt-36 md:gap-10 lg:grid-cols-4">
          {pilares.map((pilar, i) => (
            <li key={pilar.n} className="group">
              <motion.span
                aria-hidden="true"
                className="block h-px origin-left bg-mdh-tinta"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 1.4, ease: EASE, delay: i * 0.15 }}
              />
              <Aparecer retraso={0.2 + i * 0.12} y={16}>
                <div className="flex items-baseline justify-between gap-4 pt-6">
                  <h3 className="text-[1.75rem] font-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {pilar.titulo}
                  </h3>
                  <span className="mdh-label text-mdh-pizarra">{pilar.n}</span>
                </div>
                <p className="mt-4 leading-relaxed text-mdh-acero">{pilar.texto}</p>
              </Aparecer>
            </li>
          ))}
        </ol>
      </div>

      <ImagenExpansiva
        className="mt-24 md:mt-32"
        imagen={planta}
        alt={t(
          "Losa de mármol tallada por CNC en la planta de Mármoles de Honduras",
          "A CNC-carved marble slab at the Mármoles de Honduras plant",
        )}
        centrado
        frase={t(
          "Cada pieza pasa por manos que llevan décadas trabajando la piedra.",
          "Every piece passes through hands that have worked stone for decades.",
        )}
      />
    </section>
  );
}
