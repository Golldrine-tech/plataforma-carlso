const items = [
  "Direito Público",
  "Técnica Legislativa",
  "Gestão Municipal",
  "Assessoria Parlamentar",
  "Direito Eleitoral",
  "Mentorias",
];

/** Uma sequência dos itens; o track repete duas vezes para o loop ser contínuo. */
const Row = () => (
  <div className="flex shrink-0 items-center">
    {items.map((item) => (
      <span key={item} className="flex items-center">
        <span className="px-7 font-display text-sm font-semibold uppercase tracking-[0.28em] text-foreground/30 sm:text-base">
          {item}
        </span>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-gold/50" />
      </span>
    ))}
  </div>
);

/** Faixa de texto em loop infinito separando a hero das demais seções. */
const Marquee = () => (
  <div className="relative overflow-hidden border-y border-white/5 bg-background py-5" aria-hidden>
    <div className="marquee-track flex w-max">
      <Row />
      <Row />
    </div>
    {/* fades laterais para fundir no escuro */}
    <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background-deep to-transparent" />
    <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background-deep to-transparent" />
  </div>
);

export default Marquee;
