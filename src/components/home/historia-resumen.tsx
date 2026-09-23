import { useLang } from "@/lib/i18n";
import { Contador } from "./efectos";
import { EnlaceMas } from "./enlaces";
import { Aparecer } from "./movimiento";

/**
 * Resumen de la historia. La historia completa vive en Nosotros; aquí solo el
 * número en grande y un párrafo (ronda 1, #23–#25).
 */
export function HistoriaResumen() {
  const { t } = useLang();

  return (
    <section aria-labelledby="historia-resumen" className="bg-mdh-tinta text-white">
      {/* Mismo fondo que Producción: las dos secciones se leen como un solo capítulo,
          separadas apenas por una línea fina. */}
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-36">
        <div className="grid items-end gap-14 border-b border-white/10 pb-20 md:grid-cols-12 md:pb-28">
          <div className="md:col-span-6">
            <h2 id="historia-resumen" className="mdh-label text-white/55">
              {t("Nuestra historia", "Our story")}
            </h2>
            <p
              aria-label={t("Más de 55 años", "More than 55 years")}
              className="mt-8 flex items-start text-[clamp(7rem,19vw,16rem)] font-extralight leading-[0.8] tracking-[-0.06em]"
            >
              <Contador hasta={55} />
              <span aria-hidden="true" className="mt-[0.06em] text-[0.34em] font-light">
                +
              </span>
            </p>
          </div>

          <Aparecer className="md:col-span-5 md:col-start-8">
            <p className="text-xl font-light leading-relaxed text-white/80 md:text-2xl">
              {t(
                "Desde 1970, una empresa familiar hondureña dedicada a la piedra natural. Hoy nuestro trabajo forma parte de residencias, templos y edificios en Honduras, Estados Unidos, Centroamérica y el Caribe.",
                "Since 1970, a Honduran family company devoted to natural stone. Today our work is part of residences, temples and buildings in Honduras, the United States, Central America and the Caribbean.",
              )}
            </p>
            <EnlaceMas to="/nosotros" className="mt-10">
              {t("Conoce nuestra historia", "Discover our story")}
            </EnlaceMas>
          </Aparecer>
        </div>
      </div>
    </section>
  );
}
