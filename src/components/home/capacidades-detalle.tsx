import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import { capacidades, useTexto, type Capacidad } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { EASE, Emerge } from "./movimiento";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Capacidades en detalle. En escritorio la foto queda fija y cambia con una cortina
 * cada vez que otra capacidad llega al centro de la pantalla.
 */
export function CapacidadesDetalle() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [activa, setActiva] = useState(0);
  const actual = capacidades[activa];

  return (
    <section aria-labelledby="capacidades-titulo" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        {/* Ronda 1 (#44): el nombre de la sección es el titular, para que se lea como un bloque aparte. */}
        <div className="flex flex-col gap-6 border-b border-mdh-niebla pb-12 md:flex-row md:items-end md:justify-between md:pb-16">
          <h2
            id="capacidades-titulo"
            className="text-[clamp(3.25rem,9vw,8.5rem)] font-extralight leading-[0.9] tracking-[-0.04em]"
          >
            <Emerge key={lang} lineas={[t("Capacidades", "Capabilities")]} />
          </h2>
          <p className="max-w-xs text-lg leading-relaxed text-mdh-acero md:pb-3 md:text-right">
            {t("Todo a la medida de tu proyecto.", "Everything made to your project.")}
          </p>
        </div>

        <div className="mt-16 grid gap-16 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-28 h-[calc(100vh-10rem)]">
              <div className="relative h-full overflow-hidden bg-mdh-niebla">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={actual.id}
                    src={actual.imagen}
                    alt={tx(actual.titulo)}
                    initial={{ clipPath: "inset(100% 0% 0% 0%)", scale: 1.18 }}
                    animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1 }}
                    exit={{ opacity: 0.999 }}
                    transition={{ duration: 1.1, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-[linear-gradient(to_top,rgba(23,24,25,0.75)_0%,rgba(23,24,25,0)_100%)] p-8 pt-24 text-white">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={actual.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="text-2xl font-light"
                    >
                      {tx(actual.titulo)}
                    </motion.p>
                  </AnimatePresence>
                  <span className="mdh-label shrink-0 tabular-nums">
                    {pad(activa + 1)} / {pad(capacidades.length)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:col-span-5 lg:col-start-8">
            {capacidades.map((capacidad, i) => (
              <ItemCapacidad
                key={capacidad.id}
                capacidad={capacidad}
                numero={i + 1}
                activa={activa === i}
                alActivar={() => setActiva(i)}
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ItemCapacidad({
  capacidad,
  numero,
  activa,
  alActivar,
}: {
  capacidad: Capacidad;
  numero: number;
  activa: boolean;
  alActivar: () => void;
}) {
  const tx = useTexto();
  const ref = useRef<HTMLLIElement>(null);
  const enCentro = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (enCentro) alActivar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enCentro]);

  return (
    <li
      ref={ref}
      className={`group border-t border-mdh-niebla py-12 transition-opacity duration-700 first:border-t-0 lg:flex lg:min-h-[64vh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-0 ${
        activa ? "lg:opacity-100" : "lg:opacity-25"
      }`}
    >
      <img src={capacidad.imagen} alt="" loading="lazy" className="mb-8 aspect-[4/3] w-full object-cover lg:hidden" />
      <span className="block text-[clamp(3.5rem,6vw,5.5rem)] font-extralight leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1px_var(--color-mdh-pizarra)] transition-colors duration-700 group-hover:text-mdh-tinta">
        {pad(numero)}
      </span>
      <h3 className="mt-6 text-3xl font-light md:text-4xl">{tx(capacidad.titulo)}</h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-mdh-acero">{tx(capacidad.detalle)}</p>
    </li>
  );
}
