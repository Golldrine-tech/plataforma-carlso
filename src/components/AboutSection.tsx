import { useRef } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { ImageIcon, Scale } from "lucide-react";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

/**
 * Mosaico de fotos institucionais. Arquivos em /public/fotos/ (ver LEIA-ME.txt).
 * Tiles sem `src` ficam como placeholder elegante.
 */
type Tile = { src?: string; alt: string; area: string; label?: string; brand?: boolean; bw?: boolean };

const tiles: Tile[] = [
  { src: "/fotos/carlos-evento.jpg", alt: "Carlos Carvalho Rocha em palestra", area: "1 / 1 / 3 / 2", label: "Evento", bw: true },
  { src: "/fotos/carlos-retrato-2.jpg", alt: "Carlos Carvalho Rocha", area: "1 / 2 / 4 / 3", label: "Retrato", brand: true },
  { src: "/fotos/carlos-podcast.jpg", alt: "Carlos Carvalho Rocha no podcast", area: "1 / 3 / 3 / 4", label: "Podcast", bw: true },
  { src: "/fotos/carlos-podcast-acao.jpg", alt: "Carlos Carvalho Rocha gravando", area: "3 / 1 / 5 / 2", label: "Gravação", bw: true },
  { src: "/fotos/carlos-formal.jpg", alt: "Carlos Carvalho Rocha", area: "4 / 2 / 5 / 3" },
  { src: "/fotos/carlos-munibrasilcast.jpg", alt: "Carlos Carvalho Rocha no MuniBrasilCast", area: "3 / 3 / 5 / 4", label: "MuniBrasilCast", bw: true },
];

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 26, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const MosaicTile = ({ tile }: { tile: Tile }) => (
  <motion.div
    variants={tileVariants}
    style={{ gridArea: tile.area }}
    className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
  >
    <SmartImage
      src={tile.src}
      alt={tile.alt}
      className={`h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-105 ${
        tile.bw ? "grayscale group-hover:grayscale-0" : ""
      }`}
      fallback={
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-white/[0.05] to-transparent">
          {tile.brand ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <Scale className="h-6 w-6" strokeWidth={1.5} />
            </div>
          ) : (
            <ImageIcon className="h-7 w-7 text-muted-foreground/30" strokeWidth={1} />
          )}
          {tile.label && (
            <span className="px-2 text-center text-[10px] uppercase tracking-wider text-muted-foreground/50">
              {tile.label}
            </span>
          )}
        </div>
      }
    />
  </motion.div>
);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax do nome fantasma: desliza lateralmente conforme o scroll.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["4%", "-6%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} id="sobre" className="relative overflow-hidden py-24 md:py-32">
      {/* brilho azul estático à esquerda */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_15%_25%,hsl(var(--primary)/0.18),transparent_65%)]"
        aria-hidden
      />

      {/* nome "fantasma" ao fundo, com parallax horizontal */}
      <div className="pointer-events-none absolute inset-x-0 top-8 flex justify-center md:top-4" aria-hidden>
        <motion.span
          style={{ x: ghostX, opacity: ghostOpacity }}
          className="select-none whitespace-nowrap font-display text-[16vw] font-bold leading-none tracking-tight text-white/[0.04]"
        >
          CARLOS ROCHA
        </motion.span>
      </div>

      <div className="container relative z-10 grid items-center gap-12 pt-20 lg:grid-cols-2 lg:gap-16 lg:pt-28">
        {/* Mosaico de fotos com entrada escalonada */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <motion.div
            className="grid aspect-[4/5] gap-3"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridTemplateRows: "repeat(4, 1fr)",
            }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
          >
            {tiles.map((tile) => (
              <MosaicTile key={tile.alt} tile={tile} />
            ))}
          </motion.div>
          {/* fade inferior para o escuro */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 rounded-b-xl bg-gradient-to-t from-background-deep to-transparent" />
        </div>

        {/* Texto */}
        <div>
          <Reveal>
            <div className="glow-rule" />
            <p className="mt-5 text-sm font-medium uppercase tracking-[0.22em] text-blue">
              Quem somos
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.6rem]">
              Uma banca dedicada ao <span className="text-blue">Direito Público</span> e à{" "}
              <span className="font-bold text-foreground">técnica legislativa</span>.
            </h2>
          </Reveal>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -60px 0px" }}
            transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 space-y-5 text-lg leading-relaxed text-muted-foreground"
          >
            <p>
              <strong className="font-semibold text-foreground">
                Atuação consolidada no consultivo e no contencioso
              </strong>{" "}
              voltados à Administração Pública, unindo rigor técnico-jurídico à vivência prática na
              gestão municipal e no processo legislativo.
            </p>
            <p>
              Oferecemos a entes públicos, câmaras e parlamentares uma assessoria{" "}
              <strong className="font-semibold text-foreground">
                estratégica, preventiva e orientada a resultados
              </strong>{" "}
              — com a experiência de quem viveu o poder executivo e legislativo por dentro.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
