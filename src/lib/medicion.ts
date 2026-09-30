/**
 * Medición de conversiones (GA4). El Analytics actual solo registra eventos
 * automáticos: no se sabe cuántos visitantes escriben por WhatsApp o mandan el
 * formulario. Aquí se nombran esas acciones para medir el rediseño contra el
 * sitio anterior.
 *
 * Se activa solo con `VITE_GA_ID` definido y en el dominio final (nunca en
 * *.vercel.app ni en local), y el script de Google carga después de la página
 * para no costar velocidad.
 */
type Parametros = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;

export function medicionActiva() {
  if (!GA_ID || typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host !== "localhost" && !host.endsWith(".vercel.app");
}

/** Registra un evento; sin medición activa no hace nada. */
export function medir(evento: string, parametros: Parametros = {}) {
  if (!medicionActiva()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag() {
      // gtag exige el objeto `arguments`, no un arreglo.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  window.gtag("event", evento, parametros);
}
