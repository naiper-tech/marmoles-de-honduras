import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useLang } from "@/lib/i18n";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, setLang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overlay = pathname === "/" || pathname === "/nosotros";
  const claro = overlay && !scrolled && !open;

  const nav = [
    { to: "/", label: t("Home", "Home") },
    { to: "/nosotros", label: t("Nosotros", "About") },
    { to: "/servicios", label: t("Servicios", "Services") },
    { to: "/proyectos", label: t("Proyectos", "Projects") },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`${overlay ? "fixed inset-x-0" : "sticky"} top-0 z-50 transition-colors duration-500 ${
        claro
          ? "border-b border-transparent bg-transparent text-background"
          : "border-b border-border/40 bg-background/60 shadow-[0_1px_30px_-18px_rgba(0,0,0,0.45)] backdrop-blur-xl backdrop-saturate-150"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
            M
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-[0.95rem] font-bold tracking-tight">
              Mármoles de Honduras
            </span>
            <span
              className={`eyebrow block ${claro ? "text-background/70" : "text-muted-foreground"}`}
            >
              {t("Piedra natural", "Natural stone")}
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`story-link text-sm transition-colors ${
                claro
                  ? "text-background/75 hover:text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              activeProps={{
                className: `text-sm font-semibold ${claro ? "text-background" : "text-foreground"}`,
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <LangToggle claro={claro} lang={lang} setLang={setLang} />
          <Link
            to="/cotizar"
            className="btn-lux rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            {t("Cotizar", "Get a quote")}
          </Link>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <LangToggle claro={claro} lang={lang} setLang={setLang} />
          <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("Abrir menú", "Open menu")}
          aria-expanded={open}
          className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border ${
            claro ? "border-background/40" : "border-border"
          }`}
          >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/60 bg-background md:hidden"
          >
            <div className="px-5 py-3">
              {nav.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/50 py-3 text-sm text-foreground last:border-0"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/cotizar"
                onClick={() => setOpen(false)}
                className="mt-3 block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
              >
                {t("Cotizar", "Get a quote")}
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function LangToggle({
  claro,
  lang,
  setLang,
}: {
  claro: boolean;
  lang: "es" | "en";
  setLang: (l: "es" | "en") => void;
}) {
  return (
    <div
      className={`flex items-center rounded-full border p-0.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] ${
        claro ? "border-background/35 text-background/70" : "border-border text-muted-foreground"
      }`}
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-label={l === "es" ? "Español" : "English"}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 transition-colors ${
            lang === l
              ? claro
                ? "bg-background text-foreground"
                : "bg-primary text-primary-foreground"
              : "hover:opacity-80"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
