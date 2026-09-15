import { useEffect } from "react";
import { Outlet, createFileRoute, useRouter } from "@tanstack/react-router";

import { MarcaAgua } from "@/components/marca-agua";
import { Preloader } from "@/components/preloader";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { MODO_DEMO } from "@/lib/demo";

/**
 * Respaldo del sitio que se entregó como demo al cliente. Se conserva tal cual
 * bajo /demo —con su marca de agua y su navegación bloqueada— mientras el sitio
 * nuevo ocupa la raíz. Queda fuera de buscadores.
 */
export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700;800;900&family=Epilogue:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: SitioDemo,
});

/**
 * En modo demo ningún enlace navega. Se intercepta en fase de captura para
 * detener el clic antes de que TanStack Router lo procese, así el navbar y los
 * CTA conservan su aspecto y sus estados hover sin llevar a ninguna parte.
 */
function useBloqueoNavegacion(activo: boolean) {
  useEffect(() => {
    if (!activo) return;
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
  }, [activo]);
}

/**
 * Red de seguridad del modo demo: si alguien llega por URL directa a una página
 * interior del demo, lo devuelve a su portada. Bloquear los clics no cubre ese caso.
 */
function useSoloPortadaDemo() {
  const router = useRouter();

  useEffect(() => {
    if (!MODO_DEMO) return;
    if (window.location.pathname !== "/demo") {
      void router.navigate({ to: "/demo", replace: true });
    }
  }, [router]);
}

function SitioDemo() {
  useBloqueoNavegacion(MODO_DEMO);
  useSoloPortadaDemo();

  return (
    <>
      <Preloader />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <WhatsAppFloat />
      {MODO_DEMO && <MarcaAgua />}
    </>
  );
}
