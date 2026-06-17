import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, PlayCircle, UserRound, ImageIcon, ChevronDown } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import { site } from "@/lib/site";

/**
 * Faixas verticais de fotos da hero.
 * Os arquivos ficam em /public/fotos/ (ver LEIA-ME.txt). Sem eles, mostra placeholder.
 * `main: true` = retrato em destaque (faixa mais larga, em cor; as demais em P&B).
 */
type Strip = { src?: string; alt: string; main?: boolean };

const strips: Strip[] = [
  { src: "/fotos/carlos-evento.jpg", alt: "Carlos Carvalho Rocha em palestra na Marcha em Defesa dos Municípios" },
  { src: "/fotos/carlos-formal.jpg", alt: "Carlos Carvalho Rocha", main: true },
  { src: "/fotos/carlos-retrato.jpg", alt: "Carlos Carvalho Rocha" },
];

const PhotoStrips = () => (
  <div className="flex h-full w-full">
    {strips.map((strip, i) => (
      <motion.div
        key={strip.alt + (strip.main ? "-main" : "")}
        initial={{ opacity: 0, y: 72 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 + i * 0.16, ease: [0.22, 1, 0.36, 1] }}
        className={`relative h-full overflow-hidden border-l border-white/10 first:border-l-0 ${
          strip.main ? "flex-[1.4]" : "flex-1"
        }`}
      >
        <SmartImage
          src={strip.src}
          alt={strip.alt}
          className={`h-full w-full object-cover object-top ${
            strip.main ? "animate-slow-zoom" : "grayscale"
          }`}
          fallback={
            <div
              className={`flex h-full w-full flex-col items-center justify-center gap-3 ${
                strip.main
                  ? "bg-gradient-to-b from-primary/15 via-blue-deep/10 to-transparent"
                  : "bg-gradient-to-b from-white/[0.04] to-transparent"
              }`}
            >
              {strip.main ? (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                    <UserRound className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">
                    Retrato
                  </span>
                </>
              ) : (
                <ImageIcon className="h-7 w-7 text-muted-foreground/25" strokeWidth={1} />
              )}
            </div>
          }
        />
        {/* leve gradiente inferior para profundidade */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background-deep/70 to-transparent" />
      </motion.div>
    ))}
  </div>
);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: as fotos descem mais devagar que o scroll;
  // o texto sobe um pouco mais rápido e esmaece.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photosY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background-deep"
    >
      {/* brilho azul inferior-esquerdo */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_45%_at_8%_85%,hsl(var(--primary)/0.28),transparent_70%)]" />

      {/* Painel de fotos à direita (desktop) */}
      <div className="absolute inset-y-0 right-0 hidden w-[46%] lg:block">
        <motion.div style={{ y: photosY }} className="h-full">
          <PhotoStrips />
        </motion.div>
        {/* funde a borda esquerda no escuro */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background-deep to-transparent" />
        {/* fade no rodapé */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background-deep to-transparent" />
      </div>

      {/* ---------- Conteúdo ---------- */}
      <div className="container relative z-10 pt-24 lg:pt-0">
        <div className="grid items-center lg:grid-cols-2">
          <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-xl">
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-blue"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-green-brand shadow-[0_0_8px_hsl(var(--green-brand))]" />
              Direito Público &amp; Legislativo
            </motion.span>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 font-['Inter_Tight'] text-4xl font-light leading-[1.08] tracking-tight sm:text-5xl lg:text-[4rem]"
            >
              Excelência jurídica a serviço da{" "}
              <span className="font-normal text-blue">Administração Pública.</span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
            >
              Assessoria e consultoria especializadas para Municípios, Câmaras de Vereadores e
              Parlamentares — com a experiência de quem viveu o poder executivo e legislativo por
              dentro.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <a
                href={site.whatsappPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-green-brand px-7 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:glow-green"
              >
                <MessageCircle className="h-5 w-5" strokeWidth={2} />
                Iniciar conversa no WhatsApp
              </a>
              <a
                href="#munibrasilcast"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-white/5 px-7 py-3.5 text-base font-medium text-foreground backdrop-blur transition-all hover:border-primary hover:glow-blue"
              >
                <PlayCircle className="h-5 w-5 text-blue" strokeWidth={1.75} />
                Conheça o MuniBrasilCast
              </a>
            </motion.div>
          </motion.div>

          {/* Faixa de fotos no mobile (abaixo do texto) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 h-[44vh] min-h-[320px] overflow-hidden rounded-2xl border border-white/10 lg:hidden"
          >
            <PhotoStrips />
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 lg:block">
        <motion.a
          href="#sobre"
          aria-label="Rolar para a próxima seção"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-muted-foreground/60 transition-colors hover:text-foreground"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Role</span>
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
