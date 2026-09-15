import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll con inercia en escritorio. En táctil se respeta el scroll nativo del
 * dispositivo, y se desactiva si el usuario pide menos movimiento.
 */
export function ScrollSuave() {
  useEffect(() => {
    const aplica =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!aplica) return;

    const lenis = new Lenis({ lerp: 0.09 });
    let cuadro = requestAnimationFrame(function paso(tiempo: number) {
      lenis.raf(tiempo);
      cuadro = requestAnimationFrame(paso);
    });

    // Modales y menú bloquean el scroll del body: Lenis debe pausarse con ellos.
    const cuerpo = document.body;
    const observador = new MutationObserver(() => {
      const bloqueado = cuerpo.hasAttribute("data-scroll-locked") || cuerpo.style.overflow === "hidden";
      if (bloqueado) lenis.stop();
      else lenis.start();
    });
    observador.observe(cuerpo, { attributes: true, attributeFilter: ["data-scroll-locked", "style"] });

    return () => {
      cancelAnimationFrame(cuadro);
      observador.disconnect();
      lenis.destroy();
    };
  }, []);

  return null;
}
