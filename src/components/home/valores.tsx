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
        {/* Reunión 29/09: "Valores" al frente —es lo que la empresa más empuja— y la frase como subtítulo. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="valores-titulo"
            className="text-[clamp(3.25rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]"
          >
            <Emerge key={lang} lineas={[t("Valores", "Values")]} />
          </h2>
          <Aparecer retraso={0.15}>
            <p className="text-xl font-light text-white/70 md:pb-3 md:text-2xl">
              {t("Lo que nos sostiene.", "What holds us together.")}
            </p>
          </Aparecer>
        </div>

        <ol className="mt-16 border-t border-white/15 md:mt-20">
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
                <p className="text-2xl font-light leading-snug transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-4 md:col-span-8 md:text-[clamp(1.6rem,2.6vw,2.4rem)]">
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
