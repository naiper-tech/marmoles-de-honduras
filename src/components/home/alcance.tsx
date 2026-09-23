import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

import mapaUrl from "@/assets/mapa-alcance.svg";
import { paisesAlcance, proyectosPortafolio, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { MAPA } from "./mapa-alcance";
import { Aparecer, EASE, Emerge } from "./movimiento";

/**
 * Alcance (ronda 1, #28–#29): texto y mapa como una sola pieza. La lista de países
 * y los pines están enlazados: al pasar el cursor (o tocar) un país, su pin se
 * enciende y muestra el nombre y cuántas obras hay ahí; los demás se atenúan.
 *
 * El mapa se generó una sola vez con dotted-map y se recortó al continente;
 * no agrega peso en ejecución.
 */
export function Alcance() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [activo, setActivo] = useState<string | null>(null);

  // Obras por país, derivadas del portafolio: se actualiza solo al sumar proyectos.
  const obras = useMemo(() => {
    const conteo: Record<string, number> = {};
    for (const p of proyectosPortafolio) conteo[p.pais] = (conteo[p.pais] ?? 0) + 1;
    return conteo;
  }, []);

  const etiquetaObras = (n: number) =>
    n === 1 ? t("1 obra", "1 project") : t(`${n} obras`, `${n} projects`);

  return (
    <section id="alcance" aria-labelledby="alcance-titulo" className="scroll-mt-16 overflow-hidden bg-mdh-hueso">
      {/* Móvil: título → mapa → países, así el tooltip queda a la vista al tocar un país.
          Escritorio: título y países a la izquierda, mapa a la derecha abarcando ambas filas. */}
      <div className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-8 px-6 py-16 md:grid-cols-12 md:gap-y-0 md:px-10 md:py-20">
        <div className="order-1 md:order-none md:col-span-5 md:row-start-1 md:self-end lg:col-span-4">
          <h2
            id="alcance-titulo"
            className="text-[clamp(1.9rem,3.4vw,3.25rem)] font-light leading-[1.06] tracking-[-0.015em]"
          >
            <Emerge
              key={lang}
              lineas={lang === "en" ? ["Wherever your", "project is."] : ["Donde esté", "tu proyecto."]}
            />
          </h2>
        </div>

        <div className="order-3 md:order-none md:col-span-5 md:row-start-2 md:self-start lg:col-span-4">
          <ul
            className="grid md:mt-8 grid-cols-2 gap-x-6 border-t border-mdh-tinta/15"
            onPointerLeave={(e) => e.pointerType === "mouse" && setActivo(null)}
          >
            {paisesAlcance.map((p) => {
              const n = obras[p.pais] ?? 0;
              const encendido = activo === p.pin;
              const atenuado = activo !== null && !encendido;
              return (
                <li key={p.pin} className={`border-b border-mdh-tinta/15 ${p.pin === "honduras" ? "col-span-2" : ""}`}>
                  <button
                    type="button"
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActivo(p.pin)}
                    onFocus={() => setActivo(p.pin)}
                    onClick={() => setActivo(p.pin)}
                    aria-pressed={encendido}
                    className={`group flex min-h-12 w-full items-center justify-between gap-3 py-3 text-left transition-opacity duration-500 ${
                      atenuado ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={`h-1.5 w-1.5 shrink-0 rounded-full bg-mdh-tinta transition-transform duration-500 ${
                          encendido ? "scale-150" : "scale-100"
                        }`}
                      />
                      <span className="text-[1.05rem] font-light md:text-lg">{tx(p.nombre)}</span>
                      {p.pin === "honduras" && (
                        <span className="mdh-label text-[0.6rem] text-mdh-pizarra">{t("Sede y planta", "Headquarters & plant")}</span>
                      )}
                    </span>
                    {n > 0 && <span className="text-xs tabular-nums text-mdh-pizarra">{n}</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <Aparecer retraso={0.1}>
            <p className="mt-6 text-sm text-mdh-acero">
              {t("¿Tu país no aparece?", "Don't see your country?")}{" "}
              <Link to="/contacto" className="mdh-enlace text-mdh-tinta">
                {t("Escríbenos igual", "Write to us anyway")}
              </Link>
            </p>
          </Aparecer>
        </div>

        {/* El mapa arranca pegado al texto: se recortó el océano que los separaba. */}
        <Aparecer className="order-2 md:order-none md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:self-center lg:col-span-8 lg:col-start-5" y={20}>
          <div
            className="relative mx-auto w-full max-w-[680px] md:ml-0"
            style={{ aspectRatio: `${MAPA.ancho} / ${MAPA.alto}` }}
            role="img"
            aria-label={t(
              "Mapa de obra en Honduras, Estados Unidos, Guatemala, El Salvador, Nicaragua, Costa Rica y Bahamas",
              "Map of projects in Honduras, the United States, Guatemala, El Salvador, Nicaragua, Costa Rica and the Bahamas",
            )}
            onPointerLeave={() => setActivo(null)}
          >
            <img src={mapaUrl} alt="" className="absolute inset-0 h-full w-full" draggable={false} />

            {paisesAlcance.map((p) => {
              const pin = MAPA.pines[p.pin];
              if (!pin) return null;
              const encendido = activo === p.pin;
              const visible = activo === null || encendido;
              const n = obras[p.pais] ?? 0;
              return (
                <div
                  key={p.pin}
                  aria-hidden="true"
                  className="absolute"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%`, zIndex: encendido ? 20 : 10 }}
                >
                  {/* Zona sensible más grande que el punto: fácil de alcanzar con el cursor. */}
                  <span
                    onPointerEnter={() => setActivo(p.pin)}
                    className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full md:block"
                  />
                  <span
                    className={`pointer-events-none relative block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mdh-tinta transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      visible ? "opacity-100" : "opacity-20"
                    } ${encendido ? "scale-150" : "scale-100"} md:h-2.5 md:w-2.5`}
                  >
                    {visible && <span className="mdh-pulso absolute inset-0 rounded-full bg-mdh-tinta" />}
                  </span>

                  <AnimatePresence>
                    {encendido && (
                      <motion.span
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="pointer-events-none absolute bottom-full left-0 mb-3 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-mdh-tinta px-3.5 py-2 text-white shadow-[0_10px_30px_-12px_rgba(23,24,25,0.6)]"
                      >
                        <span className="text-[0.8rem] font-normal tracking-[0.02em]">{tx(p.nombre)}</span>
                        {n > 0 && (
                          <span className="border-l border-white/20 pl-2 text-[0.7rem] text-white/60">
                            {etiquetaObras(n)}
                          </span>
                        )}
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-mdh-tinta"
                        />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Aparecer>
      </div>
    </section>
  );
}
