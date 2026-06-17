import { MessageCircle, Mail, Instagram, Youtube, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

const ContactSection = () => {
  return (
    <section id="contato" className="relative overflow-hidden py-20 md:py-28">
      <div className="aurora" />
      <div className="perspective-grid opacity-60" />
      <div className="container relative z-10 grid gap-14 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="glow-rule" />
          <h2 className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Vamos conversar sobre a sua demanda?
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
            Atendimento direto e estratégico para gestores, câmaras e parlamentares.
          </p>
          <a
            href={site.whatsappPrimary}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-accent-foreground transition-all hover:scale-[1.03] hover:glow-gold"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={2} />
            Falar no WhatsApp agora
          </a>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="glass-strong rounded-3xl p-7 sm:p-9">
            <h3 className="font-display text-xl font-semibold text-foreground">Contato direto</h3>
            <ul className="mt-6 space-y-5 text-muted-foreground">
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold">
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">WhatsApp</p>
                  <a href={site.whatsappPrimary} target="_blank" rel="noopener noreferrer" className="block text-foreground/90 hover:text-gold">
                    {site.phones[0]}
                  </a>
                  <a href={site.whatsappSecondary} target="_blank" rel="noopener noreferrer" className="block text-foreground/90 hover:text-gold">
                    {site.phones[1]}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold">
                  <Mail className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">E-mail</p>
                  <a href={`mailto:${site.email}`} className="text-foreground/90 hover:text-gold">
                    {site.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold">
                  <Instagram className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">Instagram</p>
                  <a href={site.instagram.firm.url} target="_blank" rel="noopener noreferrer" className="block text-foreground/90 hover:text-gold">
                    {site.instagram.firm.handle}
                  </a>
                  <a href={site.instagram.cast.url} target="_blank" rel="noopener noreferrer" className="block text-foreground/90 hover:text-gold">
                    {site.instagram.cast.handle}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gold">
                  <Youtube className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground/70">YouTube</p>
                  <a href={site.youtube} target="_blank" rel="noopener noreferrer" className="text-foreground/90 hover:text-gold">
                    MuniBrasilCast
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactSection;
