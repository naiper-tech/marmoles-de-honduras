import { whatsappCon } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";

/**
 * Botón flotante de WhatsApp en todo el sitio (reunión 29/09: el canal más usado).
 * En tinta de marca, no en verde: el ícono basta para reconocerlo y no rompe la
 * paleta. En escritorio muestra la invitación al pasar el cursor.
 */
export function WhatsappFlotante() {
  const { t } = useLang();

  return (
    <a
      href={whatsappCon(t("Hola, me gustaría cotizar un proyecto con Mármoles de Honduras.", "Hi, I'd like a quote for a project with Mármoles de Honduras."))}
      target="_blank"
      rel="noopener noreferrer"
      data-medir="flotante"
      aria-label={t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
      className="group fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[35] flex items-center md:bottom-8 md:right-8"
    >
      <span className="mdh-label pointer-events-none mr-3 hidden translate-x-2 whitespace-nowrap rounded-full bg-white px-4 py-2.5 text-mdh-tinta opacity-0 shadow-[0_10px_30px_-14px_rgba(23,24,25,0.5)] transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 md:block">
        {t("Escríbenos por WhatsApp", "Message us on WhatsApp")}
      </span>
      <span className="grid h-14 w-14 place-items-center rounded-full bg-mdh-tinta text-white shadow-[0_14px_34px_-12px_rgba(23,24,25,0.65)] ring-1 ring-white/15 transition-[background-color,translate] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:bg-mdh-acero">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01Zm-7.01 15.24h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
        </svg>
      </span>
    </a>
  );
}
