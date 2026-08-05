import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { WHATSAPP_URL } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";

/** Acceso directo a WhatsApp, fijo a la derecha. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          aria-label={t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
          initial={{ opacity: 0, x: 40, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group fixed bottom-6 right-5 z-[60] flex items-center gap-3 rounded-full bg-ink py-3 pl-3 pr-4 text-background shadow-[0_20px_45px_-20px_rgba(0,0,0,0.65)] md:bottom-8 md:right-8"
        >
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-stone text-ink">
            <span className="absolute inset-0 animate-ping rounded-full bg-stone/40" />
            <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.21-8.25 8.21Zm4.52-6.15c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.79.97-.14.16-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.16 1.71 2.61 4.14 3.66.58.25 1.03.4 1.38.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
            </svg>
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 group-hover:max-w-[12rem] group-hover:opacity-100">
            {t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}