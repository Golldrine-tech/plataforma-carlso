import { motion, useScroll, useSpring } from "framer-motion";

/** Barra fina de progresso de leitura fixa no topo da página. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-green-brand to-gold"
    />
  );
};

export default ScrollProgress;
