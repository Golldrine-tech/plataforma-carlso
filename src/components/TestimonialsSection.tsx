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
  {
    quote: "A assessoria do Dr. Carlos foi decisiva na aprovação do nosso Plano Diretor. Cada etapa do processo legislativo foi conduzida com segurança jurídica e clareza técnica — algo raro quando o assunto é direito municipal.",
    name: "M.A.S.",
    role: "Secretário de Planejamento · Município do Centro-Oeste",
  },
  {
    quote: "Contratamos a banca para revisar o regimento interno da Câmara e elaborar projetos de lei complementar. O resultado superou nossas expectativas: pareceres sólidos, linguagem acessível e prazos rigorosamente cumpridos.",
    name: "C.F.L.",
    role: "Presidente de Câmara Municipal · Estado de Goiás",
  },
  {
    quote: "Quando enfrentamos uma ação de improbidade administrativa, a orientação estratégica do Dr. Carlos foi fundamental. Conhece profundamente o contencioso público e sabe como proteger o gestor de boa-fé.",
    name: "R.M.O.",
    role: "Ex-Prefeito · Região Centro-Norte de Minas Gerais",
  },
  {
    quote: "A mentoria em assessoria parlamentar transformou a forma como minha equipe atua no plenário. Hoje produzimos emendas e substitutivos com muito mais qualidade técnica e confiança jurídica.",
    name: "T.B.V.",
    role: "Assessor Parlamentar · Assembleia Legislativa",
  },
  {
    quote: "Durante a campanha eleitoral, o suporte em direito eleitoral foi indispensável. Respondemos a todas as representações com argumentação precisa e dentro dos prazos do TSE. Saímos ilesos.",
    name: "P.C.N.",
    role: "Vereador eleito · Capital do Distrito Federal",
  },
  {
    quote: "O Dr. Carlos foi procurador do município e isso faz toda a diferença: ele fala a língua do gestor público. Conseguimos evitar uma série de litígios com a consultoria preventiva que nos ofereceu ao longo do mandato.",
    name: "E.S.R.",
    role: "Prefeito · Município do Entorno do DF",
  },
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
