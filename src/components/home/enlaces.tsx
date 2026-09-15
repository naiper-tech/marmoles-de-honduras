import { Link, type LinkProps } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

/** Enlace de texto con flecha para pasar de un adelanto a su página completa. */
export function EnlaceMas({
  to,
  children,
  className = "",
}: {
  to: LinkProps["to"];
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`mdh-label group inline-flex items-center gap-3 border-b border-current pb-2 ${className}`}
    >
      {children}
      <ArrowUpRight
        className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.5}
      />
    </Link>
  );
}
