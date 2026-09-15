import { useTexto, valores } from "@/lib/home-contenido";
import { useLang } from "@/lib/i18n";
import { Aparecer, Emerge } from "./movimiento";

const pad = (n: number) => String(n).padStart(2, "0");

/** Los cinco valores del brief de marca. Al hover, la fila se ilumina y el texto avanza. */
export function Valores() {
  const { t, lang } = useLang();
  const tx = useTexto();

  return (
    <section aria-labelledby="valores-titulo" className="bg-mdh-tinta text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-28 md:px-10 md:py-40">
        <div className="grid gap-10 md:grid-cols-12">
          <Aparecer className="md:col-span-3">
            <p className="mdh-label text-white/55">{t("Valores", "Values")}</p>
          </Aparecer>
          <h2
            id="valores-titulo"
            className="text-[clamp(2.1rem,4.6vw,4.5rem)] font-light leading-[1.06] tracking-[-0.015em] md:col-span-9"
          >
            <Emerge
              key={lang}
              lineas={lang === "en" ? ["What holds", "us together."] : ["Lo que nos", "sostiene."]}
            />
          </h2>
        </div>

        <ol className="mt-20 border-t border-white/15 md:mt-28">
          {valores.map((valor, i) => (
            <li key={valor.es} className="group relative overflow-hidden border-b border-white/15">
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-white/[0.045] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
              />
              <Aparecer
                retraso={i * 0.05}
                className="relative grid gap-4 py-8 md:grid-cols-12 md:items-center md:py-12"
              >
                <span className="mdh-label text-white/40 transition-colors duration-500 group-hover:text-white md:col-span-3">
                  {pad(i + 1)}
                </span>
                <p className="text-2xl font-light leading-snug transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:col-span-8 md:text-[clamp(2rem,3.4vw,3.25rem)]">
                  {tx(valor)}
                </p>
                <span aria-hidden="true" className="hidden justify-end md:col-span-1 md:flex">
                  <span className="h-px w-10 origin-right scale-x-0 bg-white transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                </span>
              </Aparecer>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
