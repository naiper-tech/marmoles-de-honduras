import { useEffect } from "react";

import { GA_ID, medicionActiva, medir } from "@/lib/medicion";

/** Sección donde ocurrió el clic, para saber qué botón convierte (portada, cierre, pie…). */
function ubicacion(el: Element) {
  if (el.closest("[data-medir]")) return el.closest("[data-medir]")!.getAttribute("data-medir")!;
  if (el.closest("footer")) return "pie";
  if (el.closest("header")) return "encabezado";
  const seccion = el.closest("section");
  return seccion?.id || seccion?.getAttribute("aria-labelledby") || window.location.pathname;
}

/**
 * Carga GA4 después del evento `load` y escucha los clics de contacto de todo el
 * sitio (WhatsApp, teléfono, correo) sin tocar cada botón.
 */
export function Medicion() {
  useEffect(() => {
    if (!medicionActiva()) return;

    const cargar = () => {
      window.dataLayer = window.dataLayer ?? [];
      window.gtag =
        window.gtag ??
        function gtag() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID);
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);
    };
    const programar = () =>
      "requestIdleCallback" in window
        ? requestIdleCallback(cargar, { timeout: 3000 })
        : setTimeout(cargar, 1500);
    if (document.readyState === "complete") programar();
    else window.addEventListener("load", programar, { once: true });

    const alClic = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
      if (!enlace) return;
      const href = enlace.getAttribute("href") ?? "";
      const canal = href.startsWith("https://wa.me")
        ? "whatsapp"
        : href.startsWith("tel:")
          ? "telefono"
          : href.startsWith("mailto:")
            ? "correo"
            : null;
      if (canal) medir("contacto_click", { canal, ubicacion: ubicacion(enlace) });
    };
    document.addEventListener("click", alClic, { capture: true });

    return () => {
      window.removeEventListener("load", programar);
      document.removeEventListener("click", alClic, { capture: true });
    };
  }, []);

  return null;
}
