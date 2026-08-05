import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "mdh-lang";

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Devuelve la cadena en el idioma activo: t("Hola", "Hello"). */
  t: (es: string, en: string) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    const guardado = window.localStorage.getItem(STORAGE_KEY);
    if (guardado === "en" || guardado === "es") setLangState(guardado);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const t = useCallback((es: string, en: string) => (lang === "en" ? en : es), [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangContext);
  if (!ctx) {
    // Fallback seguro fuera del provider (p. ej. pantallas de error).
    return { lang: "es", setLang: () => {}, t: (es) => es };
  }
  return ctx;
}

/**
 * Devuelve un registro de datos con sus campos traducidos cuando el idioma es
 * inglés. Cada registro puede declarar un objeto `en` con los campos a sustituir.
 */
export function loc<T extends object>(item: T, lang: Lang): T {
  const en = (item as { en?: Partial<T> }).en;
  if (lang !== "en" || !en) return item;
  return { ...item, ...en };
}
