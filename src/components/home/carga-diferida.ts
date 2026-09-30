import { useSyncExternalStore } from "react";

/** GIF transparente de 1 px: ocupa el `src` sin pedir nada ni mostrar el texto alternativo. */
export const VACIO =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

let lista = false;
const oyentes = new Set<() => void>();

function suscribir(avisar: () => void) {
  oyentes.add(avisar);
  if (!lista && oyentes.size === 1) {
    const marcar = () => {
      lista = true;
      oyentes.forEach((o) => o());
    };
    if (document.readyState === "complete") queueMicrotask(marcar);
    else window.addEventListener("load", marcar, { once: true });
  }
  return () => oyentes.delete(avisar);
}

/**
 * Fotos fuera de la primera pantalla. Chrome adelanta las `loading="lazy"` que
 * están a menos de 1,250–2,500 px y en móvil eso es casi toda la página: competían
 * con la portada y fuentes en 4G. Hasta el evento `load` llevan un GIF vacío; después
 * toman su foto y el `lazy` normal decide cuándo bajarla. Todas entran con
 * animación al hacer scroll, así que el cambio no se ve.
 */
export function useCargaLista() {
  return useSyncExternalStore(
    suscribir,
    () => lista,
    () => false,
  );
}

/** Atajo para una sola foto: su `src` real después del `load`, el GIF vacío antes. */
export function useSrcDiferido(src: string) {
  return useCargaLista() ? src : VACIO;
}
