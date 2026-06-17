import { motion } from "framer-motion";
import { Scale, FileText, Compass, Users, Presentation } from "lucide-react";
import Reveal, { RevealGroup, itemVariants } from "@/components/Reveal";

const services = [
  {
    icon: Scale,
    accent: "blue",
    title: "Assessoria Jurídica para Municípios e Câmaras",
    description:
      "Consultivo e contencioso para prefeituras e câmaras: pareceres, defesa administrativa e judicial dos interesses municipais e consultoria preventiva.",
  },
  {
    icon: FileText,
    accent: "green",
    title: "Consultoria Técnica Legislativa",
    description:
      "Elaboração e revisão de projetos de lei, leis orgânicas e regimentos internos, notas técnicas e análise de constitucionalidade, legalidade e juridicidade.",
  },
  {
    icon: Compass,
    accent: "blue",
    title: "Mentoria em Gestão Política",
    description:
      "Formação estratégica para gestores públicos e lideranças que querem governar com técnica, legalidade e resultado.",
  },
  {
    icon: Users,
    accent: "green",
    title: "Mentoria em Assessoria Parlamentar",
    description:
      "Capacitação de assessores e equipes parlamentares no processo legislativo e na atuação em plenário e comissões.",
  },
  {
    icon: Presentation,
    accent: "blue",
    title: "Palestras e Treinamentos Presenciais",
    description:
      "Conteúdo prático sobre direito público, processo legislativo e gestão municipal para equipes, câmaras e eventos.",
  },
] as const;

const ServicesSection = () => {
  return (
    <section id="atuacao" className="relative py-20 md:py-28">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glow-rule glow-rule-center" />
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Áreas de Atuação</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Soluções jurídicas e formativas para quem atua na linha de frente da gestão pública e do
            processo legislativo.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.article
              key={service.title}
              variants={itemVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group glass flex h-full flex-col rounded-2xl p-7 transition-shadow duration-300 ${
                service.accent === "green" ? "hover:glow-green" : "hover:glow-blue"
              }`}
            >
              <span
                className={`flex h-12 w-12 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
                  service.accent === "green"
                    ? "border-green-brand/40 bg-green-brand/10 text-green"
                    : "border-primary/40 bg-primary/10 text-blue"
                }`}
              >
                <service.icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default ServicesSection;
