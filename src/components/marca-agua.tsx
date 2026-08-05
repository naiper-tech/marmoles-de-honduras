import logoNaiper from "@/assets/logo-naiper.png";
import { useLang } from "@/lib/i18n";

/**
 * Marca de agua de autoría, fija abajo a la izquierda.
 * Vidrio esmerilado sobre degradado negro, al estilo de los controles de iOS.
 *
 * Lleva `data-permitir-demo` para que el bloqueo de navegación del modo demo
 * la deje pasar: es el único enlace que debe funcionar en la entrega al cliente.
 */
export function MarcaAgua() {
  const { t } = useLang();

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-50 md:bottom-5 md:left-5">
      <a
        href="https://naiper.io"
        target="_blank"
        rel="noopener noreferrer"
        data-permitir-demo="true"
        aria-label={t("Diseñado por Naiper", "Designed by Naiper")}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.7)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:shadow-[0_12px_34px_-8px_rgba(0,0,0,0.8)]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(18,16,15,0.62), rgba(0,0,0,0.82))",
        }}
      >
        <span className="text-[10px] font-medium tracking-wide text-white/65 transition-colors duration-300 group-hover:text-white/80">
          {t("Diseñado por", "Designed by")}
        </span>
        <img
          src={logoNaiper}
          alt="Naiper"
          width={400}
          height={180}
          className="h-5 w-auto opacity-95 transition-opacity duration-300 hover:opacity-100"
        />
      </a>
    </div>
  );
}
