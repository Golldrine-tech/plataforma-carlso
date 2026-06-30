import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import {
  Eye, EyeOff, LogOut, Play, Lock, Download, Home, FileText,
  Video, User, Check, Bell, BookOpen, ArrowLeft, Menu,
  ChevronDown, ChevronRight, Scale, Clock, Star, Gavel,
  GraduationCap, Search, Settings, Flame, TrendingUp,
  PlayCircle, BookMarked, Award, Building2, Sparkles,
} from "lucide-react";

/* ────────────────────────────────────────────────────────────
   TYPES
──────────────────────────────────────────────────────────── */
type Screen = "login" | "plans" | "dashboard" | "content" | "video" | "locked" | "perfil";
type Plan   = "basic" | "premium";

/* ────────────────────────────────────────────────────────────
   DESIGN TOKENS
──────────────────────────────────────────────────────────── */
const S = {
  bg:     "hsl(221 42% 9%)",
  bgDeep: "hsl(216 33% 6%)",
  card:   "hsl(220 40% 11%)",
  border: "rgba(255,255,255,0.08)",
  blue:   "hsl(214 74% 45%)",
  gold:   "hsl(45 88% 57%)",
  green:  "hsl(148 67% 37%)",
  fg:     "hsl(213 40% 94%)",
  muted:  "hsl(218 21% 57%)",
};

const glass: React.CSSProperties = {
  background: "hsl(220 40% 11% / 0.85)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: `1px solid ${S.border}`,
};

const card: React.CSSProperties = {
  background: S.card,
  border: `1px solid ${S.border}`,
};

/* ────────────────────────────────────────────────────────────
   CONTENT DATA
──────────────────────────────────────────────────────────── */
const cursos = [
  { id:1,  titulo:"Lei de Licitações na Prática",            categoria:"Licitações",       duracao:"38:14", progress:62, cor:"hsl(214 74% 28%)", foto:"/fotos/carlos-podcast.jpg",        pos:"object-[center_20%]", premium:false },
  { id:2,  titulo:"Improbidade Administrativa Comentada",    categoria:"Direito Público",  duracao:"51:07", progress:18, cor:"hsl(353 70% 28%)", foto:"/fotos/carlos-retrato.jpg",        pos:"object-[center_15%]", premium:true  },
  { id:3,  titulo:"Técnica Legislativa para Vereadores",     categoria:"Técnica Legisl.",  duracao:"44:22", progress:0,  cor:"hsl(148 50% 22%)", foto:"/fotos/carlos-evento.jpg",         pos:"object-[center_20%]", premium:false },
  { id:4,  titulo:"Direito Eleitoral: Regras da Campanha",   categoria:"Eleitoral",        duracao:"29:55", progress:0,  cor:"hsl(45 60% 22%)",  foto:"/fotos/carlos-munibrasilcast.jpg", pos:"object-[center_25%]", premium:true  },
  { id:5,  titulo:"Processo Administrativo Disciplinar",     categoria:"PAD",              duracao:"55:30", progress:0,  cor:"hsl(270 50% 28%)", foto:"/fotos/carlos-podcast-acao.jpg",   pos:"object-[center_30%]", premium:true  },
  { id:6,  titulo:"Gestão de Contratos Municipais",          categoria:"Gestão",           duracao:"33:45", progress:0,  cor:"hsl(200 65% 25%)", foto:"/fotos/carlos-retrato-2.jpg",      pos:"object-[center_15%]", premium:false },
  { id:7,  titulo:"Plano Diretor: O Que o Gestor Precisa Saber", categoria:"Urbanismo",   duracao:"47:10", progress:0,  cor:"hsl(170 55% 22%)", foto:"/fotos/daniella.jpg",              pos:"object-[center_22%]", premium:true  },
  { id:8,  titulo:"Regimento Interno da Câmara Municipal",   categoria:"Câmara",           duracao:"39:20", progress:0,  cor:"hsl(30 55% 24%)",  foto:"/fotos/carlos-formal.jpg",         pos:"object-[center_15%]", premium:false },
];

const trilhas = [
  { titulo:"Gestão Municipal Completa",     aulas:8,  horas:"5h 20min", cor:`linear-gradient(135deg, hsl(214 74% 35%), hsl(214 74% 22%))` },
  { titulo:"Técnica Legislativa",           aulas:5,  horas:"3h 40min", cor:`linear-gradient(135deg, hsl(148 55% 28%), hsl(148 55% 16%))` },
  { titulo:"Direito Eleitoral Prático",     aulas:6,  horas:"4h 10min", cor:`linear-gradient(135deg, hsl(45 70% 35%), hsl(45 70% 20%))` },
];

const normas = [
  { tipo:"NORMA FEDERAL", esfera:"Federal",   titulo:"Lei nº 14.133/2021 — Lei de Licitações", data:"01/04/2021" },
  { tipo:"PROJETO DE LEI", esfera:"Municipal", titulo:"PL nº 012/2024 — Transparência Ativa",  data:"14/03/2024" },
  { tipo:"DECRETO",        esfera:"Estadual",  titulo:"Decreto nº 10.086/2019 — PAE",           data:"05/11/2019" },
  { tipo:"NORMA FEDERAL", esfera:"Federal",   titulo:"Lei nº 14.230/2021 — Improbidade Adm.", data:"25/10/2021" },
];

/* ────────────────────────────────────────────────────────────
   HELPERS
──────────────────────────────────────────────────────────── */
function Badge({ label, color }: { label: string; color: string }) {
  const map: Record<string,{bg:string;text:string}> = {
    blue:  { bg:`${S.blue}22`, text:S.blue  },
    gold:  { bg:`${S.gold}22`, text:S.gold  },
    green: { bg:`${S.green}22`, text:S.green },
    red:   { bg:"rgba(239,68,68,.15)", text:"#f87171" },
  };
  const c = map[color] ?? map.blue;
  return (
    <span style={{ background:c.bg, color:c.text, border:`1px solid ${c.text}33` }}
      className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
      {label}
    </span>
  );
}

function TipoBadge({ tipo }: { tipo:string }) {
  const map: Record<string,string> = { "NORMA FEDERAL":"blue", "PROJETO DE LEI":"green", "DECRETO":"gold" };
  return <Badge label={tipo} color={map[tipo] ?? "blue"} />;
}

function Logo({ size="h-10" }: { size?:string }) {
  return <img src="/logo-munibrasil.svg" alt="MuniBrasil" className={`${size} w-auto`} />;
}

/* Card de curso/vídeo */
function CursoCard({ c, plan, onClick }: { c:typeof cursos[0]; plan:Plan; onClick:()=>void }) {
  const locked = c.premium && plan !== "premium";
  return (
    <button onClick={onClick} className="group flex flex-col text-left rounded-2xl overflow-hidden transition-all hover:-translate-y-1.5"
      style={card}>
      {/* thumbnail com foto real */}
      <div className="relative overflow-hidden" style={{ paddingBottom:"60%", width:"100%", background:c.cor }}>
        <img src={c.foto} alt={c.titulo}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${c.pos}`} />
        {/* gradiente inferior */}
        <div className="absolute inset-0" style={{ background:"linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }} />
        {/* categoria badge */}
        <span className="absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ background:"rgba(0,0,0,0.55)", color:"rgba(255,255,255,0.9)", backdropFilter:"blur(6px)" }}>
          {c.categoria}
        </span>
        {/* overlay play no hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background:"rgba(0,0,0,0.35)" }}>
          {locked
            ? <div className="flex h-14 w-14 items-center justify-center rounded-full" style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(6px)" }}>
                <Lock className="h-6 w-6" style={{ color:S.gold }} />
              </div>
            : <div className="h-14 w-14 rounded-full flex items-center justify-center"
                style={{ border:"2px solid rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.15)", backdropFilter:"blur(6px)" }}>
                <Play className="h-6 w-6 translate-x-0.5" style={{ color:"#fff", fill:"#fff" }} />
              </div>
          }
        </div>
        {/* duration pill */}
        <span className="absolute bottom-2.5 right-2.5 rounded px-2 py-0.5 text-[11px] font-medium flex items-center gap-1"
          style={{ background:"rgba(0,0,0,0.75)", color:"#fff" }}>
          {locked && <Lock className="h-2.5 w-2.5" style={{ color:S.gold }} />}
          {c.duracao}
        </span>
        {/* progress bar */}
        {c.progress > 0 && !locked && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px]" style={{ background:"rgba(255,255,255,0.15)" }}>
            <div className="h-full" style={{ width:`${c.progress}%`, background:S.blue }} />
          </div>
        )}
      </div>
      {/* info */}
      <div className="p-4">
        <p className="text-sm font-semibold leading-snug line-clamp-2 mb-2.5" style={{ color:S.fg }}>
          {c.titulo}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src="/fotos/carlos-formal.jpg" alt="Carlos Rocha"
              className="h-5 w-5 rounded-full object-cover object-top" />
            <span className="text-[11px]" style={{ color:S.muted }}>Dr. Carlos Rocha</span>
          </div>
          {locked && <Badge label="Premium" color="gold" />}
        </div>
      </div>
    </button>
  );
}

/* Linha horizontal de conteúdo */
function Row({ titulo, items, plan, onVideo, onLocked, icon: Icon }: {
  titulo:string; items:typeof cursos; plan:Plan;
  onVideo:()=>void; onLocked:()=>void;
  icon?: React.ComponentType<{ className?:string; style?:React.CSSProperties }>;
}) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-2.5 mb-5">
        {Icon && <Icon className="h-5 w-5" style={{ color:S.blue }} />}
        <h2 className="font-display text-xl font-semibold" style={{ color:S.fg }}>{titulo}</h2>
        <div className="flex-1" />
        <button className="text-sm flex items-center gap-1 transition-opacity hover:opacity-70" style={{ color:S.blue }}>
          Ver todos <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map(c => (
          <CursoCard key={c.id} c={c} plan={plan}
            onClick={() => c.premium && plan !== "premium" ? onLocked() : onVideo()}
          />
        ))}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   1. LOGIN — split screen
──────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin, onPlans }: { onLogin:(p:Plan)=>void; onPlans:()=>void }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [show, setShow]   = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background:S.bgDeep }}>
      {/* esquerda */}
      <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden"
        style={{ background:`linear-gradient(160deg, hsl(214 74% 18%) 0%, hsl(216 33% 6%) 100%)` }}>
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full blur-[100px]" style={{ background:`${S.gold}1a` }} />
        <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full blur-[80px]" style={{ background:`${S.blue}1a` }} />

        <Logo size="h-12" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6" style={{ background:`${S.blue}22`, border:`1px solid ${S.blue}44` }}>
            <span className="h-2 w-2 rounded-full" style={{ background:S.blue }} />
            <span className="text-xs font-medium" style={{ color:S.blue }}>Plataforma de Conteúdo Legislativo</span>
          </div>
          <h2 className="font-display text-4xl xl:text-5xl font-bold leading-[1.1] mb-6 max-w-md" style={{ color:S.fg }}>
            Direito Público comentado por quem vive a prática
          </h2>
          <p className="text-base leading-relaxed max-w-md mb-12" style={{ color:S.muted }}>
            Normas, projetos de lei, decretos e vídeos atualizados — tudo explicado pelo Dr. Carlos Carvalho Rocha para gestores e parlamentares.
          </p>

          <div className="flex flex-wrap gap-10">
            {[["2.400+","Normas catalogadas"],["180+","Vídeos comentados"],["5.300+","Gestores atendidos"]].map(([n,l]) => (
              <div key={l}>
                <p className="font-display text-3xl font-bold" style={{ color:S.gold }}>{n}</p>
                <p className="text-xs mt-1" style={{ color:S.muted }}>{l}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs relative z-10" style={{ color:S.muted }}>© 2026 MuniBrasil · Carlos Carvalho Rocha Advocacia</p>
      </div>

      {/* direita */}
      <div className="flex items-center justify-center px-6 py-16" style={{ background:`radial-gradient(ellipse 60% 50% at 50% 0%, hsl(214 74% 45% / 0.08), transparent 60%), ${S.bgDeep}` }}>
        <div className="w-full max-w-md">
          <div className="flex lg:hidden justify-center mb-10"><Logo size="h-12" /></div>

          <h1 className="font-display text-3xl font-bold mb-2" style={{ color:S.fg }}>Bem-vindo de volta</h1>
          <p className="text-sm mb-10" style={{ color:S.muted }}>Entre para continuar de onde parou</p>

          <div className="mb-5">
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color:S.muted }}>E-mail</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu@email.com.br"
              className="w-full rounded-xl px-4 py-3.5 text-sm outline-none transition-all"
              style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${S.border}`, color:S.fg }}
              onFocus={e=>{e.target.style.borderColor=S.blue}} onBlur={e=>{e.target.style.borderColor=S.border}} />
          </div>
          <div className="mb-8">
            <label className="block text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color:S.muted }}>Senha</label>
            <div className="relative">
              <input type={show?"text":"password"} value={pass} onChange={e=>setPass(e.target.value)} placeholder="••••••••"
                className="w-full rounded-xl px-4 py-3.5 pr-11 text-sm outline-none transition-all"
                style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${S.border}`, color:S.fg }}
                onFocus={e=>{e.target.style.borderColor=S.blue}} onBlur={e=>{e.target.style.borderColor=S.border}} />
              <button onClick={()=>setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2" style={{ color:S.muted }}>
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <div className="text-right mt-2">
              <button className="text-xs" style={{ color:S.blue }}>Esqueci minha senha</button>
            </div>
          </div>

          <button onClick={() => { if(email && pass) onLogin("basic"); }}
            className="w-full rounded-full py-4 text-sm font-bold transition-all hover:scale-[1.02] hover:opacity-90 mb-4"
            style={{ background:S.blue, color:"#fff", boxShadow:`0 10px 35px -10px ${S.blue}` }}>
            Acessar plataforma
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background:S.border }} />
            <span className="text-xs" style={{ color:S.muted }}>ou</span>
            <div className="flex-1 h-px" style={{ background:S.border }} />
          </div>

          <button className="w-full rounded-full py-3.5 text-sm font-medium flex items-center justify-center gap-3 transition-all hover:scale-[1.02] mb-8"
            style={{ background:"#fff", color:"#3c4043", border:"1px solid #dadce0" }}>
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar com Google
          </button>

          <p className="text-center text-sm" style={{ color:S.muted }}>
            Ainda não tem acesso?{" "}
            <button onClick={onPlans} className="font-bold hover:opacity-80" style={{ color:S.gold }}>Conheça os planos</button>
          </p>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SPARKLES — partículas de fundo (CSS puro)
──────────────────────────────────────────────────────────── */
function SparklesBg() {
  const dots = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map(d => (
        <motion.div key={d.id}
          className="absolute rounded-full"
          style={{ left:`${d.x}%`, top:`${d.y}%`, width:d.size, height:d.size, background:"rgba(255,255,255,0.6)" }}
          animate={{ opacity:[0, 1, 0] }}
          transition={{ duration:d.dur, delay:d.delay, repeat:Infinity, ease:"easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PRICING TOGGLE
──────────────────────────────────────────────────────────── */
function PricingToggle({ yearly, onChange }: { yearly:boolean; onChange:(v:boolean)=>void }) {
  return (
    <div className="flex justify-center">
      <div className="relative flex rounded-full p-1 gap-0"
        style={{ background:"rgba(255,255,255,0.07)", border:`1px solid ${S.border}` }}>
        {(["Mensal","Anual"] as const).map((label, i) => {
          const active = yearly === (i === 1);
          return (
            <button key={label} onClick={() => onChange(i === 1)}
              className="relative z-10 rounded-full px-6 py-2 text-sm font-semibold transition-colors"
              style={{ color: active ? "#fff" : S.muted }}>
              {active && (
                <motion.span layoutId="pricing-tab"
                  className="absolute inset-0 rounded-full"
                  style={{ background:`linear-gradient(135deg, ${S.blue}, hsl(214 74% 35%))`, boxShadow:`0 4px 20px -4px ${S.blue}` }}
                  transition={{ type:"spring", stiffness:500, damping:30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {label}
                {i === 1 && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  style={{ background:`${S.green}22`, color:S.green }}>-17%</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   2. PLANOS
──────────────────────────────────────────────────────────── */
function PlansScreen({ onBack, onSelect, backLabel = "Voltar ao login" }: { onBack:()=>void; onSelect:(p:Plan)=>void; backLabel?:string }) {
  const [yearly, setYearly] = useState(false);

  const plans = [
    {
      key: "basic" as Plan,
      name: "Básico",
      desc: "Acesso às normas essenciais para gestores e assessores municipais",
      monthly: 97,
      yearly: 970,
      cta: "Assinar Básico",
      popular: false,
      accentColor: S.blue,
      icon: Scale,
      includes: ["Normas da legislação base", "Projetos de Lei", "Decretos federais e estaduais", "Atualizações automáticas"],
      label: null,
    },
    {
      key: "premium" as Plan,
      name: "Premium",
      desc: "A escolha dos gestores que querem dominar o Direito Municipal na prática",
      monthly: 197,
      yearly: 1970,
      cta: "Assinar Premium",
      popular: true,
      accentColor: S.gold,
      icon: Sparkles,
      includes: ["Tudo do Plano Básico", "Vídeos e Episódios comentados", "Normas de Prefeituras e Câmaras", "Conteúdo exclusivo do MuniBrasilCast", "Acesso antecipado a novidades"],
      label: "MAIS POPULAR",
    },
    {
      key: "premium" as Plan,
      name: "Institucional",
      desc: "Para câmaras, prefeituras e escritórios de advocacia com múltiplos usuários",
      monthly: 497,
      yearly: 4970,
      cta: "Falar com consultor",
      popular: false,
      accentColor: S.green,
      icon: Building2,
      includes: ["Tudo do Plano Premium", "Até 10 usuários simultâneos", "Relatórios de uso e engajamento", "Suporte prioritário via WhatsApp", "Treinamento para equipes"],
      label: null,
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background:"hsl(216 33% 5%)" }}>
      {/* grade de fundo */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage:"linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize:"60px 60px" }} />

      {/* sparkles */}
      <SparklesBg />

      {/* glow central */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{ background:`radial-gradient(ellipse at center, ${S.blue}28 0%, ${S.gold}0e 50%, transparent 70%)`, filter:"blur(40px)" }} />

      {/* anel neon superior */}
      <div className="absolute -top-[400px] left-1/2 -translate-x-1/2 w-[1000px] h-[900px] rounded-full pointer-events-none"
        style={{ border:`180px solid ${S.blue}18`, filter:"blur(80px)" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-8 pb-16">
        {/* voltar */}
        <button onClick={onBack} className="flex items-center gap-2 text-sm mb-6 hover:opacity-70 transition-opacity"
          style={{ color:S.muted }}>
          <ArrowLeft className="h-4 w-4" /> {backLabel}
        </button>

        {/* header */}
        <div className="text-center mb-8">
          <Logo size="h-9" />

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="mt-4 mb-3 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
            style={{ background:`${S.blue}18`, border:`1px solid ${S.blue}33` }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ background:S.blue }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color:S.blue }}>Planos e Preços</span>
          </motion.div>

          <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.1 }}
            className="font-display text-3xl lg:text-4xl font-bold leading-tight mt-3 mb-3 max-w-2xl mx-auto"
            style={{ color:S.fg }}>
            Conteúdo legislativo que <span style={{ color:S.gold }}>transforma</span> a gestão pública
          </motion.h1>

          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.2 }}
            className="text-sm max-w-xl mx-auto mb-6" style={{ color:S.muted }}>
            Comentado por quem viveu a prática — Dr. Carlos Carvalho Rocha, ex-Procurador-Geral Municipal
          </motion.p>

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.45, delay:0.3 }}>
            <PricingToggle yearly={yearly} onChange={setYearly} />
          </motion.div>
        </div>

        {/* cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan, idx) => {
            const price = yearly ? plan.yearly : plan.monthly;
            const period = yearly ? "ano" : "mês";

            return (
              <motion.div key={plan.name}
                initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.5, delay:0.35 + idx * 0.1 }}
                className="relative rounded-2xl flex flex-col overflow-hidden"
                style={{
                  background:"linear-gradient(160deg, hsl(220 38% 14%), hsl(220 38% 10%))",
                  border:`1px solid ${plan.popular ? `${plan.accentColor}55` : S.border}`,
                  boxShadow: plan.popular ? `0 -10px 200px -20px ${plan.accentColor}44` : "none",
                }}>

                {/* linha de topo */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-[2px]"
                    style={{ background:`linear-gradient(90deg, transparent, ${plan.accentColor}, transparent)` }} />
                )}

                {/* badge popular */}
                {plan.label && (
                  <div className="absolute top-4 right-4">
                    <Badge label={plan.label} color="gold" />
                  </div>
                )}

                <div className="p-7 flex flex-col flex-1">
                  {/* icon + nome */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background:`${plan.accentColor}1a`, color:plan.accentColor }}>
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-display text-xl font-bold" style={{ color:S.fg }}>{plan.name}</h3>
                  </div>

                  {/* preço animado */}
                  <div className="mb-2 flex items-baseline gap-1">
                    <span className="font-display text-2xl font-semibold" style={{ color:S.muted }}>R$</span>
                    <span className="font-display text-5xl font-bold" style={{ color:S.fg }}>
                      <NumberFlow value={price} format={{ style:"decimal", minimumFractionDigits:0 }} />
                    </span>
                    <span className="text-sm" style={{ color:S.muted }}>/{period}</span>
                  </div>
                  {yearly && (
                    <p className="text-xs mb-1" style={{ color:S.green }}>
                      Equivale a R$ {Math.round(price/12)}/mês · 2 meses grátis
                    </p>
                  )}
                  <p className="text-xs mb-7 leading-relaxed" style={{ color:S.muted }}>{plan.desc}</p>

                  {/* CTA */}
                  <button onClick={() => onSelect(plan.key)}
                    className="w-full rounded-xl py-3.5 text-sm font-bold mb-7 transition-all hover:scale-[1.02] hover:opacity-95"
                    style={plan.popular
                      ? { background:`linear-gradient(135deg, ${plan.accentColor}, hsl(45 70% 45%))`, color:S.bgDeep, boxShadow:`0 8px 30px -8px ${plan.accentColor}` }
                      : { background:"linear-gradient(160deg, hsl(220 40% 18%), hsl(220 40% 13%))", color:S.fg, border:`1px solid ${S.border}` }
                    }>
                    {plan.cta}
                  </button>

                  {/* features */}
                  <div className="pt-5 flex-1" style={{ borderTop:`1px solid ${S.border}` }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color:plan.accentColor }}>
                      Incluído:
                    </p>
                    <ul className="space-y-3">
                      {plan.includes.map(feat => (
                        <li key={feat} className="flex items-start gap-2.5 text-sm" style={{ color:S.fg }}>
                          <span className="mt-1.5 h-2 w-2 rounded-full shrink-0" style={{ background:plan.accentColor }} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* rodapé */}
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.8 }}
          className="text-center text-sm mt-10" style={{ color:S.muted }}>
          Pagamento via cartão ou Pix · Cancele quando quiser · Sem taxa de cancelamento
        </motion.p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SHELL — sidebar fixa
──────────────────────────────────────────────────────────── */
function Shell({ plan, onLogout, onPerfil, onUpgrade, active, onNav, children }: {
  plan:Plan; onLogout:()=>void; onPerfil?:()=>void; onUpgrade?:()=>void; active:string; onNav:(id:string)=>void; children:React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen]     = useState(false);

  const navItems = [
    { id:"home",      label:"Início",          icon:Home },
    { id:"videos",    label:"Vídeos",          icon:Video },
    { id:"normas",    label:"Normas",          icon:Scale },
    { id:"pls",       label:"Projetos de Lei", icon:FileText },
    { id:"decretos",  label:"Decretos",        icon:Gavel },
    { id:"mentoria",  label:"Mentorias",       icon:GraduationCap },
  ];

  const Sidebar = () => (
    <div className="flex h-full flex-col">
      <div className="px-6 py-6 border-b" style={{ borderColor:S.border }}>
        <Logo size="h-11" />
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(({ id, label, icon:Icon }) => {
          const on = active === id;
          return (
            <button key={id} onClick={()=>{ onNav(id); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-all relative"
              style={{ color:on?S.fg:S.muted, background:on?`${S.blue}18`:"transparent" }}>
              {on && <span className="absolute left-0 inset-y-2 w-[3px] rounded-full" style={{ background:S.blue }} />}
              <Icon className="h-[17px] w-[17px]" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* instructor card */}
      <div className="mx-3 mb-3 rounded-2xl p-4 relative overflow-hidden"
        style={{ background:`linear-gradient(135deg, hsl(214 74% 22%), hsl(214 74% 14%))`, border:`1px solid ${S.blue}33` }}>
        <div className="flex items-center gap-3 mb-2">
          <img src="/fotos/carlos-formal.jpg" alt="Carlos Rocha"
            className="h-9 w-9 rounded-full object-cover object-top shrink-0" style={{ border:`1px solid ${S.border}` }} />
          <div>
            <p className="text-xs font-semibold" style={{ color:S.fg }}>Dr. Carlos Rocha</p>
            <p className="text-[10px]" style={{ color:S.muted }}>OAB/DF 36.214</p>
          </div>
        </div>
        {plan === "basic" && (
          <button onClick={onUpgrade}
            className="w-full rounded-full py-2 text-xs font-bold mt-1 transition-all hover:opacity-90"
            style={{ background:S.gold, color:S.bgDeep }}>
            Fazer upgrade ✦
          </button>
        )}
        {plan === "premium" && (
          <div className="flex items-center gap-1.5 mt-1">
            <Flame className="h-3 w-3" style={{ color:S.gold }} />
            <span className="text-[10px] font-semibold" style={{ color:S.gold }}>Premium ativo</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ background:S.bg }}>
      {/* sidebar desktop */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-[240px] z-30"
        style={{ background:S.bgDeep, borderRight:`1px solid ${S.border}` }}>
        <Sidebar />
      </aside>

      {/* mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-[240px]" style={{ background:S.bgDeep }}>
            <Sidebar />
          </aside>
        </div>
      )}

      <div className="lg:pl-[240px] flex flex-col min-h-screen">
        {/* topbar */}
        <header className="sticky top-0 z-20 h-16 flex items-center gap-4 px-5 lg:px-8"
          style={{ ...glass, borderBottom:`1px solid ${S.border}` }}>
          <button onClick={()=>setMobileOpen(true)} className="lg:hidden" style={{ color:S.muted }}>
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex items-center gap-2.5 rounded-xl px-4 py-2.5 flex-1 max-w-sm"
            style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${S.border}` }}>
            <Search className="h-4 w-4 shrink-0" style={{ color:S.muted }} />
            <input placeholder="Buscar conteúdo..." className="bg-transparent outline-none text-sm w-full"
              style={{ color:S.fg }} />
          </div>

          <div className="flex-1" />

          <button className="hidden sm:flex p-2.5 rounded-lg transition-colors hover:opacity-70" style={{ color:S.muted }}>
            <Settings className="h-[17px] w-[17px]" />
          </button>
          <button className="relative p-2.5 rounded-lg" style={{ color:S.muted }}>
            <Bell className="h-[17px] w-[17px]" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full" style={{ background:S.gold }} />
          </button>

          <div className="relative">
            <button onClick={()=>setUserOpen(!userOpen)}
              className="flex items-center gap-2.5 rounded-xl pl-1.5 pr-3 py-1.5"
              style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${S.border}` }}>
              <div className="h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background:S.blue, color:"#fff" }}>JM</div>
              <span className="hidden md:block text-sm font-medium" style={{ color:S.fg }}>João M.</span>
              <ChevronDown className="h-3.5 w-3.5" style={{ color:S.muted }} />
            </button>
            {userOpen && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl py-1.5 z-50" style={glass}>
                <div className="px-4 py-3 border-b" style={{ borderColor:S.border }}>
                  <p className="text-sm font-semibold" style={{ color:S.fg }}>João Mendes</p>
                  <div className="mt-1.5">
                    <Badge label={plan==="premium"?"Premium":"Básico"} color={plan==="premium"?"gold":"blue"} />
                  </div>
                </div>
                <button onClick={() => { setUserOpen(false); onPerfil?.(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm hover:opacity-80" style={{ color:S.fg }}>
                  <User className="h-4 w-4" style={{ color:S.muted }} /> Minha conta
                </button>
                <button onClick={() => { setUserOpen(false); onPerfil?.(); }}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm hover:opacity-80" style={{ color:S.fg }}>
                  <TrendingUp className="h-4 w-4" style={{ color:S.muted }} /> Meu Desempenho
                </button>
                <button onClick={onLogout} className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm hover:opacity-80" style={{ color:"#f87171" }}>
                  <LogOut className="h-4 w-4" /> Sair
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 px-5 lg:px-10 py-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   3. DASHBOARD
──────────────────────────────────────────────────────────── */
function Dashboard({ plan, onLogout, onContent, onVideo, onLocked, onPerfil, onUpgrade }: {
  plan:Plan; onLogout:()=>void; onContent:()=>void; onVideo:()=>void; onLocked:()=>void; onPerfil:()=>void; onUpgrade:()=>void;
}) {
  const [active, setActive] = useState("home");
  const handleNav = (id:string) => {
    setActive(id);
    if (id==="normas"||id==="pls"||id==="decretos") onContent();
    else if (id==="videos") onVideo();
  };

  const featuredCurso = cursos[0];

  return (
    <Shell plan={plan} onLogout={onLogout} onPerfil={onPerfil} onUpgrade={onUpgrade} active={active} onNav={handleNav}>
      {/* HERO — destaque */}
      <div className="rounded-3xl overflow-hidden mb-10 relative" style={{ minHeight:320 }}>
        <img src="/fotos/carlos-munibrasilcast.jpg" alt="Em destaque"
          className="absolute inset-0 w-full h-full object-cover object-[70%_35%]" />
        <div className="absolute inset-0" style={{ background:"linear-gradient(to right, rgba(5,10,20,0.85) 0%, rgba(5,10,20,0.5) 55%, rgba(5,10,20,0.15) 100%)" }} />
        <div className="relative z-10 flex flex-col justify-end p-8 lg:p-12" style={{ minHeight:320 }}>
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge label="Em Destaque" color="gold" />
              <Badge label="Atualizado" color="green" />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-3 leading-tight" style={{ color:S.fg }}>
              {featuredCurso.titulo}
            </h2>
            <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color:"rgba(255,255,255,0.72)" }}>
              Tudo que o gestor municipal precisa saber sobre a nova lei — comentada artigo por artigo com exemplos práticos do dia a dia.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={onVideo}
                className="flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold transition-all hover:scale-[1.03]"
                style={{ background:S.blue, color:"#fff" }}>
                <Play className="h-4 w-4 fill-current" /> Assistir agora
              </button>
              <button onClick={onContent}
                className="flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition-all hover:opacity-80"
                style={{ background:"rgba(255,255,255,0.12)", color:S.fg, backdropFilter:"blur(8px)" }}>
                <BookMarked className="h-4 w-4" /> Ver norma completa
              </button>
            </div>
          </div>
        </div>
        {/* duration badge */}
        <div className="absolute bottom-8 right-8 hidden lg:flex items-center gap-2 rounded-xl px-4 py-2.5"
          style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(12px)", border:`1px solid ${S.border}` }}>
          <Clock className="h-4 w-4" style={{ color:S.muted }} />
          <span className="text-sm font-medium" style={{ color:S.fg }}>{featuredCurso.duracao}</span>
        </div>
      </div>

      {/* continue assistindo */}
      {plan === "premium" && (
        <Row titulo="Continue assistindo" icon={PlayCircle}
          items={cursos.filter(c=>c.progress>0)}
          plan={plan} onVideo={onVideo} onLocked={onLocked} />
      )}

      {/* todos os cursos */}
      <Row titulo="Todos os conteúdos" icon={TrendingUp}
        items={cursos} plan={plan} onVideo={onVideo} onLocked={onLocked} />

      {/* trilhas */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-5">
          <Award className="h-5 w-5" style={{ color:S.gold }} />
          <h2 className="font-display text-xl font-semibold" style={{ color:S.fg }}>Trilhas de Aprendizado</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trilhas.map(t => (
            <div key={t.titulo} className="rounded-2xl p-6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1"
              style={{ background:t.cor, border:`1px solid ${S.border}` }}>
              <div>
                <p className="font-display text-base font-bold mb-1" style={{ color:S.fg }}>{t.titulo}</p>
                <p className="text-xs" style={{ color:"rgba(255,255,255,0.6)" }}>{t.aulas} aulas · {t.horas}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop:"1px solid rgba(255,255,255,0.12)" }}>
                <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color:"rgba(255,255,255,0.85)" }}>
                  <Play className="h-3.5 w-3.5 fill-current" /> Iniciar trilha
                </button>
                {plan !== "premium" && <Lock className="h-3.5 w-3.5" style={{ color:"rgba(255,255,255,0.5)" }} />}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* últimas normas */}
      <section className="mb-10">
        <div className="flex items-center gap-2.5 mb-5">
          <Scale className="h-5 w-5" style={{ color:S.blue }} />
          <h2 className="font-display text-xl font-semibold" style={{ color:S.fg }}>Últimas Normas</h2>
          <div className="flex-1" />
          <button onClick={onContent} className="text-sm flex items-center gap-1 hover:opacity-70" style={{ color:S.blue }}>
            Ver todas <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="rounded-2xl overflow-hidden" style={card}>
          {normas.map((n, i) => (
            <button key={n.titulo} onClick={onContent}
              className="flex items-center gap-4 w-full px-6 py-4 text-left transition-all hover:opacity-80"
              style={{ borderBottom: i < normas.length-1 ? `1px solid ${S.border}` : "none" }}>
              <div className="hidden sm:flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-lg"
                style={{ background:"rgba(255,255,255,0.05)" }}>
                {n.tipo==="NORMA FEDERAL"?"⚖️":n.tipo==="PROJETO DE LEI"?"📋":"📜"}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color:S.fg }}>{n.titulo}</p>
                <p className="text-xs mt-0.5" style={{ color:S.muted }}>{n.data} · Esfera {n.esfera}</p>
              </div>
              <div className="hidden sm:block"><TipoBadge tipo={n.tipo} /></div>
              <ChevronRight className="h-4 w-4 shrink-0" style={{ color:S.muted }} />
            </button>
          ))}
        </div>
      </section>

      {/* upsell básico */}
      {plan === "basic" && (
        <div className="rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-6"
          style={{ ...card, border:`1px solid ${S.gold}44` }}>
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl"
            style={{ background:`${S.gold}1f`, color:S.gold }}>
            <Star className="h-6 w-6" />
          </div>
          <div className="flex-1 text-center sm:text-left">
            <p className="font-display text-base font-bold" style={{ color:S.fg }}>Desbloqueie o Plano Premium</p>
            <p className="text-sm mt-1" style={{ color:S.muted }}>Acesse todos os vídeos, trilhas e episódios exclusivos do MuniBrasilCast</p>
          </div>
          <button onClick={onUpgrade}
            className="rounded-full px-6 py-3 text-sm font-bold whitespace-nowrap hover:opacity-90 transition-all"
            style={{ background:S.gold, color:S.bgDeep }}>
            Fazer upgrade ✦
          </button>
        </div>
      )}
    </Shell>
  );
}

/* ────────────────────────────────────────────────────────────
   4. CONTEÚDO — NORMA
──────────────────────────────────────────────────────────── */
function ContentScreen({ plan, onLogout, onVideo, onBack, onPerfil, onUpgrade }: { plan:Plan; onLogout:()=>void; onVideo:()=>void; onBack:()=>void; onPerfil:()=>void; onUpgrade:()=>void }) {
  const [active, setActive] = useState("normas");
  const handleNav = (id:string) => {
    setActive(id);
    if (id==="home") onBack();
    else if (id==="videos") onVideo();
  };

  return (
    <Shell plan={plan} onLogout={onLogout} onPerfil={onPerfil} onUpgrade={onUpgrade} active={active} onNav={handleNav}>
      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <article>
          <nav className="flex items-center gap-1.5 text-xs mb-6 flex-wrap" style={{ color:S.muted }}>
            <button onClick={onBack} className="hover:opacity-80">Início</button>
            <ChevronRight className="h-3 w-3" />
            <span>Normas</span>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color:S.fg }}>Lei nº 14.133/2021</span>
          </nav>

          <div className="flex flex-wrap gap-2 mb-5">
            <TipoBadge tipo="NORMA FEDERAL" />
            <Badge label="Federal" color="blue" />
          </div>

          <h1 className="font-display text-3xl font-bold leading-snug mb-5" style={{ color:S.fg }}>
            Lei nº 14.133/2021 — Lei de Licitações e Contratos Administrativos
          </h1>
          <p className="text-base leading-relaxed mb-7" style={{ color:S.muted }}>
            Estabelece normas gerais de licitação e contratação para as Administrações Públicas diretas, autárquicas e fundacionais da União, dos Estados, do Distrito Federal e dos Municípios.
          </p>

          <div className="flex flex-wrap gap-5 text-sm mb-7 pb-7" style={{ color:S.muted, borderBottom:`1px solid ${S.border}` }}>
            <span>📅 <strong style={{ color:S.fg }}>01/04/2021</strong></span>
            <span>🏛️ Esfera <strong style={{ color:S.fg }}>Federal</strong></span>
            <span>📋 Presidência da República</span>
          </div>

          <button className="flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium mb-10 hover:opacity-90 transition-all"
            style={{ background:`${S.blue}22`, border:`1px solid ${S.blue}55`, color:S.blue }}>
            <Download className="h-4 w-4" /> Baixar PDF
          </button>

          <div className="rounded-2xl p-8 space-y-5 text-sm leading-relaxed" style={card}>
            <p className="font-bold text-base" style={{ color:S.fg }}>LEI Nº 14.133, DE 1º DE ABRIL DE 2021</p>
            <p style={{ color:S.muted }}>
              <strong style={{ color:S.fg }}>Art. 1º</strong> Esta Lei estabelece normas gerais de licitação e contratação para as Administrações Públicas diretas, autárquicas e fundacionais da União, dos Estados, do Distrito Federal e dos Municípios, e se aplica aos órgãos dos Poderes Legislativo e Judiciário da União, dos Estados e do Distrito Federal e aos órgãos do Poder Legislativo dos Municípios, quando no desempenho de função administrativa.
            </p>
            <p style={{ color:S.muted }}>
              <strong style={{ color:S.fg }}>§ 1º</strong> Não são abrangidas por esta Lei as empresas públicas, as sociedades de economia mista e as suas subsidiárias, regidas pela Lei nº 13.303, de 30 de junho de 2016.
            </p>
            <p style={{ color:S.muted }}>
              <strong style={{ color:S.fg }}>Art. 2º</strong> Para os fins desta Lei, consideram-se: I – órgão: unidade de atuação integrante da estrutura da Administração direta; II – entidade: unidade de atuação dotada de personalidade jurídica…
            </p>
            <p className="text-xs italic" style={{ color:S.muted }}>
              [Texto integral com comentários do Dr. Carlos Carvalho Rocha disponível na plataforma]
            </p>
          </div>
        </article>

        <aside>
          <div className="sticky top-24 rounded-2xl p-6" style={card}>
            <h3 className="font-display text-sm font-semibold mb-5 flex items-center gap-2" style={{ color:S.fg }}>
              <BookOpen className="h-4 w-4" style={{ color:S.blue }} /> Normas relacionadas
            </h3>
            <div className="space-y-3">
              {[
                { titulo:"Decreto nº 10.922/2021 — Regulamenta a Lei 14.133", tipo:"DECRETO" },
                { titulo:"Lei nº 13.303/2016 — Estatuto das Estatais", tipo:"NORMA FEDERAL" },
                { titulo:"Lei nº 8.666/1993 — Antiga Lei de Licitações", tipo:"NORMA FEDERAL" },
              ].map((rel,i) => (
                <button key={i} className="w-full text-left rounded-xl p-4 transition-all hover:opacity-80"
                  style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${S.border}` }}>
                  <TipoBadge tipo={rel.tipo} />
                  <p className="text-xs mt-2.5 leading-snug" style={{ color:S.fg }}>{rel.titulo}</p>
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </Shell>
  );
}

/* ────────────────────────────────────────────────────────────
   5. VÍDEO
──────────────────────────────────────────────────────────── */
function VideoScreen({ plan, onLogout, onContent, onBack, onPerfil, onUpgrade }: { plan:Plan; onLogout:()=>void; onContent:()=>void; onBack:()=>void; onPerfil:()=>void; onUpgrade:()=>void }) {
  const ep = cursos[0];
  const [active, setActive] = useState("videos");
  const handleNav = (id:string) => {
    setActive(id);
    if (id==="home") onBack();
    else if (id==="normas"||id==="pls"||id==="decretos") onContent();
  };

  return (
    <Shell plan={plan} onLogout={onLogout} onPerfil={onPerfil} onUpgrade={onUpgrade} active={active} onNav={handleNav}>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div>
          <nav className="flex items-center gap-1.5 text-xs mb-5 flex-wrap" style={{ color:S.muted }}>
            <button onClick={onBack} className="hover:opacity-80">Início</button>
            <ChevronRight className="h-3 w-3" />
            <span>Vídeos</span>
            <ChevronRight className="h-3 w-3" />
            <span style={{ color:S.fg }}>Ep. 01</span>
          </nav>

          {/* player */}
          <div className="rounded-2xl overflow-hidden mb-7 relative" style={{ aspectRatio:"16/9", background:ep.cor }}>
            <img src={ep.foto} alt={ep.titulo} className="absolute inset-0 w-full h-full object-cover object-top" />
            <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.45)" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full cursor-pointer transition-all hover:scale-110"
                style={{ border:"2px solid rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.12)", backdropFilter:"blur(8px)" }}>
                <Play className="h-8 w-8 translate-x-0.5" style={{ color:"#fff", fill:"#fff" }} />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 px-5 py-4"
              style={{ background:"linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}>
              <div className="h-1 rounded-full mb-3 cursor-pointer" style={{ background:"rgba(255,255,255,0.2)" }}>
                <div className="h-full rounded-full" style={{ width:`${ep.progress}%`, background:S.blue }} />
              </div>
              <div className="flex items-center gap-3">
                <button><Play className="h-4 w-4" style={{ color:"#fff", fill:"#fff" }} /></button>
                <span className="text-xs" style={{ color:"rgba(255,255,255,0.7)" }}>14:38 / {ep.duracao}</span>
                <div className="flex-1" />
                <button className="text-xs px-2 py-0.5 rounded" style={{ color:"rgba(255,255,255,0.7)", background:"rgba(255,255,255,0.1)" }}>1x</button>
                <button style={{ color:"rgba(255,255,255,0.7)" }}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <Badge label={ep.categoria} color="blue" />
            <Badge label="Premium" color="gold" />
          </div>
          <h1 className="font-display text-2xl font-bold mb-3" style={{ color:S.fg }}>{ep.titulo}</h1>
          <div className="flex items-center gap-3 mb-4">
            <img src="/fotos/carlos-formal.jpg" alt="Carlos Rocha"
              className="h-10 w-10 rounded-full object-cover object-top shrink-0" style={{ border:`2px solid ${S.border}` }} />
            <div>
              <p className="text-sm font-semibold" style={{ color:S.fg }}>Dr. Carlos Carvalho Rocha</p>
              <p className="text-xs" style={{ color:S.muted }}>Advogado · OAB/DF 36.214 · OAB/GO 74797A</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed" style={{ color:S.muted }}>
            Neste episódio, Dr. Carlos Carvalho Rocha explica de forma objetiva os principais pontos da nova Lei de Licitações, com foco nos impactos para gestores municipais e câmaras de vereadores.
          </p>
        </div>

        {/* lista de episódios */}
        <aside>
          <div className="rounded-2xl overflow-hidden" style={card}>
            <div className="px-5 py-4 border-b" style={{ borderColor:S.border }}>
              <h3 className="font-display text-sm font-semibold" style={{ color:S.fg }}>Episódios da série</h3>
            </div>
            {cursos.map((v, i) => (
              <button key={v.id}
                className="flex items-start gap-3 w-full px-4 py-4 text-left transition-all hover:opacity-80 border-b last:border-b-0"
                style={{ background:i===0?`${S.blue}18`:"transparent", borderColor:S.border }}>
                <div className="relative h-12 w-20 shrink-0 rounded-lg overflow-hidden"
                  style={{ background:v.cor }}>
                  <img src={v.foto} alt={v.titulo} className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0" style={{ background:"rgba(0,0,0,0.3)" }} />
                  {i===0
                    ? <div className="absolute inset-0 flex items-center justify-center" style={{ background:`${S.blue}66` }}>
                        <span className="text-[8px] font-bold uppercase tracking-wider" style={{ color:"#fff" }}>Assistindo</span>
                      </div>
                    : <div className="absolute inset-0 flex items-center justify-center opacity-70">
                        <Play className="h-3.5 w-3.5" style={{ color:"#fff", fill:"#fff" }} />
                      </div>
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-snug line-clamp-2 mb-1" style={{ color:i===0?S.fg:S.muted }}>
                    Ep. {i+1} · {v.titulo}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color:S.muted }}>{v.duracao}</span>
                    {v.premium && plan!=="premium" && <Lock className="h-2.5 w-2.5" style={{ color:S.gold }} />}
                  </div>
                  {v.progress>0 && (
                    <div className="mt-1.5 h-0.5 rounded-full" style={{ background:"rgba(255,255,255,0.1)" }}>
                      <div className="h-full rounded-full" style={{ width:`${v.progress}%`, background:S.blue }} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </Shell>
  );
}

/* ────────────────────────────────────────────────────────────
   6. ACESSO BLOQUEADO
──────────────────────────────────────────────────────────── */
function LockedScreen({ onBack, onUpgrade }: { onBack:()=>void; onUpgrade:()=>void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background:`radial-gradient(ellipse 60% 50% at 50% 50%, hsl(214 74% 45% / 0.12), transparent 70%), ${S.bgDeep}` }}>
      <div className="max-w-md">
        <div className="flex h-20 w-20 mx-auto mb-6 items-center justify-center rounded-full"
          style={{ background:`${S.gold}18`, border:`1px solid ${S.gold}44` }}>
          <Lock className="h-9 w-9" style={{ color:S.gold }} />
        </div>
        <h1 className="font-display text-2xl font-bold mb-3" style={{ color:S.fg }}>
          Conteúdo exclusivo Premium
        </h1>
        <p className="text-base mb-8 leading-relaxed" style={{ color:S.muted }}>
          Faça upgrade e acesse todos os vídeos e episódios comentados pelo Dr. Carlos Carvalho Rocha.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onUpgrade}
            className="rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-[1.02]"
            style={{ background:S.gold, color:S.bgDeep }}>
            Fazer upgrade para Premium ✦
          </button>
          <button onClick={onBack}
            className="rounded-full px-7 py-3.5 text-sm font-medium hover:opacity-70"
            style={{ border:`1px solid ${S.border}`, color:S.muted }}>
            Voltar
          </button>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   PERFIL — Meu Desempenho
──────────────────────────────────────────────────────────── */
function PerfilScreen({ plan, onLogout, onBack, onPerfil, onUpgrade }: { plan: Plan; onLogout: () => void; onBack: () => void; onPerfil: () => void; onUpgrade: () => void }) {
  const [active, setActive] = useState("perfil");

  const handleNav = (id: string) => {
    setActive(id);
    if (id === "home") onBack();
  };

  const stats = [
    { label: "Aulas concluídas",    value: "5",       sub: "de 8 disponíveis",   cor: S.blue,  icon: "🎓" },
    { label: "Horas assistidas",    value: "8h 32m",  sub: "este mês",           cor: S.gold,  icon: "⏱️" },
    { label: "Sequência de acesso", value: "6 dias",  sub: "recorde: 14 dias",   cor: S.green, icon: "🔥" },
    { label: "Normas lidas",        value: "12",      sub: "desde o início",     cor: S.blue,  icon: "📋" },
  ];

  const progTrilhas = [
    { titulo: "Gestão Municipal Completa", total: 8, feitas: 5, cor: S.blue  },
    { titulo: "Técnica Legislativa",       total: 5, feitas: 2, cor: S.green },
    { titulo: "Direito Eleitoral Prático", total: 6, feitas: 0, cor: S.gold  },
  ];

  const atividades = [
    { acao: "Concluiu",    titulo: "Lei de Licitações na Prática",         quando: "Hoje, 09:14",       foto: "/fotos/carlos-podcast.jpg" },
    { acao: "Concluiu",    titulo: "Improbidade Administrativa Comentada",  quando: "Ontem, 18:30",      foto: "/fotos/carlos-retrato.jpg" },
    { acao: "Leu norma",   titulo: "Lei nº 14.230/2021 — Improbidade",     quando: "Ontem, 17:05",      foto: "/fotos/carlos-formal.jpg" },
    { acao: "Iniciou",     titulo: "Técnica Legislativa para Vereadores",   quando: "22/06 • 10:40",     foto: "/fotos/carlos-evento.jpg" },
    { acao: "Leu norma",   titulo: "Lei nº 14.133/2021 — Licitações",      quando: "20/06 • 14:20",     foto: "/fotos/carlos-podcast-acao.jpg" },
  ];

  const certificados = [
    { titulo: "Lei de Licitações na Prática",        emitido: true,  data: "29/06/2026" },
    { titulo: "Improbidade Administrativa",           emitido: false, data: null },
    { titulo: "Técnica Legislativa para Vereadores", emitido: false, data: null },
  ];

  return (
    <Shell plan={plan} onLogout={onLogout} onPerfil={onPerfil} onUpgrade={onUpgrade} active={active} onNav={handleNav}>
      {/* cabeçalho do perfil */}
      <div className="rounded-3xl overflow-hidden mb-8 relative" style={{ minHeight: 180 }}>
        <img src="/fotos/carlos-munibrasilcast.jpg" alt="" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,10,20,0.95) 0%, rgba(5,10,20,0.5) 100%)" }} />
        <div className="relative z-10 flex items-end gap-5 p-8">
          <img src="/fotos/carlos-formal.jpg" alt="João Mendes"
            className="h-20 w-20 rounded-2xl object-cover object-[center_15%] shrink-0"
            style={{ border: `3px solid ${S.blue}`, boxShadow: `0 0 0 4px ${S.blue}22` }} />
          <div className="flex-1">
            <h1 className="font-display text-2xl font-bold" style={{ color: S.fg }}>João Mendes</h1>
            <p className="text-sm mt-1" style={{ color: S.muted }}>joao@camara.gov.br · Membro desde jan/2026</p>
            <div className="mt-2"><Badge label={plan === "premium" ? "Plano Premium" : "Plano Básico"} color={plan === "premium" ? "gold" : "blue"} /></div>
          </div>
          <button onClick={onBack} className="hidden sm:flex items-center gap-2 rounded-full px-4 py-2 text-sm hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${S.border}`, color: S.muted }}>
            <ArrowLeft className="h-4 w-4" /> Voltar
          </button>
        </div>
      </div>

      {/* ── MEU DESEMPENHO ── */}
      <h2 className="font-display text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: S.fg }}>
        <TrendingUp className="h-6 w-6" style={{ color: S.blue }} /> Meu Desempenho
      </h2>

      {/* stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(s => (
          <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-3" style={card}>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ background: `${s.cor}1a`, color: s.cor }}>{s.sub}</span>
            </div>
            <div>
              <p className="font-display text-3xl font-bold" style={{ color: s.cor }}>{s.value}</p>
              <p className="text-xs mt-0.5" style={{ color: S.muted }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-8 mb-10">
        {/* progresso por trilha */}
        <div>
          <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2" style={{ color: S.fg }}>
            <Award className="h-5 w-5" style={{ color: S.gold }} /> Progresso nas Trilhas
          </h3>
          <div className="rounded-2xl overflow-hidden" style={card}>
            {progTrilhas.map((t, i) => {
              const pct = Math.round((t.feitas / t.total) * 100);
              return (
                <div key={t.titulo} className="px-6 py-5"
                  style={{ borderBottom: i < progTrilhas.length - 1 ? `1px solid ${S.border}` : "none" }}>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold" style={{ color: S.fg }}>{t.titulo}</p>
                    <span className="text-xs font-bold" style={{ color: t.cor }}>{pct}%</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden mb-2" style={{ background: "rgba(255,255,255,0.08)" }}>
                    <div className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, background: `linear-gradient(to right, ${t.cor}99, ${t.cor})` }} />
                  </div>
                  <p className="text-xs" style={{ color: S.muted }}>{t.feitas} de {t.total} aulas concluídas</p>
                </div>
              );
            })}
          </div>

          {/* streak visual */}
          <div className="rounded-2xl p-6 mt-5" style={card}>
            <h3 className="font-display text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: S.fg }}>
              <Flame className="h-4 w-4" style={{ color: S.gold }} /> Sequência de acesso — últimos 30 dias
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {Array.from({ length: 30 }, (_, i) => {
                const active = [0,1,2,3,4,5,7,8,12,13,14,19,20,25,26,27,28,29].includes(i);
                return (
                  <div key={i} className="h-6 w-6 rounded-md"
                    style={{ background: active ? S.blue : "rgba(255,255,255,0.06)", opacity: active ? 1 : 0.6 }} />
                );
              })}
            </div>
            <p className="text-xs mt-3" style={{ color: S.muted }}>18 dias ativos no último mês</p>
          </div>
        </div>

        {/* atividades recentes + certificados */}
        <div className="flex flex-col gap-6">
          {/* atividades */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: S.fg }}>
              <Clock className="h-5 w-5" style={{ color: S.blue }} /> Atividade Recente
            </h3>
            <div className="rounded-2xl overflow-hidden" style={card}>
              {atividades.map((a, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3.5"
                  style={{ borderBottom: i < atividades.length - 1 ? `1px solid ${S.border}` : "none" }}>
                  <img src={a.foto} alt="" className="h-9 w-9 rounded-lg object-cover object-[center_20%] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: S.fg }}>{a.titulo}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: S.muted }}>
                      <span style={{ color: a.acao === "Concluiu" ? S.green : S.blue }}>{a.acao}</span> · {a.quando}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* certificados */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: S.fg }}>
              <Award className="h-5 w-5" style={{ color: S.gold }} /> Certificados
            </h3>
            <div className="space-y-3">
              {certificados.map((c, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3.5" style={card}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-lg"
                    style={{ background: c.emitido ? `${S.gold}1f` : "rgba(255,255,255,0.05)" }}>
                    {c.emitido ? "🏆" : "🔒"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: c.emitido ? S.fg : S.muted }}>{c.titulo}</p>
                    <p className="text-[10px] mt-0.5" style={{ color: S.muted }}>
                      {c.emitido ? `Emitido em ${c.data}` : "Conclua o curso para desbloquear"}
                    </p>
                  </div>
                  {c.emitido && (
                    <button className="rounded-full px-3 py-1.5 text-[11px] font-bold shrink-0 hover:opacity-80"
                      style={{ background: `${S.gold}22`, color: S.gold, border: `1px solid ${S.gold}44` }}>
                      Baixar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ────────────────────────────────────────────────────────────
   ROOT
──────────────────────────────────────────────────────────── */
export default function Plataforma() {
  const [screen, setScreen] = useState<Screen>("login");
  const [plan, setPlan]     = useState<Plan>("basic");

  const [prev, setPrev] = useState<Screen>("login");

  const navigate = (s: Screen) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setPrev(screen);
    setScreen(s);
  };

  const handleVideo = () => plan==="premium" ? navigate("video") : navigate("locked");

  if (screen==="login")   return <LoginScreen onLogin={p=>{setPlan(p); navigate("dashboard")}} onPlans={()=>navigate("plans")} />;
  if (screen==="plans")   return <PlansScreen onBack={()=>navigate(prev === "login" ? "login" : "dashboard")} backLabel={prev === "login" ? "Voltar ao login" : "Voltar ao início"} onSelect={p=>{setPlan(p); navigate("dashboard")}} />;
  if (screen==="locked")  return <LockedScreen onBack={()=>navigate("dashboard")} onUpgrade={()=>{ setPlan("premium"); navigate("plans"); }} />;

  const toPerfil  = () => navigate("perfil");
  const toUpgrade = () => navigate("plans");

  if (screen==="dashboard")
    return <Dashboard plan={plan} onLogout={()=>navigate("login")} onContent={()=>navigate("content")} onVideo={handleVideo} onLocked={()=>navigate("locked")} onPerfil={toPerfil} onUpgrade={toUpgrade} />;

  if (screen==="content")
    return <ContentScreen plan={plan} onLogout={()=>navigate("login")} onVideo={handleVideo} onBack={()=>navigate("dashboard")} onPerfil={toPerfil} onUpgrade={toUpgrade} />;

  if (screen==="video")
    return <VideoScreen plan={plan} onLogout={()=>navigate("login")} onContent={()=>navigate("content")} onBack={()=>navigate("dashboard")} onPerfil={toPerfil} onUpgrade={toUpgrade} />;

  if (screen==="perfil")
    return <PerfilScreen plan={plan} onLogout={()=>navigate("login")} onBack={()=>navigate("dashboard")} onPerfil={toPerfil} onUpgrade={toUpgrade} />;

  return null;
}
