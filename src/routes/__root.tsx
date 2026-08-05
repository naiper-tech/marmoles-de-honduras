import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Preloader } from "@/components/preloader";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MarcaAgua } from "@/components/marca-agua";
import { LangProvider } from "@/lib/i18n";
import { MODO_DEMO } from "@/lib/demo";

/** Dominio de producción. Necesario para las URL absolutas de Open Graph. */
const SITIO = "https://marmoles-de-honduras.vercel.app";

/**
 * En modo demo ningún enlace navega. Se intercepta en fase de captura para
 * detener el clic antes de que TanStack Router lo procese, así el navbar y los
 * CTA conservan su aspecto y sus estados hover sin llevar a ninguna parte.
 */
function useBloqueoNavegacion() {
  useEffect(() => {
    if (!MODO_DEMO) return;
    const alHacerClic = (e: MouseEvent) => {
      const destino = e.target as HTMLElement | null;
      const enlace = destino?.closest?.("a");
      if (!enlace) return;
      // La marca de agua de Naiper es el único enlace vivo en modo demo.
      if (enlace.hasAttribute("data-permitir-demo")) return;
      e.preventDefault();
      e.stopPropagation();
    };
    document.addEventListener("click", alHacerClic, true);
    return () => document.removeEventListener("click", alHacerClic, true);
  }, []);
}

/**
 * Red de seguridad del modo demo: si alguien llega por URL directa a una ruta
 * distinta de la home (la comparte, la escribe, la tiene en el historial),
 * lo devuelve a la home. Bloquear los clics no cubre ese caso.
 */
function useSoloHome() {
  const router = useRouter();

  useEffect(() => {
    if (!MODO_DEMO) return;
    if (window.location.pathname !== "/") {
      void router.navigate({ to: "/", replace: true });
    }
  }, [router]);
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mármoles de Honduras — Piedra natural" },
      {
        name: "description",
        content:
          "Fabricación, distribución e instalación de piedra natural en Honduras.",
      },
      { name: "author", content: "Mármoles de Honduras" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mármoles de Honduras" },
      { property: "og:url", content: SITIO },
      // Vista previa al compartir el enlace (WhatsApp, redes, buscadores).
      // Debe ser URL absoluta: las rutas relativas no las resuelven los scrapers.
      { property: "og:image", content: `${SITIO}/og-image.jpg` },
      { property: "og:image:width", content: "770" },
      { property: "og:image:height", content: "385" },
      {
        property: "og:image:alt",
        content: "Cantera de mármol blanco con frentes de corte escalonados",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITIO}/og-image.jpg` },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800;900&family=Epilogue:wght@400;500;600&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useBloqueoNavegacion();
  useSoloHome();

  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <Preloader />
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
        </div>
        <WhatsAppFloat />
        {MODO_DEMO && <MarcaAgua />}
      </LangProvider>
    </QueryClientProvider>
  );
}
