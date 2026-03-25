import phoneApp from "@/assets/phone-app.jpg";
import { MessageSquare, ShieldCheck } from "lucide-react";

const SupportSection = () => {
  return (
    <section id="atendimento" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative flex justify-center">
            <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
            <img
              src={phoneApp}
              alt="Canal de atendimento humanizado no celular"
              className="relative rounded-2xl shadow-xl max-w-sm w-full"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-accent mb-4 block">
              Canal de Atendimento
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight mb-6">
              Diálogo e Acolhimento{" "}
              <span className="text-gradient">24h</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              A inteligência por trás dos nossos dispositivos conecta o eleitor a um{" "}
              <strong className="text-foreground">Canal de Atendimento Humanizado</strong>.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="icon-glow w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Atenção Personalizada</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    O sistema é capaz de ouvir e processar mensagens de voz, respondendo às
                    dúvidas dos cidadãos de maneira clara, acolhedora e sempre fiel às propostas oficiais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="icon-glow w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">Informação Segura</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Um ambiente controlado para fornecer dados precisos e oficiais, combatendo
                    desinformações de forma direta e protegendo a integridade da sua comunicação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
