import { cn } from "@/src/utils/tailwind_merge";
import React, { forwardRef, useState } from "react";

export interface ShortTextProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: React.ReactNode;
  required?: boolean;
  helperText?: React.ReactNode;
  error?: string;
  success?: string;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: "sm" | "md" | "lg";
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const sizes = {
  sm: "h-11 text-sm",
  md: "h-12 text-base",
  lg: "h-14 text-lg",
};

const ShortText = forwardRef<HTMLInputElement, ShortTextProps>(
  (
    {
      label,
      required,
      helperText,
      error,
      success,
      loading = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "text",
      size = "sm",
      containerClassName,
      labelClassName,
      inputClassName,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const resolvedType =
      isPassword && showPassword ? "text" : type;

    const message = error || success || helperText;

    const messageClass = error
      ? "text-danger"
      : success
        ? "text-success"
        : "text-foreground-secondary";

    return (
      <div
        className={cn(
          "flex flex-col gap-2",
          containerClassName
        )}
      >
        {label && (
          <label
            className={cn(
              "text-sm font-medium text-foreground",
              labelClassName
            )}
          >
            {label}

            {required && (
              <span className="ml-1 text-danger">*</span>
            )}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-foreground-muted">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={resolvedType}
            disabled={disabled || loading}
            aria-invalid={!!error}
            className={cn(
              sizes[size],

              "w-full rounded-[var(--radius-md)]",
              "border border-input",
              "bg-surface",

              "px-4",

              "text-foreground",
              "placeholder:text-foreground-muted",

              "transition-all",
              "duration-[var(--duration-normal)]",
              "ease-[var(--ease-default)]",

              "focus:border-primary",
              "focus:ring-4",
              "focus:ring-primary/15",
              "focus:shadow-[var(--shadow-xs)]",
              "focus:outline-none",

              error &&
                "border-danger focus:border-danger focus:ring-danger/15",

              disabled &&
                "cursor-not-allowed opacity-60",

              loading &&
                "cursor-wait",

              leftIcon && "pl-11",

              (rightIcon || loading || isPassword) &&
                "pr-11",

              inputClassName
            )}
            {...props}
          />

          {loading ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-primary">
              <i className="pi pi-spin pi-spinner" />
            </div>
          ) : isPassword ? (
            <button
              type="button"
              tabIndex={-1}
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted transition-colors duration-[var(--duration-fast)] hover:text-primary"
            >
              <i
                className={`pi ${
                  showPassword
                    ? "pi-eye-slash"
                    : "pi-eye"
                }`}
              />
            </button>
          ) : rightIcon ? (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted">
              {rightIcon}
            </div>
          ) : null}
        </div>

        {message && (
          <p
            className={cn(
              "text-sm",
              messageClass
            )}
          >
            {message}
          </p>
        )}
      </div>
    );
  }
);

ShortText.displayName = "ShortText";

export default ShortText;