import { motion } from "motion/react";

import planta from "@/assets/losa-tallada.jpg";
import { useLang } from "@/lib/i18n";
import { TextoPorScroll } from "./efectos";
import { ImagenExpansiva } from "./imagen-expansiva";
import { Aparecer, EASE } from "./movimiento";

/** La empresa: una declaración que se lee al ritmo del scroll y tres pilares. */
export function Manifiesto() {
  const { t, lang } = useLang();

  const pilares = [
    {
      n: "01",
      titulo: t("Cantera propia", "Own quarries"),
      texto: t(
        "Controlamos el origen de la piedra desde el primer bloque.",
        "We control the origin of the stone from the very first block.",
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
      titulo: t("Exportación", "Export"),
      texto: t(
        "Logística internacional hacia Estados Unidos, Centroamérica y el Caribe.",
        "International logistics to the United States, Central America and the Caribbean.",
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
              "Somos fabricantes. Extraemos la piedra en canteras propias, la transformamos en nuestra planta y la entregamos lista para instalar, en Honduras y fuera de ella.",
              "We are manufacturers. We quarry the stone ourselves, transform it in our own plant and deliver it ready to install, in Honduras and beyond.",
            )}
          />
        </div>

        <ol className="mt-24 grid gap-14 md:mt-36 md:grid-cols-12 md:gap-10">
          {pilares.map((pilar, i) => (
            <li key={pilar.n} className={`group md:col-span-3 ${i === 0 ? "md:col-start-4" : ""}`}>
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
                  <h3 className="text-2xl font-light transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
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
          "Operario de Mármoles de Honduras cortando losas en la planta",
          "A Mármoles de Honduras craftsman cutting slabs at the plant",
        )}
        etiqueta={t("Nuestra planta · Honduras", "Our plant · Honduras")}
        frase={t(
          "Cada pieza pasa por manos que llevan décadas trabajando la piedra.",
          "Every piece passes through hands that have worked stone for decades.",
        )}
      />
    </section>
  );
}
