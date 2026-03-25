import { CreditCard, Tag, FileText, Wifi, Play } from "lucide-react";

const tools = [
  {
    icon: CreditCard,
    title: "Cartão Tecnológico",
    audience: "Para o Candidato e Coordenação",
    description:
      "Um item de prestígio para momentos estratégicos. Com apenas um toque, todas as suas informações oficiais e plano de governo são transferidos para o celular do interlocutor.",
    stat: "99%",
    statLabel: "Compartilhamento Garantido",
  },
  {
    icon: Tag,
    title: "Tag Tecnológica",
    audience: "Para Multiplicadores e Apoiadores",
    description:
      "Um dispositivo discreto que transforma o celular de cada apoiador em um ponto de conexão. É a tecnologia facilitando o \"corpo a corpo\" e garantindo que sua mensagem seja multiplicada.",
    stat: "99%",
    statLabel: "Conexão Garantida",
  },
  {
    icon: FileText,
    title: "Santinho Tec",
    audience: "Engajamento e Memória",
    description:
      "Um material diferenciado que o eleitor sente satisfação em guardar. Ele funciona como uma chave digital para o seu governo, unindo tradição com eficiência digital.",
    stat: "99%",
    statLabel: "Visibilidade Garantida",
  },
];

const ToolsSection = () => {
  return (
    <section id="ferramentas" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Wifi className="w-5 h-5 text-teal" />
            <span className="text-xs font-bold tracking-widest uppercase text-teal">
              Dispositivos Tecnológicos
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Ferramentas de<br />Alta Performance
          </h2>
          <p className="text-primary-foreground/60 text-lg max-w-2xl mx-auto">
            Desenvolvemos dispositivos exclusivos que funcionam por{" "}
            <strong className="text-primary-foreground">aproximação</strong>, facilitando o
            compartilhamento de ideias de forma instantânea.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-teal/40 hover:bg-primary-foreground/10 transition-all"
            >
              <div className="icon-glow w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center mb-5">
                <tool.icon className="w-6 h-6 text-teal" />
              </div>
              <h3 className="text-xl font-bold mb-1">{tool.title}</h3>
              <p className="text-teal text-sm font-medium mb-4">{tool.audience}</p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
                {tool.description}
              </p>
              <div className="flex items-center gap-3 pt-4">
                <span className="text-3xl font-extrabold text-accent animate-stat-pulse">{tool.stat}</span>
                <span className="text-xs text-primary-foreground/50 uppercase tracking-wider font-semibold animate-stat-pulse">
                  {tool.statLabel}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Video Card */}
        <div className="bg-primary-foreground/5 backdrop-blur-md rounded-2xl p-8 border border-primary-foreground/10 hover:border-teal/40 hover:bg-primary-foreground/10 transition-all mb-16">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="icon-glow w-12 h-12 rounded-xl bg-teal/20 flex items-center justify-center shrink-0">
              <Play className="w-6 h-6 text-teal" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold mb-1">Veja na Prática</h3>
              <p className="text-teal text-sm font-medium mb-2">Demonstração em Vídeo</p>
              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                Confira como nossos dispositivos tecnológicos funcionam no dia a dia da campanha.
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl overflow-hidden">
            <video
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-xl max-h-[500px] bg-black/30"
            >
              <source src="/videos/daniel.mov" type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>
          </div>
        </div>

        <div className="flex justify-center">
          <a
            href="https://wa.me/5561982262436?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20uma%20reuni%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-4 rounded-full text-lg transition-colors"
          >
            Solicitar Reunião
          </a>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
