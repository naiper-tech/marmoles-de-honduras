import { useEffect, type RefObject } from "react";

type Fuentes = { movil: string; escritorio: string };

/** Ahorro de datos o red 2G: el video no compensa y se queda la foto fija. */
function conexionLimitada() {
  const c = (
    navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
  ).connection;
  return Boolean(c?.saveData || (c?.effectiveType && /2g$/.test(c.effectiveType)));
}

/**
 * Videos de fondo sin costo en la carga inicial. La fuente se asigna después del
 * evento `load`, así no compite con la foto principal ni con las fuentes; con
 * `alVerse` espera además a que el video esté cerca de la pantalla. El peso se
 * elige por ancho: en móvil va una versión recortada y mucho más liviana.
 */
export function useVideoDiferido(
  ref: RefObject<HTMLVideoElement | null>,
  { movil, escritorio }: Fuentes,
  { alVerse = false }: { alVerse?: boolean } = {},
) {
  useEffect(() => {
    const video = ref.current;
    if (!video || conexionLimitada()) return;

    let observador: IntersectionObserver | undefined;

    const cargar = () => {
      video.src = window.innerWidth < 768 ? movil : escritorio;
      // React no escribe `muted` en el HTML del servidor y sin él se bloquea el autoplay.
      video.muted = true;
      void video.play().catch(() => {});
    };

    const arrancar = () => {
      if (!alVerse) return cargar();
      observador = new IntersectionObserver(
        (entradas) => {
          if (!entradas.some((e) => e.isIntersecting)) return;
          observador?.disconnect();
          cargar();
        },
        { rootMargin: "300px 0px" },
      );
      observador.observe(video);
    };

    if (document.readyState === "complete") arrancar();
    else window.addEventListener("load", arrancar, { once: true });

    return () => {
      window.removeEventListener("load", arrancar);
      observador?.disconnect();
    };
  }, [ref, movil, escritorio, alVerse]);
}
