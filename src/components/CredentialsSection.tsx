import { RevealGroup, RevealItem } from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const CredentialsSection = () => {
  return (
    <section className="relative border-y border-white/5 bg-background py-16 md:py-20">
      <div className="container">
        <RevealGroup className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
          <RevealItem className="glass flex flex-col items-center justify-center px-6 py-9 text-center">
            <span className="font-display text-4xl font-bold text-gold sm:text-5xl">
              <CountUp to={50} prefix="+" />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">projetos convertidos em lei</p>
          </RevealItem>

          <RevealItem className="glass flex flex-col items-center justify-center px-6 py-9 text-center">
            <span className="font-display text-4xl font-bold text-blue sm:text-5xl">
              <CountUp to={6} />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              anos de assessoria jurídico-legislativa
            </p>
          </RevealItem>

          <RevealItem className="glass flex flex-col items-center justify-center px-6 py-9 text-center">
            <span className="font-display text-4xl font-bold text-green sm:text-5xl">
              <CountUp to={3} />
            </span>
            <p className="mt-3 text-sm text-muted-foreground">
              esferas de atuação: Executivo + Legislativo (federal, estadual e municipal)
            </p>
          </RevealItem>

          <RevealItem className="glass flex flex-col items-center justify-center px-6 py-9 text-center">
            <span className="font-display text-lg font-bold leading-tight text-foreground">
              Procuradoria-Geral
              <br />
              Municipal
            </span>
            <p className="mt-3 text-sm text-muted-foreground">experiência no Executivo municipal</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
};

export default CredentialsSection;
