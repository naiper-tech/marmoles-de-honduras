import { createFileRoute, redirect } from "@tanstack/react-router";

/** Las páginas de revisión (/home/nosotros, /home/contacto…) ya viven en la raíz. */
const PAGINAS = {
  nosotros: "/nosotros",
  produccion: "/produccion",
  proyectos: "/proyectos",
  contacto: "/contacto",
} as const;

export const Route = createFileRoute("/home/$")({
  beforeLoad: ({ params }) => {
    const destino = PAGINAS[params._splat as keyof typeof PAGINAS] ?? "/";
    throw redirect({ to: destino, replace: true });
  },
});
