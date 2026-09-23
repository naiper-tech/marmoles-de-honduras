import { useLang } from "@/lib/i18n";
import artesanoCorte from "@/assets/artesano-corte.jpg";
import cncFresado from "@/assets/cnc-fresado.jpg";
import rosetones from "@/assets/rosetones.jpg";
import artesanoTallado from "@/assets/artesano-tallado.jpg";
import sierraColumna from "@/assets/sierra-columna.jpg";
import pulidoMarmolNegro from "@/assets/pulido-marmol-negro.jpg";
import { Aparecer, Emerge, ImagenRevelada } from "./movimiento";

/**
 * Historia contada con fotos de planta (ronda 1, #39–#40): en lugar de la línea de
 * tiempo, una retícula irregular de fotografía real. Sin textos: la imagen dice más.
 */
export function GaleriaPlanta() {
  const { t, lang } = useLang();

  const fotos = [
    {
      src: artesanoCorte,
      alt: t("Artesano cortando una losa de mármol negro", "A craftsman cutting a black marble slab"),
      clase: "col-span-2 aspect-[4/5] md:col-span-7 md:row-span-2 md:aspect-auto",
    },
    {
      src: cncFresado,
      alt: t("Centro CNC fresando una pieza de piedra", "A CNC center milling a stone piece"),
      clase: "aspect-square md:col-span-5 md:aspect-[5/3]",
    },
    {
      src: rosetones,
      alt: t("Rosetón tallado a mano", "A hand-carved medallion"),
      clase: "aspect-square md:col-span-5 md:aspect-[5/3]",
    },
    {
      src: artesanoTallado,
      alt: t("Tallado a mano de un relieve en piedra", "Hand carving a stone relief"),
      clase: "aspect-square md:col-span-4 md:aspect-[4/5]",
    },
    {
      src: sierraColumna,
      alt: t("Disco de corte trabajando una columna de mármol", "A saw blade working a marble column"),
      clase: "aspect-square md:col-span-4 md:aspect-[4/5]",
    },
    {
      src: pulidoMarmolNegro,
      alt: t("Pulido de una pieza de mármol negro", "Polishing a black marble piece"),
      clase: "col-span-2 aspect-[4/3] md:col-span-4 md:aspect-[4/5]",
    },
  ];

  return (
    <section aria-labelledby="historia-titulo" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        {/* Titular centrado: rompe el patrón etiqueta-a-la-izquierda del resto de la página. */}
        <div className="mx-auto max-w-4xl text-center">
          <h2
            id="historia-titulo"
            className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.015em]"
          >
            <Emerge
              key={lang}
              lineas={
                lang === "en"
                  ? ["More than five decades,", "chapter by chapter."]
                  : ["Más de cinco décadas,", "capítulo por capítulo."]
              }
            />
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-3 md:mt-24 md:grid-cols-12 md:gap-4">
          {fotos.map((foto) => (
            <ImagenRevelada
              key={foto.src}
              src={foto.src}
              alt={foto.alt}
              className={`group relative bg-mdh-niebla ${foto.clase}`}
              imgClassName="h-full w-full object-cover transition-[scale] duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
