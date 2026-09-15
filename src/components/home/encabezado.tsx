import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { useLang, type Lang } from "@/lib/i18n";
import { CASA_MARMOL_URL } from "@/lib/home-contenido";
import { EASE } from "./movimiento";
import logoClaro from "@/assets/logo-mdh-horizontal-claro.png";
import logoOscuro from "@/assets/logo-mdh-horizontal-oscuro.png";

/**
 * Menú fijo y siempre visible (pedido en el kick-off). Transparente mientras hay
 * una portada debajo; al pasarla se vuelve blanco para no competir con el contenido.
 */
export function Encabezado() {
  const { t, lang, setLang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [solido, setSolido] = useState(false);
  const [abierto, setAbierto] = useState(false);

  // Cada página tiene su propia portada: el límite se recalcula al cambiar de ruta.
  useEffect(() => {
    const actualizar = () => {
      const portada = document.querySelector<HTMLElement>("[data-portada]");
      const limite = portada ? portada.offsetHeight - 90 : -1;
      setSolido(window.scrollY > limite);
    };
    actualizar();
    window.addEventListener("scroll", actualizar, { passive: true });
    window.addEventListener("resize", actualizar);
    return () => {
      window.removeEventListener("scroll", actualizar);
      window.removeEventListener("resize", actualizar);
    };
  }, [pathname]);

  useEffect(() => setAbierto(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  const enlaces = [
    { to: "/", label: t("Inicio", "Home") },
    { to: "/nosotros", label: t("Nosotros", "About") },
    { to: "/produccion", label: t("Producción", "Production") },
    { to: "/proyectos", label: t("Proyectos", "Projects") },
    { to: "/contacto", label: t("Contacto", "Contact") },
  ] as const;

  const claro = !solido && !abierto;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,color,border-color,padding] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          claro
            ? "border-transparent bg-transparent py-6 text-white"
            : "border-mdh-tinta/10 bg-white/90 py-4 text-mdh-tinta backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 md:px-10">
          {/* Las dos versiones se cruzan en opacidad para que el cambio de fondo no dé un salto. */}
          <Link
            to="/"
            className="relative block h-7 w-[168px] shrink-0 md:h-8 md:w-[196px]"
            aria-label={t("Mármoles de Honduras — inicio", "Mármoles de Honduras — home")}
          >
            <img
              src={logoClaro}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                claro ? "opacity-100" : "opacity-0"
              }`}
            />
            <img
              src={logoOscuro}
              alt="Mármoles de Honduras S.A."
              className={`absolute inset-0 h-full w-full object-contain object-left transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                claro ? "opacity-0" : "opacity-100"
              }`}
            />
          </Link>

          <nav aria-label={t("Principal", "Main")} className="hidden items-center gap-7 lg:flex xl:gap-10">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.to}
                to={enlace.to}
                // Sin exact, "/" quedaría activo en todas las páginas interiores.
                activeOptions={{ exact: enlace.to === "/" }}
                className="mdh-label mdh-enlace"
              >
                {enlace.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-7 lg:flex">
            <a
              href={CASA_MARMOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              // En pantallas de 1024–1279px no cabe junto a los cinco enlaces; sigue en el pie.
              className="mdh-label hidden items-center gap-1.5 whitespace-nowrap opacity-75 transition-opacity duration-500 hover:opacity-100 xl:inline-flex"
            >
              Casa Mármol
              <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </a>
            <SelectorIdioma lang={lang} setLang={setLang} />
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <SelectorIdioma lang={lang} setLang={setLang} />
            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? t("Cerrar menú", "Close menu") : t("Abrir menú", "Open menu")}
              className="grid h-11 w-11 place-items-center"
            >
              {abierto ? <X strokeWidth={1.25} /> : <Menu strokeWidth={1.25} />}
            </button>
          </div>
        </div>
      </header>

      {/*
       * Fuera del <header>: su backdrop-filter lo convierte en bloque contenedor
       * y un overlay `fixed` dentro de él solo cubriría la altura del encabezado.
       */}
      <AnimatePresence>
        {abierto && (
          <motion.nav
            id="menu-movil"
            aria-label={t("Principal", "Main")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-white px-6 pb-10 pt-32 text-mdh-tinta lg:hidden"
          >
            <ul className="border-t border-mdh-niebla">
              {enlaces.map((enlace, i) => (
                <motion.li
                  key={enlace.to}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.05 }}
                  className="border-b border-mdh-niebla"
                >
                  <Link
                    to={enlace.to}
                    onClick={() => setAbierto(false)}
                    activeOptions={{ exact: enlace.to === "/" }}
                    activeProps={{ className: "text-mdh-tinta" }}
                    inactiveProps={{ className: "text-mdh-tinta/60" }}
                    className="block py-5 text-3xl font-light"
                  >
                    {enlace.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <a
              href={CASA_MARMOL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mdh-label inline-flex items-center gap-2 text-mdh-pizarra"
            >
              Casa Mármol <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function SelectorIdioma({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div role="group" aria-label="Idioma / Language" className="mdh-label flex items-center">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && (
            <span aria-hidden="true" className="px-1 opacity-35">
              /
            </span>
          )}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            aria-label={l === "es" ? "Español" : "English"}
            className={`min-h-11 min-w-9 uppercase transition-opacity duration-500 ${
              lang === l
                ? "underline decoration-1 underline-offset-[6px] opacity-100"
                : "opacity-45 hover:opacity-90"
            }`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );
}
