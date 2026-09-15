import { createFileRoute, redirect } from "@tanstack/react-router";

/** El sitio vivió en /home durante la revisión; ese enlace ahora lleva a la raíz. */
export const Route = createFileRoute("/home/")({
  beforeLoad: () => {
    throw redirect({ to: "/", replace: true });
  },
});
