import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useLang } from "@/lib/i18n";

const ease = [0.76, 0, 0.24, 1] as const;
const KEY = "mdh-preloaded";

/** Cortina de entrada: veta de luz + apertura en dos hojas de piedra. */
export function Preloader() {
  const [active, setActive] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setActive(true);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setActive(false);
    }, 2400);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!active) document.body.style.overflow = "";
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ pointerEvents: "none" }}
          aria-hidden="true"
        >
          {/* hojas */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-ink"
            exit={{ y: "-100%", transition: { duration: 1, ease, delay: 0.15 } }}
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink"
            exit={{ y: "100%", transition: { duration: 1, ease, delay: 0.15 } }}
          />

          <motion.div
            className="relative flex flex-col items-center"
            exit={{ opacity: 0, transition: { duration: 0.35 } }}
          >
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.15 }}
                className="font-display text-[13vw] font-extrabold leading-none tracking-tighter text-background sm:text-[7vw]"
              >
                MÁRMOLES
              </motion.p>
            </div>
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.28 }}
                className="font-display text-[13vw] font-light italic leading-none tracking-tighter text-background/60 pr-[0.12em] sm:text-[7vw]"
              >
                de Honduras
              </motion.p>
            </div>

            {/* veta que se llena */}
            <div className="mt-8 h-px w-[52vw] max-w-md overflow-hidden bg-background/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
                className="h-full bg-stone"
              />
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="eyebrow mt-5 text-background/45"
            >
              {t("Piedra natural desde 1972", "Natural stone since 1972")}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
