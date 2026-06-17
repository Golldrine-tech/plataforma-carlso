import { Instagram, Youtube, MessageCircle } from "lucide-react";
import { nav, site } from "@/lib/site";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-background-deep">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <img
              src="/logo-munibrasil.svg"
              alt="Carlos Carvalho Rocha Advocacia"
              className="h-14 w-auto"
              width={196}
              height={140}
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Direito Público, Administrativo, Municipal e Legislativo a serviço de municípios,
              câmaras e parlamentares.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground transition-colors hover:text-gold">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-foreground/80">
              Redes sociais
            </h4>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Instagram, href: site.instagram.firm.url, label: "Instagram" },
                { icon: Youtube, href: site.youtube, label: "YouTube" },
                { icon: MessageCircle, href: site.whatsappPrimary, label: "WhatsApp" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-primary/50 hover:text-gold hover:glow-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 space-y-1 text-xs text-muted-foreground/80">
              <p>Carlos Carvalho Rocha — OAB/DF 36.214 · OAB/GO 74797A</p>
              <p>Daniella B. Gontijo — OAB/GO 59.408 · OAB/DF 86.833</p>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs leading-relaxed text-muted-foreground/80">
            © 2026 Carlos Carvalho Rocha Advocacia. Todos os direitos reservados.
          </p>
          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-muted-foreground/60">
            Conteúdo de caráter meramente informativo, em conformidade com o Provimento e o Código de
            Ética e Disciplina da OAB. Publicidade sóbria e moderada, sem captação de clientela ou
            mercantilização da advocacia.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
