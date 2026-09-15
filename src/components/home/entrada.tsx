import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { EASE } from "./movimiento";
import logoClaro from "@/assets/logo-mdh-vertical-claro.png";

const VISTO = "mdh-entrada-vista";

/**
 * Cortina de marca en la primera carga: el logo aparece sobre tinta y la cortina
 * sube. Solo una vez por sesión —volver a verla en cada página cansa— y nunca
 * con "reducir movimiento" activo, donde la página se muestra de una vez.
 */
export function Entrada() {
  const reducido = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reducido) return;
    let yaVista = true;
    try {
      yaVista = sessionStorage.getItem(VISTO) === "1";
    } catch {
      // Navegación privada o almacenamiento bloqueado: se trata como ya vista.
    }
    if (yaVista) return;

    setVisible(true);
    document.body.style.overflow = "hidden";
    const id = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(VISTO, "1");
      } catch {
        /* sin persistencia: se mostrará de nuevo en la próxima visita */
      }
    }, 1400);

    return () => {
      clearTimeout(id);
      document.body.style.overflow = "";
    };
  }, [reducido]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: EASE }}
          className="fixed inset-0 z-[60] grid place-items-center bg-mdh-tinta"
        >
          <motion.img
            src={logoClaro}
            alt=""
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="h-28 w-auto md:h-36"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
