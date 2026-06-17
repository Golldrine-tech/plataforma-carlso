// Dados institucionais e links de contato — fonte única de verdade.

const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site e gostaria de falar sobre assessoria jurídica.";

/** Link wa.me com mensagem pré-preenchida. */
export function whatsappLink(phone = "5561998490772") {
  return `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}

export const site = {
  name: "Carlos Carvalho Rocha",
  fullName: "Carlos Carvalho Rocha Advocacia",
  whatsappPrimary: whatsappLink("5561998490772"),
  whatsappSecondary: whatsappLink("5561992574880"),
  phones: ["(61) 99849-0772", "(61) 99257-4880"],
  email: "ccrochadv@gmail.com",
  instagram: {
    firm: { handle: "@carlos_rocha_advocacia", url: "https://instagram.com/carlos_rocha_advocacia" },
    cast: { handle: "@munibrasilcast", url: "https://instagram.com/munibrasilcast" },
  },
  youtube: "https://www.youtube.com/@munibrasilcast",
} as const;

export const nav = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Atuação", href: "#atuacao" },
  { label: "Mentorias", href: "#atuacao" },
  { label: "MuniBrasilCast", href: "#munibrasilcast" },
  { label: "Contato", href: "#contato" },
] as const;
