import productsShowcase from "@/assets/products-showcase.jpg";
import { Phone, Globe, Mail, Instagram } from "lucide-react";

const contacts = [
  { icon: Phone, label: "(61) 98222-4180", href: "tel:+5561982224180" },
  { icon: Globe, label: "www.golldrine.com", href: "https://www.golldrine.com" },
  { icon: Mail, label: "golldrinetech@gmail.com", href: "mailto:golldrinetech@gmail.com" },
  { icon: Instagram, label: "@golldrine", href: "https://instagram.com/golldrine" },
];

const ContactSection = () => {
  return (
    <section id="contato" className="py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-4">Obrigado!</h2>
            <p className="text-primary-foreground/60 text-lg mb-10 max-w-md">
              Solicite um <strong className="text-primary-foreground">orçamento personalizado</strong> para
              a sua campanha e descubra como podemos levar sua mensagem mais longe.
            </p>
            <img
              src={productsShowcase}
              alt="Produtos Golldrine"
              className="rounded-2xl w-full max-w-md shadow-xl"
              loading="lazy"
            />
          </div>

          {/* Right */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Nossos Contatos</h3>
            <div className="space-y-4">
              {contacts.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-navy-light/50 backdrop-blur rounded-xl px-6 py-5 border border-primary-foreground/10 hover:border-teal/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center shrink-0">
                    <c.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium">{c.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
