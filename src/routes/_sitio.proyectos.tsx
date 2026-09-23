import { createFileRoute } from "@tanstack/react-router";

import intercontinental from "@/assets/foto-intercontinental-cr.jpg";
import { Cierre } from "@/components/home/cierre";
import { Contador, TextoPorScroll } from "@/components/home/efectos";
import { GaleriaProyectos } from "@/components/home/galeria-proyectos";
import { Aparecer } from "@/components/home/movimiento";
import { PortadaPagina } from "@/components/home/portada-pagina";
import { useCategoria } from "@/components/home/proyectos";
import { proyectosPortafolio } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/_sitio/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — Mármoles de Honduras" },
      {
        name: "description",
        content:
          "Proyectos hoteleros, residenciales, comerciales e institucionales en Honduras, Estados Unidos, Centroamérica y el Caribe.",
      },
    ],
  }),
  component: ProyectosPagina,
});

function ProyectosPagina() {
  const { t, lang } = useLang();
  const categoria = useCategoria();

  // Cifras derivadas del portafolio publicado: cambian solas al actualizar proyectos.
  const paises = new Set(proyectosPortafolio.map((p) => p.pais)).size;
  const tipologias = [...new Set(proyectosPortafolio.map((p) => p.categoria))].map(categoria);

  return (
    <>
      <PortadaPagina
        numero="03"
        etiqueta={t("Proyectos", "Projects")}
        lineas={lang === "en" ? ["Delivered work,", "in Honduras and abroad."] : ["Obra entregada,", "dentro y fuera de Honduras."]}
        texto={t(
          "Filtra por país o por tipo de obra y abre cada proyecto para verlo en detalle.",
          "Filter by country or project type and open each project to see it in detail.",
        )}
        imagen={intercontinental}
        alt={t("Hotel Intercontinental en San José, Costa Rica", "Intercontinental hotel in San José, Costa Rica")}
      />

      <section aria-labelledby="portafolio-titulo" className="bg-white">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-28 md:grid-cols-12 md:px-10 md:py-40">
          <Aparecer className="md:col-span-3">
            <h2 id="portafolio-titulo" className="mdh-label text-mdh-pizarra">
              {t("Portafolio", "Portfolio")}
            </h2>
          </Aparecer>
          <div className="md:col-span-9">
            <TextoPorScroll
              key={lang}
              className="text-[clamp(1.75rem,3.5vw,3.4rem)] font-light leading-[1.18] tracking-[-0.02em]"
              texto={t(
                "Hoteles, torres residenciales, templos y centros comerciales. Cada proyecto es piedra fabricada en Honduras y entregada donde está la obra.",
                "Hotels, residential towers, churches and shopping centers. Every project is stone fabricated in Honduras and delivered wherever the site is.",
              )}
            />

            <dl className="mt-20 grid grid-cols-2 gap-10 border-t border-mdh-niebla pt-10 md:grid-cols-3">
              <div>
                <dt className="mdh-label text-mdh-pizarra">{t("Proyectos", "Projects")}</dt>
                <dd className="mt-4 text-6xl font-extralight tracking-[-0.04em]">
                  {/* Ronda 1 (#45): cifra redondeada hacia abajo, "20+", aunque se sumen obras. */}
                  <span className="inline-flex items-start">
                    <Contador hasta={Math.floor(proyectosPortafolio.length / 10) * 10} duracion={1.6} />
                    <span className="text-[0.55em] font-light">+</span>
                  </span>
                </dd>
              </div>
              <div>
                <dt className="mdh-label text-mdh-pizarra">{t("Países", "Countries")}</dt>
                <dd className="mt-4 text-6xl font-extralight tracking-[-0.04em]">
                  <Contador hasta={paises} duracion={1.6} />
                </dd>
              </div>
              <div className="col-span-2 md:col-span-1">
                <dt className="mdh-label text-mdh-pizarra">{t("Tipologías", "Typologies")}</dt>
                <dd className="mt-5 text-xl font-light leading-relaxed">{tipologias.join(" · ")}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <GaleriaProyectos />
      <Cierre />
    </>
  );
}
