import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "../../lib/utils";

type NavItem = { name: string; link: string; icon?: JSX.Element };

export default function FloatingNav({
  navItems,
  className,
}: {
  navItems: NavItem[];
  className?: string;
}) {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;
    const prev = scrollYProgress.getPrevious() ?? 0;
    const dir = current - prev;
    setVisible(scrollYProgress.get() < 0.05 || dir < 0);
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed top-10 inset-x-0 z-[5000] mx-auto flex max-w-fit items-center justify-center space-x-4",
          "md:min-w-[70vw] lg:min-w-fit",
          "rounded-lg px-10 py-5 border backdrop-blur-sm",
          className
        )}
      >
        {navItems.map((item, idx) => (
          <a
            key={`nav-${idx}-${item.name}`}
            href={item.link}
            aria-label={item.name}
            className={cn(
              "relative flex items-center space-x-1 text-sm !cursor-pointer rounded-md px-1 py-0.5",
              "text-foreground/90 hover:text-foreground",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
            )}
          >
            {item.icon && <span className="block sm:hidden">{item.icon}</span>}
            <span className="underline-offset-4 hover:underline">{item.name}</span>
          </a>
        ))}
      </motion.nav>
    </AnimatePresence>
  );
}
