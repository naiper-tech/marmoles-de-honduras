import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";

import { CONTACTO, proyectosDestacados, tiposProyecto, useTexto } from "@/lib/home-contenido";
import { loc, useLang } from "@/lib/i18n";
import { Magnetico } from "./efectos";
import { EASE } from "./movimiento";

const CAMPO =
  "mt-3 block w-full rounded-none border-0 border-b border-mdh-tinta/20 bg-transparent px-0 py-3 text-lg font-light text-mdh-tinta placeholder:text-mdh-pizarra/50 focus:outline-none focus-visible:outline-none";

/**
 * Formulario de consulta. Pide lo que el brief define (país, tipo de proyecto y
 * volumen) y lo entrega por correo con todo ordenado: no requiere servidor.
 *
 * Al migrar a Netlify puede conectarse a Netlify Forms sin cambiar los campos.
 */
export function FormularioContacto({ proyectoSlug }: { proyectoSlug?: string }) {
  const { t, lang } = useLang();
  const tx = useTexto();
  const [enviado, setEnviado] = useState(false);

  const proyecto = proyectosDestacados.find((p) => p.slug === proyectoSlug);
  const referencia = proyecto ? loc(proyecto, lang).titulo : undefined;

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const datos = new FormData(evento.currentTarget);
    const valor = (clave: string) => String(datos.get(clave) ?? "").trim();
    const opcional = (etiqueta: string, v: string) => (v ? `${etiqueta}: ${v}` : null);

    const tipo = valor("tipo");
    const pais = valor("pais");
    const asunto = [t("Consulta de proyecto", "Project inquiry"), tipo, pais].filter(Boolean).join(" — ");
    const cuerpo = [
      `${t("Nombre", "Name")}: ${valor("nombre")}`,
      `${t("Correo", "Email")}: ${valor("correo")}`,
      opcional(t("Empresa", "Company"), valor("empresa")),
      `${t("País del proyecto", "Project country")}: ${pais}`,
      `${t("Tipo de proyecto", "Project type")}: ${tipo}`,
      opcional(t("Volumen estimado", "Estimated volume"), valor("volumen")),
      opcional(t("Referencia", "Reference"), referencia ?? ""),
      "",
      valor("mensaje"),
    ]
      .filter((linea): linea is string => linea !== null)
      .join("\n");

    window.location.href = `mailto:${CONTACTO.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    setEnviado(true);
  }

  return (
    <form onSubmit={enviar} className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
      {referencia && (
        <p className="border-l border-mdh-tinta pl-5 leading-relaxed text-mdh-acero sm:col-span-2">
          {t("Consulta sobre un proyecto similar a", "Inquiry about a project similar to")}{" "}
          <span className="text-mdh-tinta">{referencia}</span>
        </p>
      )}

      <Campo id="nombre" etiqueta={t("Nombre", "Name")}>
        <input id="nombre" name="nombre" required autoComplete="name" className={CAMPO} />
      </Campo>
      <Campo id="correo" etiqueta={t("Correo", "Email")}>
        <input id="correo" name="correo" type="email" required autoComplete="email" className={CAMPO} />
      </Campo>
      <Campo id="empresa" etiqueta={t("Empresa (opcional)", "Company (optional)")}>
        <input id="empresa" name="empresa" autoComplete="organization" className={CAMPO} />
      </Campo>
      <Campo id="pais" etiqueta={t("País del proyecto", "Project country")}>
        <input id="pais" name="pais" required autoComplete="country-name" className={CAMPO} />
      </Campo>

      <Campo id="tipo" etiqueta={t("Tipo de proyecto", "Project type")}>
        <select id="tipo" name="tipo" required defaultValue="" className={`${CAMPO} cursor-pointer`}>
          <option value="" disabled>
            {t("Selecciona una opción", "Select an option")}
          </option>
          {tiposProyecto.map((tipo) => (
            <option key={tipo.es} value={tx(tipo)}>
              {tx(tipo)}
            </option>
          ))}
        </select>
      </Campo>

      <Campo id="volumen" etiqueta={t("Volumen estimado (opcional)", "Estimated volume (optional)")}>
        <input id="volumen" name="volumen" placeholder={t("Ej. 400 m²", "e.g. 400 m²")} className={CAMPO} />
      </Campo>

      <Campo id="mensaje" etiqueta={t("Cuéntanos sobre el proyecto", "Tell us about the project")} ancho>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          required
          defaultValue={
            referencia
              ? t(`Me interesa algo similar a ${referencia}.`, `I'm interested in something similar to ${referencia}.`)
              : ""
          }
          className={`${CAMPO} resize-none`}
        />
      </Campo>

      <div className="flex flex-col gap-8 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <div role="status" className="min-h-12 max-w-sm text-sm leading-relaxed text-mdh-pizarra">
          <AnimatePresence mode="wait">
            {enviado ? (
              <motion.p
                key="enviado"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="flex gap-3 text-mdh-tinta"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={1.5} />
                {t(
                  `Abrimos tu correo con la consulta lista. Si no se abrió, escríbenos a ${CONTACTO.correo}.`,
                  `We opened your email with the inquiry ready. If it didn't open, write to ${CONTACTO.correo}.`,
                )}
              </motion.p>
            ) : (
              <motion.p key="ayuda" exit={{ opacity: 0 }}>
                {t(
                  "Al enviar se abre tu correo con la información lista para mandar.",
                  "Submitting opens your email with everything ready to send.",
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <Magnetico className="self-start sm:self-auto">
          <button
            type="submit"
            className="group relative inline-flex items-center justify-between gap-10 overflow-hidden bg-mdh-tinta px-8 py-5 text-white"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 translate-y-full bg-mdh-acero transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
            />
            <span className="mdh-label relative">{t("Enviar consulta", "Send inquiry")}</span>
            <ArrowUpRight
              className="relative h-5 w-5 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45"
              strokeWidth={1.5}
            />
          </button>
        </Magnetico>
      </div>
    </form>
  );
}

/** Campo con etiqueta que se oscurece y una línea que se dibuja al enfocar. */
function Campo({
  id,
  etiqueta,
  ancho = false,
  children,
}: {
  id: string;
  etiqueta: string;
  ancho?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`group relative ${ancho ? "sm:col-span-2" : ""}`}>
      <label
        htmlFor={id}
        className="mdh-label text-mdh-pizarra transition-colors duration-500 group-focus-within:text-mdh-tinta"
      >
        {etiqueta}
      </label>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-mdh-tinta transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-focus-within:scale-x-100"
      />
    </div>
  );
}
