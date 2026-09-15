import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import cantera from "@/assets/cover-video.jpg";
import exportacion from "@/assets/proy-taylorsville.jpg";
import casa from "@/assets/proy-cocoplum.jpg";
import planta from "@/assets/planta-aerea.jpg";
import taller from "@/assets/artesano-acabado.jpg";
import { capitulos, useTexto, type Capitulo } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Emerge, EASE, ImagenRevelada } from "./movimiento";

const pad = (n: number) => String(n).padStart(2, "0");

/** PROVISIONAL: una foto por capítulo hasta tener archivo histórico del cliente. */
const IMAGENES = [taller, cantera, planta, exportacion, casa];

/**
 * Nuestra historia. En escritorio el hito del capítulo queda fijo a la izquierda y
 * cambia a medida que cada capítulo cruza el centro de la pantalla.
 */
export function LineaTiempo() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [activo, setActivo] = useState(0);
  const actual = capitulos[activo];
  const marca = tx(actual.marca);
  const esNumero = /^\d+$/.test(marca);

  return (
    <section aria-labelledby="linea-tiempo-titulo" className="bg-mdh-hueso">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <p className="mdh-label text-mdh-pizarra md:col-span-3">{t("Nuestra historia", "Our story")}</p>
          <h2
            id="linea-tiempo-titulo"
            className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.015em] md:col-span-9"
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

        <div className="mt-20 grid gap-20 md:mt-32 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:col-span-5 lg:block">
            <div className="sticky top-28 flex h-[calc(100vh-10rem)] flex-col justify-between py-4">
              <div className="flex items-center gap-4">
                <span className="mdh-label">
                  {t("Capítulo", "Chapter")} {actual.numero}
                </span>
                <span aria-hidden="true" className="h-px flex-1 bg-mdh-tinta/15" />
                <span className="mdh-label tabular-nums text-mdh-pizarra">
                  {pad(activo + 1)} / {pad(capitulos.length)}
                </span>
              </div>

              <div className="relative flex flex-1 items-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={marca}
                    initial={{ y: "70%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-70%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className={`font-extralight leading-[0.85] tracking-[-0.05em] ${
                      esNumero ? "text-[clamp(6rem,13vw,13rem)]" : "text-[clamp(3.25rem,5.6vw,6rem)]"
                    }`}
                  >
                    {marca}
                  </motion.p>
                </AnimatePresence>
              </div>

              <ol aria-hidden="true" className="flex gap-2">
                {capitulos.map((capitulo, i) => (
                  <li key={capitulo.numero} className="h-px flex-1 overflow-hidden bg-mdh-tinta/15">
                    <motion.span
                      className="block h-px origin-left bg-mdh-tinta"
                      initial={false}
                      animate={{ scaleX: i <= activo ? 1 : 0 }}
                      transition={{ duration: 0.8, ease: EASE }}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <ol className="space-y-24 lg:col-span-6 lg:col-start-7 lg:space-y-0">
            {capitulos.map((capitulo, i) => (
              <CapituloItem
                key={capitulo.numero}
                capitulo={capitulo}
                imagen={IMAGENES[i]}
                alActivar={() => setActivo(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function CapituloItem({
  capitulo,
  imagen,
  alActivar,
}: {
  capitulo: Capitulo;
  imagen: string;
  alActivar: () => void;
}) {
  const { t } = useLang();
  const tx = useTexto();
  const ref = useRef<HTMLLIElement>(null);
  // Activo cuando cruza la franja central de la pantalla.
  const enCentro = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (enCentro) alActivar();
    // alActivar cambia en cada render del padre; solo importa el cruce.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enCentro]);

  return (
    <li ref={ref} className="group lg:flex lg:min-h-[88vh] lg:items-center">
      <div className="w-full">
        <ImagenRevelada
          src={imagen}
          alt=""
          className="aspect-[4/3] bg-mdh-niebla"
          imgClassName="h-full w-full object-cover grayscale-[35%] transition-[filter,scale] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:grayscale-0"
        />
        <div className="mt-8 flex items-center gap-4">
          <span className="mdh-label text-mdh-pizarra">
            {t("Capítulo", "Chapter")} {capitulo.numero}
          </span>
          <span aria-hidden="true" className="h-px w-8 bg-mdh-tinta/20" />
          <span className="mdh-label">{tx(capitulo.marca)}</span>
        </div>
        <h3 className="mt-5 text-3xl font-light transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2 md:text-4xl">
          {tx(capitulo.titulo)}
        </h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-mdh-acero">{tx(capitulo.texto)}</p>
      </div>
    </li>
  );
}
