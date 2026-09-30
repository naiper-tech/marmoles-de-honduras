import planta from "@/assets/losa-tallada.jpg";
import { useLang } from "@/lib/i18n";
import { TextoPorScroll } from "./efectos";
import { ImagenExpansiva } from "./imagen-expansiva";
import { Aparecer } from "./movimiento";

/**
 * La empresa: una declaración que se lee al ritmo del scroll. Los cuatro pilares
 * (Selección, Fabricación, Instalación, Exportación) se quitaron porque repetían los
 * paneles de Producción que siguen justo abajo.
 */
export function Manifiesto() {
  const { t, lang } = useLang();

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
              "Suministramos, fabricamos e instalamos piedra natural para proyectos residenciales, comerciales e institucionales a nivel nacional e internacional.",
              "We supply, fabricate and install natural stone for residential, commercial and institutional projects, at home and abroad.",
            )}
          />
        </div>
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
