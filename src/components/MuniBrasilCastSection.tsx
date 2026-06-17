import { motion } from "framer-motion";
import { Youtube, Play } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { site } from "@/lib/site";

const videos = [
  { src: "/fotos/carlos-munibrasilcast.jpg", alt: "Episódio do MuniBrasilCast", wide: true, pos: "object-center" },
  { src: "/fotos/carlos-podcast.jpg", alt: "Bastidores do MuniBrasilCast", pos: "object-top" },
  { src: "/fotos/carlos-podcast-acao.jpg", alt: "Gravação do MuniBrasilCast", pos: "object-[center_35%]" },
];

const MuniBrasilCastSection = () => {
  return (
    <section id="munibrasilcast" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal>
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-12">
            {/* brilho azul/verde */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-green-brand/20 blur-3xl" aria-hidden />

            <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-blue">
                  <Youtube className="h-4 w-4" /> Canal no YouTube
                </span>

                {/* Logo MuniBrasil (sem fundo) */}
                <img
                  src="/logo-munibrasil.svg"
                  alt="MuniBrasil"
                  className="mt-6 h-20 w-auto sm:h-24"
                  width={300}
                  height={215}
                />
                <h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">
                  MuniBrasil<span className="text-gold">Cast</span>
                </h2>

                <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
                  Nosso canal sobre gestão municipal, direito público e os bastidores do poder
                  legislativo. Conteúdo estratégico para quem vive a política pública na prática.
                </p>
                <a
                  href={site.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-accent-foreground transition-all hover:scale-[1.03] hover:glow-gold"
                >
                  <Youtube className="h-5 w-5" strokeWidth={2} />
                  Assistir no YouTube
                </a>
              </div>

              {/* Thumbnails clicáveis (fotos reais do cenário) */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
                {videos.map((video) => (
                  <motion.a
                    key={video.src}
                    href={site.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`group relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-primary/50 hover:glow-blue ${
                      video.wide ? "sm:col-span-2 lg:col-span-2" : ""
                    }`}
                    aria-label="Assistir no YouTube"
                  >
                    <SmartImage
                      src={video.src}
                      alt={video.alt}
                      className={`absolute inset-0 h-full w-full object-cover ${video.pos ?? "object-center"} opacity-80 transition-opacity group-hover:opacity-100`}
                      fallback={<span className="absolute inset-0 bg-white/5" />}
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-background-deep/70 to-transparent" />
                    <span className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/70 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:text-gold">
                      <Play className="relative h-6 w-6 translate-x-0.5 fill-current" strokeWidth={0} />
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default MuniBrasilCastSection;
