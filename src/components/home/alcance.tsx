import { useState } from "react";
import { Link } from "@tanstack/react-router";

import mapaUrl from "@/assets/mapa-alcance.svg";
import { regiones, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { MAPA as mapa } from "./mapa-alcance";
import { Aparecer, Emerge } from "./movimiento";

const pines = mapa.pines;

/**
 * Alcance geográfico con mapa de puntos. El SVG se genera una sola vez con
 * dotted-map (script en el repositorio de trabajo); no agrega peso en ejecución.
 */
export function Alcance() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [region, setRegion] = useState<string | null>(null);

  return (
    <section id="alcance" className="scroll-mt-16 bg-mdh-hueso">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 py-20 md:grid-cols-12 md:gap-10 md:px-10 md:py-28">
        <div className="md:col-span-5">
          <p className="mdh-label text-mdh-pizarra">{t("Alcance", "Reach")}</p>
          <h2 className="mt-5 text-[clamp(1.9rem,3.4vw,3.25rem)] font-light leading-[1.06] tracking-[-0.015em]">
            <Emerge
              key={lang}
              lineas={lang === "en" ? ["Wherever your", "project is."] : ["Donde esté", "tu proyecto."]}
            />
          </h2>

          <ul className="mt-10 border-t border-mdh-tinta/15" onMouseLeave={() => setRegion(null)}>
            {regiones.map((r) => (
              <li key={r.id} className="border-b border-mdh-tinta/15">
                <button
                  type="button"
                  onMouseEnter={() => setRegion(r.id)}
                  onFocus={() => setRegion(r.id)}
                  onBlur={() => setRegion(null)}
                  className="flex w-full flex-col gap-1 py-4 text-left sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span
                    className={`text-xl font-light transition-opacity duration-500 md:text-2xl ${
                      region && region !== r.id ? "opacity-35" : "opacity-100"
                    }`}
                  >
                    {tx(r.nombre)}
                  </span>
                  {tx(r.lugares) && <span className="text-sm text-mdh-pizarra sm:text-right">{tx(r.lugares)}</span>}
                </button>
              </li>
            ))}
          </ul>

          <Aparecer retraso={0.1}>
            <p className="mt-8 text-mdh-acero">
              {t("¿Tu país no aparece?", "Don't see your country?")}{" "}
              <Link to="/contacto" className="mdh-enlace text-mdh-tinta">
                {t("Escríbenos igual", "Write to us anyway")}
              </Link>
            </p>
          </Aparecer>
        </div>

        <Aparecer className="md:col-span-7" y={20}>
          <div
            className="relative w-full"
            style={{ aspectRatio: `${mapa.ancho} / ${mapa.alto}` }}
            role="img"
            aria-label={t(
              "Mapa de proyectos en Honduras, Estados Unidos, Centroamérica y el Caribe",
              "Map of projects across Honduras, the United States, Central America and the Caribbean",
            )}
          >
            <img src={mapaUrl} alt="" className="absolute inset-0 h-full w-full" />
            {regiones.flatMap((r) =>
              r.pines.map((id) => {
                const pin = pines[id];
                if (!pin) return null;
                const activo = !region || region === r.id;
                return (
                  <span
                    key={id}
                    aria-hidden="true"
                    className="absolute"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <span
                      className={`relative block h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mdh-tinta transition-opacity duration-500 ${
                        activo ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      {activo && <span className="mdh-pulso absolute inset-0 rounded-full bg-mdh-tinta" />}
                    </span>
                  </span>
                );
              }),
            )}
          </div>
        </Aparecer>
      </div>
    </section>
  );
}
