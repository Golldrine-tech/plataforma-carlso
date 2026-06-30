import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import {
  Play, BookOpen, Award, ChevronRight, Star, Check,
  ArrowRight, Scale, Video, Users, Zap, Lock, Shield,
  TrendingUp, FileText, Menu, X,
} from "lucide-react";

/* ── design tokens ───────────────────────────────────────── */
const BG    = "#05090e";
const FG    = "#e8edf2";
const GOLD  = "hsl(45 92% 55%)";
const BLUE  = "hsl(214 74% 52%)";
const MUTED = "rgba(232,237,242,0.5)";

/* ── utility ─────────────────────────────────────────────── */
function FadeIn({
  children, delay = 0, y = 30, x = 0, duration = 0.7,
  className = "",
}: {
  children: React.ReactNode; delay?: number; y?: number; x?: number;
  duration?: number; className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(160deg, #c8d8e8 0%, #ffffff 40%, #a8c4dc 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
}

function AnimatedNumber({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionVal.set(to);
  }, [inView, to, motionVal]);

  useEffect(() => spring.on("change", v => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── mini platform mockup (inside ContainerScroll) ──────── */
const cursosMini = [
  { titulo: "Lei de Licitações na Prática",       foto: "/fotos/carlos-podcast.jpg",        pos: "object-[center_20%]", tag: "LICITAÇÕES",   premium: false },
  { titulo: "Improbidade Administrativa",          foto: "/fotos/carlos-retrato.jpg",        pos: "object-[center_15%]", tag: "DIR. PÚBLICO", premium: true  },
  { titulo: "Técnica Legislativa",                 foto: "/fotos/carlos-evento.jpg",         pos: "object-[center_20%]", tag: "LEGISLATIVO",  premium: false },
  { titulo: "Plano Diretor",                       foto: "/fotos/daniella.jpg",              pos: "object-[center_22%]", tag: "URBANISMO",    premium: true  },
  { titulo: "Direito Eleitoral",                   foto: "/fotos/carlos-munibrasilcast.jpg", pos: "object-[center_25%]", tag: "ELEITORAL",    premium: true  },
  { titulo: "Proc. Adm. Disciplinar",              foto: "/fotos/carlos-podcast-acao.jpg",   pos: "object-[center_30%]", tag: "PAD",          premium: true  },
  { titulo: "Gestão de Contratos",                 foto: "/fotos/carlos-retrato-2.jpg",      pos: "object-[center_15%]", tag: "GESTÃO",       premium: false },
  { titulo: "Regimento Interno",                   foto: "/fotos/carlos-formal.jpg",         pos: "object-[center_15%]", tag: "CÂMARA",       premium: false },
];

function DashboardMockup() {
  return (
    <div className="h-full w-full flex text-white overflow-hidden" style={{ fontSize: "10px", background: BG }}>
      {/* sidebar */}
      <div className="w-[13%] h-full border-r flex flex-col gap-1.5 py-3 px-2 shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)", background: "#060c17" }}>
        <img src="/logo-munibrasil.svg" alt="MuniBrasil" className="h-4 w-auto mb-2 ml-1" />
        {["Início","Vídeos","Normas","Trilhas","Decretos"].map(n => (
          <div key={n} className="rounded px-2 py-1 flex items-center gap-1.5" style={{ background: n==="Início" ? "rgba(59,130,246,0.15)" : "transparent", opacity: n==="Início" ? 1 : 0.45 }}>
            <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ background: n==="Início" ? BLUE : "rgba(255,255,255,0.3)" }} />
            <span style={{ fontSize: 7 }}>{n}</span>
          </div>
        ))}
      </div>

      {/* main */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* topbar */}
        <div className="h-7 border-b flex items-center px-3 gap-2 shrink-0" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
          <div className="flex-1 rounded px-2 py-0.5 text-[6px] opacity-40" style={{ background: "rgba(255,255,255,0.06)" }}>Buscar conteúdo...</div>
          <div className="h-4 w-4 rounded-full flex items-center justify-center text-[5px] font-bold shrink-0" style={{ background: BLUE }}>JM</div>
        </div>

        {/* content area */}
        <div className="flex-1 overflow-hidden p-2 flex flex-col gap-1.5 min-h-0">
          {/* hero banner */}
          <div className="rounded-xl overflow-hidden relative shrink-0" style={{ height: "22%" }}>
            <img src="/fotos/carlos-munibrasilcast.jpg" className="absolute inset-0 w-full h-full object-cover object-[70%_35%]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.35) 65%)" }} />
            <div className="relative z-10 p-2 flex flex-col justify-end h-full">
              <div className="text-[5px] font-bold mb-0.5 uppercase tracking-widest" style={{ color: GOLD }}>Em destaque</div>
              <div className="text-[8px] font-bold leading-tight">Lei de Licitações na Prática</div>
              <div className="mt-1">
                <div className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[5px] font-bold" style={{ background: BLUE }}>▶ Assistir agora</div>
              </div>
            </div>
          </div>

          {/* section label */}
          <div className="flex items-center justify-between px-0.5 shrink-0">
            <span className="text-[6px] font-semibold opacity-60">Todos os conteúdos</span>
            <span className="text-[5px] opacity-40" style={{ color: BLUE }}>Ver todos →</span>
          </div>

          {/* 4-col × 2-row grid */}
          <div className="grid grid-cols-4 gap-1.5 flex-1 min-h-0" style={{ gridTemplateRows: "1fr 1fr" }}>
            {cursosMini.map(c => (
              <div key={c.titulo} className="rounded-lg overflow-hidden flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="relative flex-1">
                  <img src={c.foto} className={`absolute inset-0 w-full h-full object-cover ${c.pos}`} />
                  {c.premium && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: "blur(3px)", background: "rgba(5,9,14,0.5)" }}>
                      <span style={{ fontSize: 7, color: GOLD }}>🔒</span>
                    </div>
                  )}
                  <div className="absolute top-0.5 left-0.5 rounded px-0.5 text-[4px] font-bold" style={{ background: "rgba(0,0,0,0.75)" }}>{c.tag}</div>
                </div>
                <div className="px-1 py-0.5 shrink-0">
                  <div className="text-[4.5px] leading-tight opacity-80 truncate">{c.titulo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── navbar ──────────────────────────────────────────────── */
function Navbar({ onCTA }: { onCTA: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = ["Funcionalidades", "Conteúdo", "Planos", "Depoimentos"];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(5,9,14,0.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <img src="/logo-munibrasil.svg" alt="MuniBrasil" className="h-12 w-auto" />

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium uppercase tracking-wide transition-opacity hover:opacity-70" style={{ color: FG }}>{l}</a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCTA}
            className="hidden md:flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold transition-all hover:scale-105"
            style={{ background: BLUE, color: "#fff" }}
          >
            Acessar plataforma <ArrowRight className="h-4 w-4" />
          </button>
          <button className="md:hidden p-2" style={{ color: FG }} onClick={() => setOpen(!open)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "rgba(5,9,14,0.97)" }}>
          {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-sm font-medium uppercase tracking-wide py-2" style={{ color: FG }}>{l}</a>)}
          <button onClick={onCTA} className="rounded-full px-5 py-2.5 text-sm font-bold text-center" style={{ background: BLUE, color: "#fff" }}>Acessar plataforma</button>
        </motion.div>
      )}
    </motion.nav>
  );
}

/* ── hero ────────────────────────────────────────────────── */
function Hero({ onCTA }: { onCTA: () => void }) {
  return (
    <section style={{ background: BG, overflow: "hidden" }}>
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center gap-6 pt-24 md:pt-28">
            <FadeIn delay={0}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest"
                style={{ background: `${BLUE}20`, border: `1px solid ${BLUE}44`, color: BLUE }}>
                <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: BLUE }} />
                Plataforma de Conteúdo Legislativo
              </div>
            </FadeIn>

            <FadeIn delay={0.15} y={40}>
              <h1 className="font-black uppercase tracking-tight leading-none"
                style={{ fontSize: "clamp(1.7rem, 5.5vw, 7rem)" }}>
                <GradientText>Legislação<br className="sm:hidden" /> comentada.</GradientText>
                <br />
                <span style={{ color: GOLD }}>Gestores<br className="sm:hidden" /> preparados.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3} y={20}>
              <p className="max-w-xl text-center leading-relaxed" style={{ color: MUTED, fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)" }}>
                Vídeos comentados, normas atualizadas e trilhas completas — tudo que o gestor municipal precisa para liderar com segurança jurídica.
              </p>
            </FadeIn>

            <FadeIn delay={0.45} y={20}>
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={onCTA}
                  className="flex items-center gap-2.5 rounded-full px-8 py-3.5 font-bold transition-all hover:scale-105 hover:brightness-110"
                  style={{ background: BLUE, color: "#fff", fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
                >
                  <Play className="h-4 w-4 fill-current" /> Ver demonstração
                </button>
                <button
                  onClick={onCTA}
                  className="flex items-center gap-2.5 rounded-full px-8 py-3.5 font-medium transition-all hover:opacity-80"
                  style={{ background: "rgba(255,255,255,0.08)", color: FG, border: "1px solid rgba(255,255,255,0.15)", fontSize: "clamp(0.85rem, 1.5vw, 1rem)" }}
                >
                  Conheça os planos <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </FadeIn>
          </div>
        }
      >
        <DashboardMockup />
      </ContainerScroll>
    </section>
  );
}

/* ── stats strip ─────────────────────────────────────────── */
function StatsStrip() {
  const stats = [
    { label: "Gestores ativos",       value: 500,  suffix: "+" },
    { label: "Normas comentadas",     value: 300,  suffix: "+" },
    { label: "Horas de conteúdo",     value: 6,    suffix: "h+" },
    { label: "Municípios atendidos",  value: 50,   suffix: "+" },
  ];
  return (
    <section id="funcionalidades" style={{ background: "#060c17", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.1}>
            <div>
              <div className="font-black leading-none mb-1" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: GOLD }}>
                <AnimatedNumber to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm uppercase tracking-widest font-medium" style={{ color: MUTED }}>{s.label}</div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── features (scroll-driven slide-in) ──────────────────── */
const features = [
  {
    num: "01",
    title: "Normas sempre atualizadas",
    desc: "Acesse leis, decretos e resoluções municipais com comentários práticos do Dr. Carlos Rocha. Nunca mais aplique uma norma desatualizada.",
    icon: Scale,
    color: BLUE,
    img: "/fotos/carlos-formal.jpg",
    imgPos: "object-[center_15%]",
    bullets: ["Leis federais comentadas", "Legislação municipal específica", "Alertas de atualização em tempo real", "Indexação por tema e município"],
  },
  {
    num: "02",
    title: "Vídeos e episódios comentados",
    desc: "Aulas práticas e episódios do MuniBrasilCast com análise profunda de cada norma — como se o especialista estivesse ao seu lado na hora da decisão.",
    icon: Video,
    color: GOLD,
    img: "/fotos/carlos-podcast.jpg",
    imgPos: "object-[center_20%]",
    bullets: ["8+ conteúdos disponíveis", "Formato podcast e videoaula", "Transcrições completas", "Reprodução em qualquer dispositivo"],
  },
  {
    num: "03",
    title: "Trilhas de aprendizado estruturadas",
    desc: "Percursos completos do básico ao avançado em gestão municipal, técnica legislativa e direito eleitoral — com certificado ao final.",
    icon: Award,
    color: "hsl(148 60% 45%)",
    img: "/fotos/carlos-evento.jpg",
    imgPos: "object-[center_20%]",
    bullets: ["3 trilhas completas", "Progresso salvo automaticamente", "Certificado de conclusão", "Trilha nova a cada trimestre"],
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const fromLeft = index % 2 === 0;

  // full viewport range: animate in (0→0.35), hold (0.35→0.65), animate out (0.65→1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x       = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [fromLeft ? -160 : 160, 0, 0, fromLeft ? -160 : 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rotate  = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [fromLeft ? -4 : 4, 0, 0, fromLeft ? -4 : 4]);

  const Icon = feature.icon;

  return (
    <div ref={ref} className="mb-6 md:mb-8">
      <motion.div
        style={{
          x,
          opacity,
          rotate,
          background: "#060c17",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        className="rounded-[32px] overflow-hidden flex flex-col md:flex-row"
      >
        {/* text side */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-8">
              <span className="font-black" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", color: feature.color, lineHeight: 1, opacity: 0.2 }}>{feature.num}</span>
              <div className="h-px flex-1" style={{ background: `${feature.color}33` }} />
              <div className="h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: `${feature.color}18`, color: feature.color }}>
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <h3 className="font-black uppercase leading-tight mb-4" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: FG }}>
              {feature.title}
            </h3>
            <p className="leading-relaxed mb-8" style={{ color: MUTED, fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)" }}>{feature.desc}</p>
            <ul className="flex flex-col gap-3">
              {feature.bullets.map(b => (
                <li key={b} className="flex items-center gap-3 text-sm" style={{ color: FG }}>
                  <div className="h-5 w-5 rounded-full flex items-center justify-center shrink-0" style={{ background: `${feature.color}20`, color: feature.color }}>
                    <Check className="h-3 w-3" />
                  </div>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 h-px w-16" style={{ background: feature.color }} />
        </div>

        {/* image side */}
        <div className="w-full md:w-[45%] relative overflow-hidden" style={{ minHeight: 300 }}>
          <img src={feature.img} alt={feature.title} className={`absolute inset-0 w-full h-full object-cover ${feature.imgPos}`} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #060c17 0%, rgba(6,12,23,0.15) 50%, rgba(6,12,23,0) 100%)" }} />
          <div className="md:hidden absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(6,12,23,0) 50%, #060c17 100%)" }} />
        </div>
      </motion.div>
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-5 md:px-10" style={{ background: BG, overflow: "hidden" }}>
      <FadeIn className="text-center mb-16">
        <h2 className="font-black uppercase leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}>
          <GradientText>Tudo que você</GradientText>
          <br />
          <span style={{ color: GOLD }}>precisa. Em um lugar.</span>
        </h2>
      </FadeIn>
      <div className="max-w-5xl mx-auto">
        {features.map((f, i) => (
          <FeatureCard key={f.num} feature={f} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ── content preview ─────────────────────────────────────── */
const cursos = [
  { titulo: "Lei de Licitações na Prática",          categoria: "Licitações",    duracao: "38:14", foto: "/fotos/carlos-podcast.jpg",        pos: "object-[center_20%]", premium: false },
  { titulo: "Improbidade Administrativa Comentada",  categoria: "Direito Público",duracao: "51:07", foto: "/fotos/carlos-retrato.jpg",        pos: "object-[center_15%]", premium: true  },
  { titulo: "Técnica Legislativa para Vereadores",   categoria: "Técnica Legisl.",duracao: "44:22", foto: "/fotos/carlos-evento.jpg",         pos: "object-[center_20%]", premium: false },
  { titulo: "Direito Eleitoral: Regras da Campanha", categoria: "Eleitoral",     duracao: "29:55", foto: "/fotos/carlos-munibrasilcast.jpg",  pos: "object-[center_25%]", premium: true  },
  { titulo: "Processo Administrativo Disciplinar",   categoria: "PAD",           duracao: "55:30", foto: "/fotos/carlos-podcast-acao.jpg",    pos: "object-[center_30%]", premium: true  },
  { titulo: "Gestão de Contratos Municipais",        categoria: "Gestão",        duracao: "33:45", foto: "/fotos/carlos-retrato-2.jpg",       pos: "object-[center_15%]", premium: false },
  { titulo: "Plano Diretor: O Que o Gestor Sabe",   categoria: "Urbanismo",     duracao: "47:10", foto: "/fotos/daniella.jpg",               pos: "object-[center_22%]", premium: true  },
  { titulo: "Regimento Interno da Câmara Municipal", categoria: "Câmara",        duracao: "39:20", foto: "/fotos/carlos-formal.jpg",          pos: "object-[center_15%]", premium: false },
];

function ContentSection({ onCTA }: { onCTA: () => void }) {
  return (
    <section id="conteúdo" className="py-24 px-5 md:px-10" style={{ background: "#060c17", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h2 className="font-black uppercase leading-none" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)", color: FG }}>
            O que você<br /><span style={{ color: GOLD }}>vai aprender</span>
          </h2>
          <p className="max-w-sm leading-relaxed" style={{ color: MUTED }}>
            Conteúdos práticos criados pelo Dr. Carlos Rocha — especialista em direito municipal com mais de 15 anos de experiência.
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cursos.map((c, i) => (
            <FadeIn key={c.titulo} delay={i * 0.05}>
              <div
                className="group rounded-2xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                onClick={onCTA}
              >
                <div className="relative" style={{ paddingTop: "62%" }}>
                  <img src={c.foto} className={`absolute inset-0 w-full h-full object-cover ${c.pos}`} />
                  {c.premium && (
                    <div className="absolute inset-0 flex items-center justify-center" style={{ backdropFilter: "blur(4px)", background: "rgba(5,9,14,0.55)" }}>
                      <div className="flex flex-col items-center gap-1.5">
                        <Lock className="h-5 w-5" style={{ color: GOLD }} />
                        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: GOLD }}>Premium</span>
                      </div>
                    </div>
                  )}
                  {!c.premium && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "rgba(5,9,14,0.4)" }}>
                      <div className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: BLUE }}>
                        <Play className="h-4 w-4 fill-white" style={{ color: "#fff" }} />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 rounded px-2 py-0.5 text-[9px] font-bold uppercase" style={{ background: "rgba(0,0,0,0.7)", color: FG }}>{c.categoria}</div>
                  <div className="absolute bottom-2 right-2 rounded px-2 py-0.5 text-[10px]" style={{ background: "rgba(0,0,0,0.7)", color: FG }}>{c.duracao}</div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold leading-tight line-clamp-2" style={{ color: FG }}>{c.titulo}</p>
                  <p className="text-[11px] mt-1" style={{ color: MUTED }}>Dr. Carlos Rocha</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2} className="mt-10 text-center">
          <button onClick={onCTA} className="inline-flex items-center gap-2 rounded-full px-8 py-3.5 font-bold transition-all hover:scale-105" style={{ background: BLUE, color: "#fff" }}>
            Acessar todos os conteúdos <ArrowRight className="h-4 w-4" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── testimonials ────────────────────────────────────────── */
const depoimentos = [
  {
    nome: "Vereador Marcos Andrade",
    cargo: "Câmara Municipal de Goiânia — GO",
    foto: "/fotos/carlos-formal.jpg",
    texto: "A plataforma mudou minha forma de trabalhar. Antes eu precisava contratar consultorias caras para cada dúvida. Agora tenho o Dr. Carlos Rocha disponível a qualquer momento, explicando exatamente o que preciso saber.",
    stars: 5,
  },
  {
    nome: "Assessora Fernanda Lopes",
    cargo: "Prefeitura de Campinas — SP",
    foto: "/fotos/daniella.jpg",
    texto: "O curso de Licitações me salvou em uma licitação de R$ 2 milhões. Identifiquei um vício no edital que teria gerado impugnação. Vale cada centavo do investimento.",
    stars: 5,
  },
  {
    nome: "Presidente Rodrigo Silva",
    cargo: "Câmara Municipal de Palmas — TO",
    foto: "/fotos/carlos-podcast-acao.jpg",
    texto: "Recomendo para toda a equipe técnica da Câmara. A trilha de Técnica Legislativa é completa e prática. Nossos projetos de lei melhoraram visivelmente em qualidade formal.",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 px-5 md:px-10" style={{ background: BG }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <h2 className="font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
            <GradientText>Quem usa,</GradientText>{" "}
            <span style={{ color: GOLD }}>aprova.</span>
          </h2>
          <p style={{ color: MUTED }}>Gestores e vereadores que transformaram sua prática com a plataforma.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {depoimentos.map((d, i) => (
            <FadeIn key={d.nome} delay={i * 0.1}>
              <div className="rounded-2xl p-6 flex flex-col gap-4 h-full" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex gap-1">
                  {Array.from({ length: d.stars }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" style={{ color: GOLD }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: FG }}>"{d.texto}"</p>
                <div className="flex items-center gap-3 pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                  <img src={d.foto} className="h-10 w-10 rounded-full object-cover object-top shrink-0" />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: FG }}>{d.nome}</p>
                    <p className="text-[11px]" style={{ color: MUTED }}>{d.cargo}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── countdown hook ──────────────────────────────────────── */
function useCountdown() {
  const getInitial = () => {
    const stored = sessionStorage.getItem("__promo_end");
    if (stored) return parseInt(stored, 10);
    const end = Date.now() + 23 * 3600_000 + 59 * 60_000 + 59_000;
    sessionStorage.setItem("__promo_end", String(end));
    return end;
  };

  const [end] = useState(getInitial);
  const [left, setLeft] = useState(Math.max(0, end - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setLeft(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(id);
  }, [end]);

  const h = String(Math.floor(left / 3_600_000)).padStart(2, "0");
  const m = String(Math.floor((left % 3_600_000) / 60_000)).padStart(2, "0");
  const s = String(Math.floor((left % 60_000) / 1_000)).padStart(2, "0");
  return { h, m, s, expired: left === 0 };
}

function CountdownBanner() {
  const { h, m, s, expired } = useCountdown();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl mb-10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4"
      style={{
        background: "linear-gradient(135deg, rgba(180,30,30,0.18), rgba(180,80,0,0.14))",
        border: "1px solid rgba(239,68,68,0.35)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl animate-pulse">🔥</span>
        <div>
          <p className="font-bold text-sm" style={{ color: "#fca5a5" }}>
            {expired ? "Oferta encerrada!" : "Oferta por tempo limitado"}
          </p>
          <p className="text-xs" style={{ color: MUTED }}>
            Garanta o plano Premium com desconto antes que acabe
          </p>
        </div>
      </div>

      {!expired && (
        <div className="flex items-center gap-2 shrink-0">
          {[{ label: "HRS", val: h }, { label: "MIN", val: m }, { label: "SEG", val: s }].map(({ label, val }, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <motion.span
                  key={val}
                  initial={{ scale: 1.25, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  className="font-black tabular-nums leading-none"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", color: "#fca5a5" }}
                >
                  {val}
                </motion.span>
                <span className="text-[9px] uppercase tracking-widest mt-0.5" style={{ color: MUTED }}>{label}</span>
              </div>
              {i < 2 && (
                <span className="font-black text-xl mb-3" style={{ color: "#fca5a5" }}>:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ── pricing CTA ─────────────────────────────────────────── */
function PricingSection({ onCTA }: { onCTA: () => void }) {
  const [billing, setBilling] = useState<"mensal" | "anual">("mensal");

  const plans = [
    {
      name: "Básico",
      price: billing === "anual" ? "R$ 77" : "R$ 97",
      period: "/mês",
      desc: "Acesso às normas e conteúdos essenciais para começar",
      featLabel: "Básico inclui:",
      features: ["Normas comentadas", "2 conteúdos completos", "Suporte por e-mail"],
      cta: "Começar agora",
      highlight: false,
    },
    {
      name: "Premium",
      price: billing === "anual" ? "R$ 157" : "R$ 197",
      period: "/mês",
      desc: "Tudo que o gestor municipal sério precisa em um só lugar",
      featLabel: "Tudo do Básico, mais:",
      features: ["Todos os conteúdos", "Trilhas completas", "MuniBrasilCast", "Acesso antecipado", "Suporte prioritário"],
      cta: "Assinar Premium",
      highlight: true,
    },
    {
      name: "Institucional",
      price: "Consulte",
      period: "",
      desc: "Para câmaras e prefeituras com múltiplos usuários",
      featLabel: "Tudo do Premium, mais:",
      features: ["Licenças em equipe", "Treinamento presencial", "Personalização", "API de normas"],
      cta: "Falar com a equipe",
      highlight: false,
    },
  ];

  return (
    <section
      id="planos"
      className="py-24 px-5 md:px-10 relative overflow-hidden"
      style={{ background: "#060c17" }}
    >
      {/* background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[140px]"
          style={{ width: 700, height: 500, background: "radial-gradient(ellipse, rgba(29,78,216,0.22) 0%, rgba(29,78,216,0.06) 60%, transparent 100%)" }}
        />
        <div
          className="absolute left-1/4 top-1/3 rounded-full blur-[100px]"
          style={{ width: 300, height: 300, background: "rgba(99,102,241,0.07)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 rounded-full blur-[100px]"
          style={{ width: 250, height: 250, background: "rgba(29,78,216,0.07)" }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* header */}
        <FadeIn className="text-center mb-10">
          <h2 className="font-black leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", color: FG }}>
            Planos que funcionam<br />
            <span style={{ color: BLUE }}>para o seu município</span>
          </h2>
          <p style={{ color: MUTED, fontSize: "clamp(0.9rem, 1.5vw, 1rem)" }}>
            Sem contratos longos. Cancele quando quiser. Suporte em português.
          </p>
        </FadeIn>

        {/* billing toggle */}
        <FadeIn className="flex justify-center mb-8">
          <div className="flex rounded-full p-1 gap-1" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
            {(["mensal", "anual"] as const).map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                className="rounded-full px-6 py-2 text-sm font-semibold capitalize transition-all duration-200"
                style={{
                  background: billing === b ? BLUE : "transparent",
                  color: billing === b ? "#fff" : MUTED,
                }}
              >
                {b === "mensal" ? "Mensal" : "Anual"}{b === "anual" && <span className="ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }}>-20%</span>}
              </button>
            ))}
          </div>
        </FadeIn>

        <CountdownBanner />

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.08}>
              <div
                className="rounded-2xl p-7 flex flex-col h-full relative"
                style={{
                  background: p.highlight
                    ? "linear-gradient(160deg, rgba(30,50,90,0.7) 0%, rgba(10,18,40,0.95) 100%)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${p.highlight ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.09)"}`,
                  boxShadow: p.highlight ? "0 0 60px rgba(29,78,216,0.18), inset 0 1px 0 rgba(255,255,255,0.08)" : "none",
                }}
              >
                {/* plan name */}
                <p className="text-lg font-bold mb-3" style={{ color: FG }}>{p.name}</p>

                {/* price */}
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="font-black" style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", color: FG, lineHeight: 1 }}>{p.price}</span>
                  {p.period && <span className="text-sm" style={{ color: MUTED }}>{p.period}</span>}
                </div>

                {/* desc */}
                <p className="text-sm leading-relaxed mb-6" style={{ color: MUTED }}>{p.desc}</p>

                {/* CTA button */}
                <button
                  onClick={onCTA}
                  className="w-full rounded-xl py-3 text-sm font-bold mb-6 transition-all hover:brightness-110 hover:scale-[1.02]"
                  style={p.highlight
                    ? { background: BLUE, color: "#fff", boxShadow: `0 4px 24px rgba(29,78,216,0.45)` }
                    : { background: "rgba(255,255,255,0.08)", color: FG, border: "1px solid rgba(255,255,255,0.12)" }
                  }
                >
                  {p.cta}
                </button>

                {/* divider + features */}
                <div className="h-px mb-5" style={{ background: "rgba(255,255,255,0.08)" }} />
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: MUTED }}>{p.featLabel}</p>
                <ul className="flex flex-col gap-2.5 flex-1">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: FG }}>
                      <span className="h-4 w-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.1)" }}>
                        <span className="h-1.5 w-1.5 rounded-full block" style={{ background: MUTED }} />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── final CTA ───────────────────────────────────────────── */
function FinalCTA({ onCTA }: { onCTA: () => void }) {
  return (
    <section className="py-28 px-5 md:px-10 relative overflow-hidden" style={{ background: BG }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full blur-[120px]" style={{ background: `${BLUE}18` }} />
      </div>
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="font-black uppercase leading-tight mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
            <GradientText>Pronto para liderar</GradientText>
            <br />
            <span style={{ color: GOLD }}>com segurança jurídica?</span>
          </h2>
          <p className="leading-relaxed mb-10 max-w-xl mx-auto" style={{ color: MUTED, fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)" }}>
            Junte-se a mais de 500 gestores e vereadores que já utilizam a plataforma para tomar decisões mais seguras e bem fundamentadas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={onCTA}
              className="flex items-center gap-2.5 rounded-full px-10 py-4 font-bold transition-all hover:scale-105 hover:brightness-110"
              style={{ background: BLUE, color: "#fff", fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
            >
              <Zap className="h-4 w-4" /> Acessar a plataforma agora
            </button>
          </div>
          <p className="mt-5 text-xs" style={{ color: MUTED }}>
            <Shield className="h-3 w-3 inline mr-1" />
            Cancele a qualquer momento · Sem fidelidade · Suporte em português
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 px-6 md:px-10 border-t" style={{ background: "#060c17", borderColor: "rgba(255,255,255,0.07)" }}>
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <img src="/logo-munibrasil.svg" alt="MuniBrasil" className="h-8 w-auto" />
        <p className="text-xs text-center" style={{ color: MUTED }}>
          © 2026 MuniBrasil · Carlos Carvalho Rocha Advocacia · Todos os direitos reservados
        </p>
        <div className="flex gap-5 text-xs" style={{ color: MUTED }}>
          <a href="#" className="hover:opacity-70 transition-opacity">Termos</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Privacidade</a>
          <a href="#" className="hover:opacity-70 transition-opacity">Contato</a>
        </div>
      </div>
    </footer>
  );
}

/* ── whatsapp floating button ────────────────────────────── */
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/556198490772"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-2xl transition-transform hover:scale-110"
      style={{ width: 60, height: 60, background: "#25D366" }}
    >
      {/* pulse ring */}
      <span className="absolute inline-flex h-full w-full rounded-full opacity-40 animate-ping" style={{ background: "#25D366" }} />
      {/* whatsapp icon */}
      <svg viewBox="0 0 32 32" width="30" height="30" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 2C8.268 2 2 8.268 2 16c0 2.48.68 4.8 1.865 6.79L2 30l7.42-1.835A13.94 13.94 0 0 0 16 30c7.732 0 14-6.268 14-14S23.732 2 16 2Zm0 25.5a11.44 11.44 0 0 1-5.832-1.594l-.418-.248-4.4 1.088 1.11-4.283-.272-.44A11.46 11.46 0 0 1 4.5 16C4.5 9.648 9.648 4.5 16 4.5S27.5 9.648 27.5 16 22.352 27.5 16 27.5Zm6.29-8.618c-.344-.172-2.036-1.004-2.352-1.118-.316-.116-.546-.172-.776.172-.228.344-.892 1.118-1.094 1.348-.2.228-.402.258-.746.086-.344-.172-1.452-.536-2.766-1.706-1.022-.912-1.712-2.038-1.912-2.382-.2-.344-.022-.53.15-.702.154-.154.344-.402.516-.602.172-.2.228-.344.344-.574.116-.228.058-.43-.028-.602-.086-.172-.776-1.872-1.064-2.564-.28-.672-.564-.58-.776-.592l-.66-.012c-.228 0-.6.086-.914.43-.316.344-1.204 1.176-1.204 2.866 0 1.69 1.232 3.322 1.404 3.552.172.228 2.424 3.702 5.872 5.192.82.354 1.46.566 1.958.724.822.262 1.572.224 2.164.136.66-.098 2.036-.832 2.324-1.636.286-.804.286-1.494.2-1.636-.084-.144-.314-.23-.658-.4Z" />
      </svg>
    </a>
  );
}

/* ── main export ─────────────────────────────────────────── */
export default function LandingPage() {
  const navigate = useNavigate();
  const toPlataforma = () => navigate("/plataforma");

  return (
    <div style={{ background: BG, color: FG, fontFamily: "inherit", overflowX: "clip" }}>
      <Navbar onCTA={toPlataforma} />
      <Hero onCTA={toPlataforma} />
      <StatsStrip />
      <FeaturesSection />
      <ContentSection onCTA={toPlataforma} />
      <TestimonialsSection />
      <PricingSection onCTA={toPlataforma} />
      <FinalCTA onCTA={toPlataforma} />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
