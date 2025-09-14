import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Gradient = "brand" | "purple";

const GRADIENTS: Record<Gradient, string> = {
  brand:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#6366F1_0%,#38BDF8_50%,#34D399_100%)]",
  purple:
    "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
};

type Props = {
  label: string;
  value: number;
  icon?: React.ReactNode;
  className?: string;
  delay?: number;
  ariaLabel?: string;
  retriggerOnReenter?: boolean;   
  gradient?: Gradient;            
  height?: number;                
  ringPaddingPx?: number;  
};

export default function ProgressBar({
  label,
  value,
  icon,
  className = "",
  delay = 0,
  ariaLabel,
  retriggerOnReenter = false, // Par défaut à false pour éviter les problèmes
  gradient = "brand",
  height = 8,
  ringPaddingPx = 1,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const target = Math.max(0, Math.min(100, value));

  // Intersection Observer simple et stable
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldAnimate = entry.isIntersecting && (!hasAnimated.current || retriggerOnReenter);
        
        if (shouldAnimate) {
          setIsVisible(true);
          hasAnimated.current = true;
        } else if (!entry.isIntersecting && retriggerOnReenter) {
          setIsVisible(false);
          hasAnimated.current = false;
          setAnimatedValue(0);
        }
      },
      { 
        threshold: 0.3,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [retriggerOnReenter]);

  // Animation du pourcentage avec setTimeout simple
  useEffect(() => {
    if (!isVisible) {
      setAnimatedValue(0);
      return;
    }

    const startDelay = delay * 1000;
    const animationDuration = 1000;
    const steps = 60;
    const stepDuration = animationDuration / steps;

    const timeoutId = setTimeout(() => {
      let currentStep = 0;
      
      const animate = () => {
        currentStep++;
        const progress = currentStep / steps;
        const eased = 1 - Math.pow(1 - progress, 3); // Easing out cubic
        const newValue = Math.round(eased * target);
        
        setAnimatedValue(newValue);
        
        if (currentStep < steps) {
          setTimeout(animate, stepDuration);
        }
      };
      
      animate();
    }, startDelay);

    return () => clearTimeout(timeoutId);
  }, [isVisible, target, delay]);

  return (
    <div ref={ref} className={`rounded-xl border bg-card p-4 shadow-soft ${className}`}>
      {/* Entête */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <div className="inline-flex items-center gap-2">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        <span className="tabular-nums text-muted-foreground">
          {animatedValue}%
        </span>
      </div>

      {/* Piste fixe */}
      <div
        className="relative w-full overflow-hidden rounded-full bg-white/10"
        style={{ height }}
        role="progressbar"
        aria-label={ariaLabel || label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={target}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 opacity-10 blur-[6px]" />

        {/* Barre de progression */}
        <motion.div
          className="relative h-full rounded-full overflow-hidden"
          style={{ padding: ringPaddingPx }}
          initial={{ width: "0%" }}
          animate={{ 
            width: isVisible ? `${target}%` : "0%" 
          }}
          transition={{
            delay: delay,
            duration: 1,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <span
            aria-hidden
            className={`absolute inset-[-10000%] motion-safe:animate-[spin_3s_linear_infinite] ${GRADIENTS[gradient]}`}
          />
          <div className="relative h-full w-full rounded-full bg-background/70 backdrop-blur-xl">
            <div className="pointer-events-none absolute inset-0 rounded-full [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] bg-white/5" />
            <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_60%)]" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}