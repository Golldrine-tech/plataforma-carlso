import heroBg from "@/assets/hero-bg.jpg";
import { Wifi, ArrowDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
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
        
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
          Tecnologia a serviço da <strong className="text-primary-foreground">cidadania</strong> e da{" "}
          <strong className="text-primary-foreground">sustentabilidade</strong>
        </p>

        <p className="text-sm text-primary-foreground/50 mb-10 animate-fade-up" style={{ animationDelay: "0.25s" }}>
          Golldrine — Tecnologia para Negócios
        </p>

        <a
          href="#cenario"
          className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3.5 rounded-full font-semibold text-sm hover:brightness-110 transition-all animate-fade-up"
          style={{ animationDelay: "0.35s" }}
        >
          Conheça a Solução
          <ArrowDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
