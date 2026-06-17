import { useMemo } from "react";
import { motion } from "framer-motion";

/** Pontos discretos flutuando — densidade baixa, performance primeiro. */
const Particles = ({ count = 16 }: { count?: number }) => {
  const dots = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2.5 + 1.5,
        drift: Math.random() * 24 + 12,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 4,
        green: i % 3 === 0,
      })),
    [count]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {dots.map((d) => (
        <motion.span
          key={d.id}
          className="absolute rounded-full"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: d.green
              ? "hsl(var(--green-brand))"
              : "hsl(var(--primary))",
            boxShadow: `0 0 8px ${d.green ? "hsl(var(--green-brand))" : "hsl(var(--primary))"}`,
          }}
          animate={{ y: [0, -d.drift, 0], opacity: [0.15, 0.7, 0.15] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default Particles;
