import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, MessageCircle } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { nav, site } from "@/lib/site";

const Brand = () => (
  <a href="#inicio" className="flex items-center" aria-label="Carlos Carvalho Rocha Advocacia — início">
    <img
      src="/logo-munibrasil.svg"
      alt="Carlos Carvalho Rocha Advocacia"
      className="h-11 w-auto sm:h-12"
      width={170}
      height={122}
    />
  </a>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass-strong border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between md:h-[4.5rem]">
        <Brand />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-primary to-green-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-foreground lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[82%] max-w-sm border-white/10 bg-background-deep/95 backdrop-blur-xl">
              <div className="mt-2 mb-8">
                <Brand />
              </div>
              <nav className="flex flex-col gap-1" aria-label="Navegação mobile">
                {nav.map((item) => (
                  <SheetClose asChild key={item.label}>
                    <a
                      href={item.href}
                      className="rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <a
                  href={site.whatsappPrimary}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-sm font-semibold text-accent-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  Falar no WhatsApp
                </a>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
