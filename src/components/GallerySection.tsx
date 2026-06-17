import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, Expand } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Reveal, { RevealGroup, itemVariants } from "@/components/Reveal";

// [PLACEHOLDER GALERIA — 6 imagens] — preencher `src`; o lightbox já está pronto.
const images: { src?: string; alt: string }[] = [
  { alt: "Atuação institucional 1" },
  { alt: "Atuação institucional 2" },
  { alt: "Atuação institucional 3" },
  { alt: "Atuação institucional 4" },
  { alt: "Atuação institucional 5" },
  { alt: "Atuação institucional 6" },
];

const GallerySection = () => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galeria" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glow-rule glow-rule-center" />
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Atuação em imagens</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Registros de eventos, palestras e bastidores do trabalho institucional.
          </p>
        </Reveal>

        <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {images.map((image, i) => (
            <motion.button
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              type="button"
              onClick={() => setActive(i)}
              className="group relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-shadow hover:glow-blue"
              aria-label={`Ampliar imagem: ${image.alt}`}
            >
              {image.src ? (
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <ImageIcon className="h-10 w-10 text-muted-foreground/40" strokeWidth={1} />
              )}
              <span className="absolute inset-0 flex items-center justify-center bg-background-deep/0 opacity-0 transition-all duration-300 group-hover:bg-background-deep/50 group-hover:opacity-100">
                <Expand className="h-7 w-7 text-foreground" strokeWidth={1.5} />
              </span>
            </motion.button>
          ))}
        </RevealGroup>
      </div>

      <Dialog open={active !== null} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-transparent p-0 shadow-none">
          {active !== null && (
            <div className="glass-strong flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl">
              {images[active].src ? (
                <img
                  src={images[active].src}
                  alt={images[active].alt}
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <ImageIcon className="h-12 w-12" strokeWidth={1} />
                  <p className="text-sm">{images[active].alt}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default GallerySection;
