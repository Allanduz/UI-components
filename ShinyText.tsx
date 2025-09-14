import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;     // secondes par cycle
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={[
        "inline-block",
        "bg-clip-text",  
        "text-transparent",      
        disabled ? "" : "animate-shine",
        disabled ? "" : "motion-safe:animate-shine motion-reduce:animate-none",
        className,
      ].join(" ")}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255,255,255,0) 40%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        animationDuration,
        willChange: "background-position",
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
