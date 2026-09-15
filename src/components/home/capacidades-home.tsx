import { useState, type PointerEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { capacidades, correoCon, materiales, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Magnetico, Marquesina, usePunteroFino } from "./efectos";
import { EnlaceMas } from "./enlaces";
import { Aparecer, EASE, Emerge } from "./movimiento";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Producción en la home: lista tipográfica. Con mouse, la foto de cada capacidad
 * sigue al cursor e inclina según su velocidad; en táctil cada fila muestra su foto.
 */
export function CapacidadesHome() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const fino = usePunteroFino();
  const [activa, setActiva] = useState<number | null>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 150, damping: 20, mass: 0.6 });
  const giro = useTransform(useVelocity(sx), [-1600, 0, 1600], [-9, 0, 9]);
  const ix = useTransform(sx, (v) => v - 180);
  const iy = useTransform(sy, (v) => v - 130);

  const entrar = (i: number, e: PointerEvent) => {
    if (activa === null) {
      sx.jump(e.clientX);
      sy.jump(e.clientY);
    }
    px.set(e.clientX);
    py.set(e.clientY);
    setActiva(i);
  };

  return (
    <section id="produccion" aria-labelledby="produccion-titulo" className="relative bg-mdh-tinta text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-28 md:px-10 md:pt-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <p className="mdh-label text-white/55">{t("Producción", "Production")}</p>
          </Aparecer>
          <div className="md:col-span-9">
            <h2
              id="produccion-titulo"
              className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.015em]"
            >
              <Emerge
                key={lang}
                lineas={lang === "en" ? ["What we can", "do for you."] : ["Lo que podemos", "hacer por ti."]}
              />
            </h2>
            <Aparecer retraso={0.15} className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="max-w-md text-lg leading-relaxed text-white/60">
                {t(
                  "Cada pieza se fabrica a la medida. Si puedes imaginarla en piedra, podemos hacerla.",
                  "Every piece is made to measure. If you can picture it in stone, we can make it.",
                )}
              </p>
              <EnlaceMas to="/home/produccion" className="self-start md:self-auto">
                {t("Ver toda la producción", "See all production")}
              </EnlaceMas>
            </Aparecer>
          </div>
        </div>

        {/* Por encima de la foto flotante: el texto se lee sobre la imagen, no debajo. */}
        <ul
          className="relative z-40 mt-20 border-b border-white/15 md:mt-28"
          onPointerMove={(e) => {
            px.set(e.clientX);
            py.set(e.clientY);
          }}
          onPointerLeave={() => setActiva(null)}
        >
          {capacidades.map((capacidad, i) => {
            const atenuada = activa !== null && activa !== i;
            return (
              <li key={capacidad.id} className="border-t border-white/15">
                <Link
                  to="/home/produccion"
                  onPointerEnter={(e) => entrar(i, e)}
                  onFocus={() => setActiva(i)}
                  onBlur={() => setActiva(null)}
                  className={`group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 transition-opacity duration-500 md:grid-cols-12 md:gap-6 md:py-8 ${
                    atenuada ? "opacity-30" : "opacity-100"
                  }`}
                >
                  <span className="mdh-label text-white/40 md:col-span-1">{pad(i + 1)}</span>
                  <span className="flex min-w-0 items-center gap-4 md:col-span-6">
                    <img
                      src={capacidad.imagen}
                      alt=""
                      loading="lazy"
                      className="h-14 w-14 shrink-0 object-cover md:hidden"
                    />
                    <span className="block text-[1.45rem] font-light leading-tight transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-5 sm:text-3xl md:text-[clamp(2rem,3.5vw,3.4rem)]">
                      {tx(capacidad.titulo)}
                    </span>
                  </span>
                  <span className="hidden text-[0.95rem] leading-relaxed text-white/55 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:col-span-4 md:block [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
                    {tx(capacidad.detalle)}
                  </span>
                  <span className="grid h-11 w-11 place-items-center justify-self-end rounded-full border border-white/25 transition-[rotate,background-color,border-color,color] duration-500 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-mdh-tinta md:col-span-1">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {fino && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-30 h-[260px] w-[360px] overflow-hidden bg-mdh-acero"
          style={{ x: ix, y: iy, rotate: giro }}
          initial={false}
          animate={{ opacity: activa === null ? 0 : 1, scale: activa === null ? 0.5 : 1 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <AnimatePresence initial={false}>
            {activa !== null && (
              <motion.img
                key={capacidades[activa].id}
                src={capacidades[activa].imagen}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.2 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
              />
            )}
          </AnimatePresence>
          <span aria-hidden="true" className="absolute inset-0 bg-mdh-tinta/30" />
        </motion.div>
      )}

      <div className="mt-24 border-y border-white/10 py-10 md:mt-32 md:py-14">
        <Marquesina duracion={48}>
          {materiales.map((material) => (
            <span
              key={material.es}
              className="flex items-center text-[clamp(3rem,8vw,7.5rem)] font-extralight leading-none tracking-[-0.03em] text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_rgba(255,255,255,0.45)] hover:text-white"
            >
              {tx(material)}
              <span aria-hidden="true" className="mx-10 text-[0.3em] text-white/30 [-webkit-text-stroke:0]">
                ●
              </span>
            </span>
          ))}
        </Marquesina>
      </div>

      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-16">
        <p className="max-w-md leading-relaxed text-white/55">
          {t(
            "El inventario rota constantemente. Te enviamos el catálogo con lo disponible hoy.",
            "Our inventory rotates constantly. We'll send you the catalog with what's available today.",
          )}
        </p>
        <Magnetico>
          <a
            href={correoCon(t("Solicitud de catálogo de piedra natural", "Natural stone catalog request"))}
            className="mdh-label group inline-flex items-center gap-4 border border-white/30 px-7 py-4 transition-colors duration-500 hover:border-white hover:bg-white hover:text-mdh-tinta"
          >
            {t("Solicitar catálogo", "Request the catalog")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
          </a>
        </Magnetico>
      </div>
    </section>
  );
}
