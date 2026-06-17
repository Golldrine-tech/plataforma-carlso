import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em segundos. */
  delay?: number;
  y?: number;
}

/** Fade + slide-up ao entrar na viewport (uma vez). */
const Reveal = ({ children, className, delay = 0, y = 28 }: RevealProps) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

/** Container que escalona a entrada dos filhos. Use com <RevealItem>. */
export const RevealGroup = ({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) => {
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </motion.div>
  );
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export const RevealItem = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => (
  <motion.div className={className} variants={itemVariants}>
    {children}
  </motion.div>
);

export default Reveal;
