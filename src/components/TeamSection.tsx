import { motion } from "framer-motion";
import { UserRound } from "lucide-react";
import Reveal, { RevealGroup, itemVariants } from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";

const team = [
  {
    name: "Daniella B. Gontijo",
    oab: ["OAB/GO 59.408", "OAB/DF 86.833"],
    bio: "Especialista em Direito Administrativo, Municipal e Eleitoral, com atuação no consultivo e contencioso voltados à Administração Pública, gestão municipal e técnica legislativa. Já atuou como Assessora de Magistrado no TJ-GO e em diretorias jurídicas municipais.",
    accent: "green",
    photo: "/fotos/daniella.jpg" as string | undefined,
  },
  {
    name: "Carlos Carvalho Rocha",
    oab: ["OAB/DF 36.214", "OAB/GO 74797A"],
    bio: "Trajetória em Direito Público, Eleitoral e Legislativo. Foi Procurador-Geral Municipal e Assessor Jurídico Legislativo e Parlamentar por 6 anos, com mais de 50 projetos convertidos em lei. Pós-graduado em Direito Público, Eleitoral, Civil/Processo Civil e Licitações e Contratos.",
    accent: "blue",
    photo: "/fotos/carlos-formal.jpg",
  },
] as const;

const TeamSection = () => {
  return (
    <section id="equipe" className="relative overflow-hidden py-20 md:py-28">
      <div className="aurora opacity-40" />
      <div className="container relative z-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <div className="glow-rule glow-rule-center" />
          <h2 className="mt-6 font-display text-3xl font-bold sm:text-4xl">Nossa equipe</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Profissionais com vivência real nos poderes Executivo e Legislativo.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-8 md:grid-cols-2">
          {team.map((member) => (
            <motion.article
              key={member.name}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className={`group glass flex h-full flex-col gap-6 rounded-2xl p-7 transition-shadow duration-300 sm:flex-row sm:items-start ${
                member.accent === "green" ? "hover:glow-green" : "hover:glow-blue"
              }`}
            >
              {/* [PLACEHOLDER FOTO] */}
              <div className="relative mx-auto sm:mx-0">
                <div
                  className={`absolute -inset-1 rounded-2xl opacity-0 blur-md transition-opacity group-hover:opacity-100 ${
                    member.accent === "green" ? "bg-green-brand/40" : "bg-primary/40"
                  }`}
                  aria-hidden
                />
                <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  <SmartImage
                    src={member.photo}
                    alt={member.name}
                    className="h-[115%] w-[115%] object-cover object-center"
                    fallback={<UserRound className="h-12 w-12 text-muted-foreground/50" strokeWidth={1} />}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">{member.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {member.oab.map((reg) => (
                    <span
                      key={reg}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              </div>
            </motion.article>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};

export default TeamSection;
