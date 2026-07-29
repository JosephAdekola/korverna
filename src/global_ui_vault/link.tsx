"use client";

import React from "react";
import NextLink, { LinkProps } from "next/link";
import { cn } from "../utils/tailwind_merge";

type LinkVariant =
  | "primary"
  | "secondary"
  | "muted"
  | "danger"
  | "success";

type LinkSize = "sm" | "md" | "lg";

interface CustomLinkProps
  extends Omit<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      "href"
    >,
    LinkProps {
  children?: React.ReactNode;

  variant?: LinkVariant;
  size?: LinkSize;

  underline?: "none" | "hover" | "always";

  fullWidth?: boolean;

  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Link({
  href,

  children,

  variant = "primary",
  size = "md",

  underline = "hover",

  fullWidth = false,

  leftIcon,
  rightIcon,

  className,

  ...props
}: CustomLinkProps) {
  const variants: Record<LinkVariant, string> = {
    primary: `
      text-primary
      hover:text-primary-hover
    `,

    secondary: `
      text-foreground
      hover:text-primary
    `,

    muted: `
      text-foreground-muted
      hover:text-foreground
    `,

    success: `
      text-success
      hover:brightness-110
    `,

    danger: `
      text-danger
      hover:brightness-110
    `,
  };

  const sizes: Record<LinkSize, string> = {
    sm: "text-sm",

    md: "text-base",

    lg: "text-lg",
  };

  const underlines = {
    none: "no-underline",

    hover: "no-underline hover:underline",

    always: "underline",
  };

  return (
    <NextLink
      href={href}
      className={cn(
        "inline-flex items-center gap-2",

        "font-medium",

        "transition-all duration-200 ease-out",

        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-ring",
        "focus-visible:ring-offset-2",

        variants[variant],

        sizes[size],

        underlines[underline],

        fullWidth && "w-full",

        className
      )}
      {...props}
    >
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
    </NextLink>
  );
}