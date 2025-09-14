/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Gradient = "brand" | "purple";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  title?: React.ReactNode;
  i18nKey?: string; 
  ariaLabelKey?: string;  
  i18nNs?: string;          
  values?: Record<string, unknown>; 
  icon?: React.ReactNode;
  position?: "left" | "right";
  gradient?: Gradient;
  className?: string;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  iconOnly?: boolean;
  ariaLabel?: string;
};

type ButtonProps = BaseProps & {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: undefined;
  to?: undefined;
};

type AnchorProps = BaseProps & {
  href: string;
  to?: undefined;
  onClick?: undefined;
  type?: undefined;
};

type LinkProps = BaseProps & {
  to: string;
  href?: undefined;
  onClick?: undefined;
  type?: undefined;
};

type MagicButtonProps = ButtonProps | AnchorProps | LinkProps;

const GRADIENTS: Record<Gradient, string> = {
  brand: "bg-[conic-gradient(from_90deg_at_50%_50%,#6366F1_0%,#38BDF8_50%,#34D399_100%)]",
  purple: "bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]",
};

const SIZE_MAP: Record<Size, { height: string; px: string; text: string; gap: string }> = {
  sm: { height: "h-10", px: "px-4", text: "text-sm", gap: "gap-2" },
  md: { height: "h-12", px: "px-6", text: "text-sm", gap: "gap-2" },
  lg: { height: "h-14", px: "px-7", text: "text-base", gap: "gap-3" },
};

export default function MagicButton(props: MagicButtonProps) {
  const {
    title,
    i18nKey,
    ariaLabelKey,
    i18nNs = "common",
    values,
    icon,
    position = "right",
    gradient = "brand",
    className = "",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false,
    ariaLabel,
  } = props as BaseProps;

  const { t } = useTranslation(i18nNs);

  const translatedTitle =
    i18nKey ? (t(i18nKey, values) as React.ReactNode) : title;

  const computedAriaLabel =
    iconOnly
      ? (ariaLabelKey ? t(ariaLabelKey, values) : ariaLabel) ??
        (typeof translatedTitle === "string" ? translatedTitle : undefined)
      : undefined;

  const outerBase =
    "relative inline-flex overflow-hidden rounded-lg p-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";
  const widthCls = fullWidth ? "w-full" : "w-auto";
  const sizeCls = SIZE_MAP[size].height;
  const spinnerRing = `absolute inset-[-1000%] motion-safe:animate-[spin_2s_linear_infinite] ${GRADIENTS[gradient]}`;
  const innerBase =
    `inline-flex w-full items-center justify-center rounded-lg ${SIZE_MAP[size].px} ${SIZE_MAP[size].text} ${SIZE_MAP[size].gap} ` +
    `bg-background/80 text-foreground backdrop-blur-xl`;
  const stateCls = [
    disabled || loading ? "opacity-60 cursor-not-allowed" : "hover:opacity-95",
    iconOnly ? "!px-0 w-auto min-w-0" : "",
  ].filter(Boolean).join(" ");

  const content = (
    <>
      <span className={spinnerRing} aria-hidden />
      <span className={[innerBase, sizeCls, iconOnly ? "aspect-square !px-0" : ""].join(" ")}>
        {loading ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" aria-hidden>
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4A4 4 0 0 0 8 12H4z" />
          </svg>
        ) : (
          <>
            {position === "left" && icon}
            {!iconOnly && translatedTitle}
            {position === "right" && icon}
          </>
        )}
      </span>
    </>
  );

  const outerCls = [outerBase, widthCls, className, stateCls].join(" ");

  if ("href" in props && props.href) {
    const isExternal = /^https?:\/\//.test(props.href);
    return (
      <a
        href={props.href}
        className={outerCls}
        aria-label={computedAriaLabel}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        onClick={disabled || loading ? (e) => e.preventDefault() : undefined}
      >
        {content}
      </a>
    );
  }

  if ("to" in props && props.to) {
    return (
      <Link
        to={props.to}
        className={outerCls}
        aria-label={computedAriaLabel}
        onClick={disabled || loading ? (e) => e.preventDefault() : undefined}
      >
        {content}
      </Link>
    );
  }

  const btnType = "type" in props && props.type ? props.type : "button";
  return (
    <button
      type={btnType}
      className={outerCls}
      aria-label={computedAriaLabel}
      onClick={disabled || loading ? undefined : (props as any).onClick}
      disabled={disabled || loading}
    >
      {content}
    </button>
  );
}
