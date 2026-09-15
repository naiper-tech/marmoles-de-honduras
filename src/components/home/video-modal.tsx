import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { useLang } from "@/lib/i18n";
import { YOUTUBE_ID } from "@/lib/home-contenido";

/** Video institucional a pantalla completa. El reproductor solo se carga al abrir. */
export function VideoModal({ abierto, alCerrar }: { abierto: boolean; alCerrar: () => void }) {
  const { t } = useLang();
  const titulo = t("Video institucional de Mármoles de Honduras", "Mármoles de Honduras film");

  return (
    <Dialog.Root open={abierto} onOpenChange={(v) => !v && alCerrar()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-mdh-tinta/95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="mdh fixed inset-0 z-[90] flex items-center justify-center p-4 font-mdh outline-none md:p-14"
        >
          <Dialog.Title className="sr-only">{titulo}</Dialog.Title>
          <Dialog.Close
            aria-label={t("Cerrar video", "Close video")}
            className="absolute right-3 top-3 grid h-12 w-12 place-items-center text-white/75 transition-colors hover:text-white md:right-8 md:top-8"
          >
            <X strokeWidth={1.25} />
          </Dialog.Close>
          <div className="aspect-video w-full max-w-6xl bg-black">
            {abierto && (
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={titulo}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
              />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
