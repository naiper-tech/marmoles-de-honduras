import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import mapaUrl from "@/assets/mapa-alcance.svg";
import { paisesAlcance, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { HAWAI, MAPA, UBICACIONES } from "./mapa-alcance";
import { Aparecer, EASE, Emerge } from "./movimiento";

/**
 * Alcance: el gancho de la home (reunión 29/09). Un punto por lugar con obra
 * —varios en Florida, uno en Utah, otro en Hawái—, sin conteos por país. Al pasar
 * el cursor sale el lugar; al hacer clic se abre Proyectos filtrado por ese país.
 * La lista de países y los puntos se encienden juntos.
 */
export function Alcance() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [pais, setPais] = useState<string | null>(null);
  const [punto, setPunto] = useState<string | null>(null);

  const encender = (p: string | null, id: string | null = null) => {
    setPais(p);
    setPunto(id);
  };
  const liga = (p: string) => (p === "Bahamas" ? {} : { pais: p });

  return (
    <section id="alcance" aria-labelledby="alcance-titulo" className="scroll-mt-16 overflow-hidden bg-mdh-hueso">
      {/* Móvil: título → mapa → países. Escritorio: título y países a la izquierda, mapa a la derecha. */}
      <div className="mx-auto grid max-w-[1440px] gap-x-8 gap-y-8 px-6 py-16 md:grid-cols-12 md:gap-y-0 md:px-10 md:py-20">
        <div className="order-1 md:order-none md:col-span-5 md:row-start-1 md:self-end lg:col-span-4">
          <h2
            id="alcance-titulo"
            className="text-[clamp(1.9rem,3.4vw,3.25rem)] font-light leading-[1.06] tracking-[-0.015em]"
          >
            <Emerge
              key={lang}
              lineas={lang === "en" ? ["Delivered projects", "in Honduras and abroad."] : ["Obras entregadas", "dentro y fuera de Honduras."]}
            />
          </h2>
        </div>

        <div className="order-3 md:order-none md:col-span-5 md:row-start-2 md:self-start lg:col-span-4">
          <ul
            className="grid grid-cols-2 gap-x-6 border-t border-mdh-tinta/15 md:mt-8"
            onPointerLeave={(e) => e.pointerType === "mouse" && encender(null)}
          >
            {paisesAlcance.map((p) => {
              const encendido = pais === p.pais;
              const atenuado = pais !== null && !encendido;
              return (
                <li key={p.pin} className={`border-b border-mdh-tinta/15 ${p.pin === "honduras" ? "col-span-2" : ""}`}>
                  <Link
                    to="/proyectos"
                    search={liga(p.pais)}
                    onPointerEnter={(e) => e.pointerType === "mouse" && encender(p.pais)}
                    onFocus={() => encender(p.pais)}
                    className={`group flex min-h-12 w-full items-center gap-3 py-3 transition-opacity duration-500 ${
                      atenuado ? "opacity-35" : "opacity-100"
                    }`}
                  >
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
                  </Link>
                </li>
              );
            })}
          </ul>

          <Aparecer retraso={0.1}>
            <Link
              to="/proyectos"
              className="mdh-label group relative mt-8 inline-flex items-center gap-4 overflow-hidden bg-mdh-tinta px-7 py-5 text-white"
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 translate-y-full bg-mdh-acero transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
              />
              <span className="relative">{t("Conoce nuestros proyectos", "Explore our projects")}</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-700 group-hover:rotate-45" strokeWidth={1.5} />
            </Link>
          </Aparecer>
        </div>

        <Aparecer className="order-2 md:order-none md:col-span-7 md:col-start-6 md:row-span-2 md:row-start-1 md:self-center lg:col-span-8 lg:col-start-5" y={20}>
          <div
            className="relative mx-auto w-full max-w-[680px] md:ml-0"
            style={{ aspectRatio: `${MAPA.ancho} / ${MAPA.alto}` }}
            role="img"
            aria-label={t(
              "Mapa de obras entregadas en Estados Unidos, Honduras, Guatemala, El Salvador, Nicaragua, Costa Rica y Bahamas",
              "Map of delivered projects in the United States, Honduras, Guatemala, El Salvador, Nicaragua, Costa Rica and the Bahamas",
            )}
            onPointerLeave={() => encender(null)}
          >
            <img src={mapaUrl} alt="" className="absolute inset-0 h-full w-full" draggable={false} />

            {UBICACIONES.map((u) => (
              <Punto
                key={u.id}
                x={u.x}
                y={u.y}
                nombre={tx(u.nombre)}
                pais={u.pais}
                activo={pais}
                elegido={punto === u.id}
                alEntrar={() => encender(u.pais, u.id)}
                liga={liga(u.pais)}
              />
            ))}

            {/* Hawái en recuadro, en el Pacífico vacío del recorte. */}
            <div className="absolute bottom-[4%] left-[2%] w-[17%] border border-mdh-tinta/15 bg-mdh-hueso/60" style={{ aspectRatio: "3 / 2" }}>
              <svg viewBox="0 0 30 20" className="absolute inset-0 h-full w-full" aria-hidden="true">
                {[
                  [6, 7], [7, 7], [11, 9], [12, 9], [16, 11], [17, 11], [18, 12], [21, 14], [22, 14], [22, 15], [23, 15], [21, 15],
                ].map(([cx, cy], i) => (
                  <circle key={i} cx={cx} cy={cy} r={0.45} fill="#c5cbd1" />
                ))}
              </svg>
              <span className="mdh-label absolute left-1.5 top-1 text-[0.5rem] text-mdh-pizarra">{t("Hawái", "Hawaii")}</span>
              <Punto
                x={40}
                y={47}
                nombre={tx(HAWAI.nombre)}
                pais={HAWAI.pais}
                activo={pais}
                elegido={punto === HAWAI.id}
                alEntrar={() => encender(HAWAI.pais, HAWAI.id)}
                liga={liga(HAWAI.pais)}
              />
            </div>
          </div>
        </Aparecer>
      </div>
    </section>
  );
}

/** Punto del mapa: se enciende con su país y muestra el lugar al pasar el cursor. */
function Punto({
  x,
  y,
  nombre,
  pais,
  activo,
  elegido,
  alEntrar,
  liga,
}: {
  x: number;
  y: number;
  nombre: string;
  pais: string;
  activo: string | null;
  elegido: boolean;
  alEntrar: () => void;
  liga: { pais?: string };
}) {
  const visible = activo === null || activo === pais;
  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%`, zIndex: elegido ? 20 : 10 }}>
      {/* Zona sensible más grande que el punto; enlaza a Proyectos filtrado por el país. */}
      <Link
        to="/proyectos"
        search={liga}
        aria-label={nombre}
        tabIndex={-1}
        data-cursor="enlace"
        onPointerEnter={alEntrar}
        className="absolute left-1/2 top-1/2 hidden h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none relative block h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mdh-tinta transition-[opacity,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-2.5 md:w-2.5 ${
          visible ? "opacity-100" : "opacity-20"
        } ${elegido ? "scale-150" : "scale-100"}`}
      >
        {visible && <span className="mdh-pulso absolute inset-0 rounded-full bg-mdh-tinta" />}
      </span>
      <AnimatePresence>
        {elegido && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="pointer-events-none absolute bottom-full left-0 mb-3 -translate-x-1/2 whitespace-nowrap rounded-full bg-mdh-tinta px-3.5 py-2 text-[0.8rem] text-white shadow-[0_10px_30px_-12px_rgba(23,24,25,0.6)]"
          >
            {nombre}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-mdh-tinta"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
