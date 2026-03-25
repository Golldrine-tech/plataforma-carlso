import heroBg from "@/assets/hero-bg.jpg";
import heroBgMobile from "@/assets/hero-bg-mobile.jpg";
import { Wifi, ArrowDown, Shield, Recycle, Heart, Award } from "lucide-react";

const floatingTags = [
  { label: "LGPD", icon: Shield, delay: "0.5s", x: "-translate-x-16 md:-translate-x-28", y: "-translate-y-2" },
  { label: "0 Lixo", icon: Recycle, delay: "0.7s", x: "-translate-x-4 md:-translate-x-8", y: "translate-y-1" },
  { label: "Acolhimento", icon: Heart, delay: "0.9s", x: "translate-x-4 md:translate-x-8", y: "translate-y-1" },
  { label: "Autoridade", icon: Award, delay: "1.1s", x: "translate-x-16 md:translate-x-28", y: "-translate-y-2" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover hidden md:block"
        width={1920}
        height={1080}
      />
      <img
        src={heroBgMobile}
        alt=""
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        width={720}
        height={1280}
      />
      <div className="absolute inset-0 bg-primary/80" />
      
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
          <Wifi className="w-5 h-5 text-teal" />
          <span className="text-sm font-semibold tracking-widest uppercase text-teal">
            Inovação e Conexão
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6 animate-fade-up">
          O Futuro da<br />
          <span className="text-gradient">Comunicação Eleitoral</span>
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Tecnologia a serviço da <strong className="text-primary-foreground">cidadania</strong> e da{" "}
          <strong className="text-primary-foreground">sustentabilidade</strong>
        </p>

        <a
          href="#cenario"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all animate-fade-up"
          style={{ animationDelay: "0.25s" }}
        >
          Conheça a Solução
          <ArrowDown className="w-4 h-4" />
        </a>

        {/* Floating tags */}
        <div className="flex items-center justify-center gap-3 md:gap-5 mt-10 flex-wrap">
          {floatingTags.map((tag) => (
            <div
              key={tag.label}
              className="group relative flex items-center gap-1.5 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-full px-3.5 py-2 text-primary-foreground/60 text-xs font-medium animate-fade-up hover:bg-primary-foreground/15 transition-colors cursor-default"
              style={{ animationDelay: tag.delay }}
            >
              {/* Pulsing glow */}
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal/40" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal/70" />
              </span>
              <tag.icon className="w-3.5 h-3.5 text-teal/70" />
              {tag.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
