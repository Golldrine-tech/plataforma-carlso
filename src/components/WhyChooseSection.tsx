import { Award, BarChart3, Recycle } from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "Diferenciação e Liderança",
    description:
      "Sua campanha será lembrada como a que trouxe a inovação para o estado, conectando-se especialmente com o eleitor que busca renovação e eficiência.",
  },
  {
    icon: BarChart3,
    title: "Decisões Baseadas em Dados",
    description:
      "Oferecemos uma visão clara do alcance da sua mensagem. Entregamos relatórios de engajamento por região, permitindo que sua coordenação foque esforços onde o interesse da população é maior.",
  },
  {
    icon: Recycle,
    title: "Eficiência e Preservação",
    description:
      "Uma estratégia que otimiza recursos e foca no que realmente importa: a construção de um diálogo sólido e sustentável com o eleitorado.",
  },
];

const WhyChooseSection = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-foreground leading-tight mb-16">
          Por que esta é a escolha certa<br />para sua trajetória?
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {reasons.map((reason, i) => (
            <div key={reason.title} className="relative">
              {/* Connector line */}
              {i < reasons.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-muted-foreground/20" />
              )}
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{reason.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
