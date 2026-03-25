import { Leaf, Clock } from "lucide-react";

const ScenarioSection = () => {
  return (
    <section id="cenario" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">
              O Cenário Atual
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Uma comunicação que{" "}
              <span className="text-gradient">respeita a cidade</span> e o cidadão
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nossa proposta é elevar o patamar da sua campanha, transformando a propaganda
              tradicional em uma experiência digital de valor.
            </p>
          </div>

          {/* Right column - cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="icon-glow w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Leaf className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Compromisso Ambiental</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Ao optar por soluções tecnológicas, a candidatura assume o protagonismo na
                preservação urbana, reduzindo drasticamente o descarte de materiais nas ruas.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
              <div className="icon-glow w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Clock className="w-7 h-7 text-accent" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">Disponibilidade Total</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Enquanto a estrutura física tem horários, a sua mensagem não para. Garantimos
                que o eleitor seja acolhido e informado 24 horas por dia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScenarioSection;
