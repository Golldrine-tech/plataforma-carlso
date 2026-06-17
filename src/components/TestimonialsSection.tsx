import { Quote, UserRound } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Reveal from "@/components/Reveal";

/**
 * Estrutura pronta — conteúdo placeholder.
 * Defina SHOW = false para ocultar até ter depoimentos reais.
 */
const SHOW = true;

const testimonials = [
  { quote: "[PLACEHOLDER DEPOIMENTO] — espaço reservado para o relato do cliente.", name: "Nome do cliente", role: "Cargo · Município" },
  { quote: "[PLACEHOLDER DEPOIMENTO] — espaço reservado para o relato do cliente.", name: "Nome do cliente", role: "Cargo · Câmara Municipal" },
  { quote: "[PLACEHOLDER DEPOIMENTO] — espaço reservado para o relato do cliente.", name: "Nome do cliente", role: "Cargo · Parlamento" },
];

const TestimonialsSection = () => {
  if (!SHOW) return null;

  return (
    <section id="depoimentos" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glow-rule glow-rule-center" />
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
            O que dizem nossos clientes
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <Carousel opts={{ align: "start", loop: true }} className="mx-auto max-w-5xl px-2">
            <CarouselContent>
              {testimonials.map((item, i) => (
                <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                  <figure className="glass flex h-full flex-col rounded-2xl p-7">
                    <Quote className="h-8 w-8 text-gold" strokeWidth={1.25} />
                    <blockquote className="mt-4 flex-1 text-base leading-relaxed text-foreground/85">
                      {item.quote}
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5">
                        <UserRound className="h-5 w-5 text-muted-foreground/50" strokeWidth={1.25} />
                      </span>
                      <span>
                        <span className="block font-semibold text-foreground">{item.name}</span>
                        <span className="block text-sm text-muted-foreground">{item.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-white/10 bg-white/5 text-foreground hover:bg-white/10" />
            <CarouselNext className="border-white/10 bg-white/5 text-foreground hover:bg-white/10" />
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
};

export default TestimonialsSection;
