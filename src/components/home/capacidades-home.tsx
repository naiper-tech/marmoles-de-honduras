import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

import imgMateriales from "@/assets/mesa-veta.jpg";
import imgFabricacion from "@/assets/taller-columnas.jpg";
import imgInstalacion from "@/assets/artesano-lijado.jpg";
import imgExportacion from "@/assets/proy-ahana.jpg";
import { correoCon, materiales, useTexto } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Magnetico, Marquesina } from "./efectos";
import { Aparecer, Emerge } from "./movimiento";

/**
 * Producción en la home (ronda 1, #26): las mismas cuatro categorías de "La empresa",
 * pero contadas con imágenes. Se navega aquí mismo —paneles que se abren al pasar
 * el cursor, al enfocar o al tocar— sin mandar al visitante a otra página.
 */
export function CapacidadesHome() {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [activa, setActiva] = useState(0);

  const categorias = [
    {
      id: "materiales",
      titulo: t("Materiales", "Materials"),
      texto: t(
        "Mármol, cuarzo, travertino, granito, cuarcita y ónix. Conseguimos el material que especifica cada proyecto.",
        "Marble, quartz, travertine, granite, quartzite and onyx. We source the material each project specifies.",
      ),
      imagen: imgMateriales,
      alt: t("Losa de mármol con veta sobre la mesa de trabajo", "A veined marble slab on the workbench"),
    },
    {
      id: "fabricacion",
      titulo: t("Fabricación", "Fabrication"),
      texto: t(
        "Corte, fresado CNC, tallado y pulido en planta, pieza por pieza y a la medida.",
        "Cutting, CNC milling, carving and polishing at the plant, piece by piece and made to measure.",
      ),
      imagen: imgFabricacion,
      alt: t("Artesanos puliendo columnas de mármol negro", "Craftsmen polishing black marble columns"),
    },
    {
      id: "instalacion",
      titulo: t("Instalación", "Installation"),
      texto: t(
        "En Honduras, nuestro equipo acompaña cada pieza hasta su lugar final.",
        "In Honduras, our team takes every piece all the way to its final place.",
      ),
      imagen: imgInstalacion,
      alt: t("Artesano ajustando una pieza de piedra", "A craftsman fitting a stone piece"),
    },
    {
      id: "exportacion",
      titulo: t("Exportación", "Export"),
      texto: t(
        "Embalaje por pieza y logística hasta la obra en Estados Unidos, Centroamérica y el Caribe.",
        "Per-piece crating and logistics all the way to the site in the United States, Central America and the Caribbean.",
      ),
      imagen: imgExportacion,
      alt: t("Ahana Luxury Condo Tower en Honolulu", "Ahana Luxury Condo Tower in Honolulu"),
    },
  ];

  return (
    <section id="produccion" aria-labelledby="produccion-titulo" className="relative bg-mdh-tinta text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-24 md:px-10 md:pt-36">
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
            <Aparecer retraso={0.15}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-white/60">
                {t(
                  "Cada pieza se fabrica a la medida. Si puedes imaginarla en piedra, podemos hacerla.",
                  "Every piece is made to measure. If you can picture it in stone, we can make it.",
                )}
              </p>
            </Aparecer>
          </div>
        </div>

        {/* Escritorio: paneles que se abren. El abierto ocupa cuatro veces el ancho de los demás. */}
        <div role="list" className="mt-16 hidden h-[min(72vh,640px)] min-h-[480px] gap-3 md:mt-24 md:flex">
          {categorias.map((c, i) => {
            const abierta = activa === i;
            return (
              <div
                key={c.id}
                role="listitem"
                tabIndex={0}
                aria-expanded={abierta}
                aria-label={c.titulo}
                onPointerEnter={() => setActiva(i)}
                onFocus={() => setActiva(i)}
                onClick={() => setActiva(i)}
                style={{ flexGrow: abierta ? 4 : 1 }}
                className="group relative basis-0 cursor-pointer overflow-hidden bg-mdh-acero outline-none transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-white"
              >
                <img
                  src={c.imagen}
                  alt={c.alt}
                  loading="lazy"
                  className={`absolute inset-0 h-full w-full object-cover transition-[scale,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    abierta ? "scale-100 grayscale-0" : "scale-110 grayscale-[60%]"
                  }`}
                />
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 transition-colors duration-700 ${
                    abierta
                      ? "bg-[linear-gradient(to_top,rgba(23,24,25,0.9)_0%,rgba(23,24,25,0.15)_55%)]"
                      : "bg-mdh-tinta/55"
                  }`}
                />
                <span className="mdh-label absolute left-6 top-6 text-white/70">{String(i + 1).padStart(2, "0")}</span>

                {/* Cerrado: el título corre en vertical para que quepa en el panel angosto. */}
                <span
                  className={`mdh-label absolute bottom-6 left-6 origin-bottom-left -rotate-90 translate-x-5 whitespace-nowrap text-white transition-opacity duration-500 ${
                    abierta ? "opacity-0" : "opacity-100"
                  }`}
                  aria-hidden="true"
                >
                  {c.titulo}
                </span>

                <div
                  className={`absolute inset-x-0 bottom-0 p-8 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:p-10 ${
                    abierta ? "translate-y-0 opacity-100 delay-200" : "pointer-events-none translate-y-6 opacity-0"
                  }`}
                >
                  <h3 className="text-[clamp(2rem,3.4vw,3.25rem)] font-light leading-none tracking-[-0.02em]">
                    {c.titulo}
                  </h3>
                  <p className="mt-4 max-w-md leading-relaxed text-white/75">{c.texto}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Móvil: tarjetas en carrusel con desplazamiento lateral. */}
        <ul className="-mx-6 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 md:hidden">
          {categorias.map((c, i) => (
            <li key={c.id} className="w-[82%] shrink-0 snap-start">
              <div className="relative aspect-[4/5] overflow-hidden bg-mdh-acero">
                <img src={c.imagen} alt={c.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,24,25,0.9)_0%,rgba(23,24,25,0.1)_60%)]"
                />
                <span className="mdh-label absolute left-5 top-5 text-white/70">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="text-3xl font-light">{c.titulo}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">{c.texto}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20 border-y border-white/10 py-10 md:mt-28 md:py-14">
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

      {/* #27: el aviso del catálogo gana peso tipográfico. */}
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 py-14 md:flex-row md:items-center md:justify-between md:px-10 md:py-20">
        <p className="max-w-2xl text-[clamp(1.4rem,2.4vw,2.1rem)] font-medium leading-snug tracking-[-0.01em]">
          {t(
            "El inventario rota constantemente. Te enviamos el catálogo con lo disponible hoy.",
            "Our inventory rotates constantly. We'll send you the catalog with what's available today.",
          )}
        </p>
        <Magnetico>
          <a
            href={correoCon(t("Solicitud de catálogo de piedra natural", "Natural stone catalog request"))}
            className="mdh-label group inline-flex shrink-0 items-center gap-4 border border-white/30 px-7 py-4 transition-colors duration-500 hover:border-white hover:bg-white hover:text-mdh-tinta"
          >
            {t("Solicitar catálogo", "Request the catalog")}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.5} />
          </a>
        </Magnetico>
      </div>
    </section>
  );
}
