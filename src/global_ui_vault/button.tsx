"use client";

import React from "react";
import { cn } from "../utils/tailwind_merge";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "success"
  | "danger";

type ButtonSize = "sm" | "md" | "lg" | "icon";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;

  variant?: ButtonVariant;
  size?: ButtonSize;

  loading?: boolean;
  loadingText?: string;

  fullWidth?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",

  loading = false,
  loadingText = "Please wait...",

  disabled = false,

  fullWidth = false,

  leftIcon,
  rightIcon,

  className,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  const variants: Record<ButtonVariant, string> = {
    primary: `
      bg-primary
      text-primary-foreground
      hover:bg-primary-hover
      shadow-xs
    `,

    secondary: `
      bg-surface
      text-foreground
      border
      border-border
      hover:bg-surface-secondary
    `,

    outline: `
      bg-transparent
      border
      border-border
      text-foreground
      hover:bg-surface
    `,

    ghost: `
      bg-transparent
      text-foreground
    `,

    success: `
      bg-success
      text-success-foreground
      hover:brightness-110
    `,

    danger: `
      bg-danger
      text-danger-foreground
      hover:brightness-110
    `,
  };

  const sizes: Record<ButtonSize, string> = {
    sm: "h-9 px-4 text-sm",

    md: "h-11 px-5 text-sm",

    lg: "h-12 px-6 text-base",

    icon: "h-11 w-11 p-0",
  };

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2",

        "rounded-sm",

        "font-medium",

        "transition-all duration-200 ease-out",

        "select-none",

        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        "active:scale-[0.98]",

        variants[variant],

        sizes[size],

        fullWidth && "w-full",

        isDisabled &&
          "cursor-not-allowed opacity-60 pointer-events-none",

        className
      )}
      {...props}
    >
      {loading ? (
        <>
          <i className="pi pi-spin pi-spinner text-base" />
          <span>{loadingText}</span>
        </>
      ) : (
        <>
          {leftIcon && (
            <span className="flex shrink-0 items-center">
              {leftIcon}
            </span>
          )}

          {children && <span>{children}</span>}

          {rightIcon && (
            <span className="flex shrink-0 items-center">
              {rightIcon}
            </span>
          )}
        </>
      )}
    </button>
  );
}