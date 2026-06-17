import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

interface CountUpProps {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

/** Conta de 0 até `to` quando entra na viewport. */
const CountUp = ({ to, prefix = "", suffix = "", duration = 1.6 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return controls.stop;
  }, [inView, to, duration, prefix, suffix, count]);

  return <span ref={ref}>{`${prefix}0${suffix}`}</span>;
};

export default CountUp;
