"use client";

import { cn } from "@/src/utils/tailwind_merge";
import React, { forwardRef } from "react";

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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
    sm: "min-h-24 text-sm",
    md: "min-h-32 text-base",
    lg: "min-h-40 text-lg",
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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
            size = "sm",

            containerClassName,
            labelClassName,
            inputClassName,

            ...props
        },
        ref
    ) => {
        const message = error || success || helperText;

        const messageClass = error
            ? "text-danger!"
            : success
                ? "text-success!"
                : "text-foreground-secondary!";

        return (
            <div
                className={cn(
                    "relative flex flex-col gap-2",
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
                            <span className="ml-1 text-danger">
                                *
                            </span>
                        )}
                    </label>
                )}

                <div className="relative">
                    {leftIcon && (
                        <div className="pointer-events-none absolute left-4 top-4 text-foreground-muted">
                            {leftIcon}
                        </div>
                    )}

                    <textarea
                        ref={ref}
                        disabled={disabled || loading}
                        aria-invalid={!!error}
                        className={cn(
                            sizes[size],

                            "w-full resize-y rounded-[var(--radius-md)]",
                            "border border-input",
                            "bg-surface",

                            "px-4 py-3",

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

                            rightIcon && "pr-11",

                            inputClassName
                        )}
                        {...props}
                    />

                    {loading && (
                        <div className="pointer-events-none absolute right-4 top-4">
                            <i className="pi pi-spin pi-spinner text-foreground-muted" />
                        </div>
                    )}

                    {!loading && rightIcon && (
                        <div className="pointer-events-none absolute right-4 top-4 text-foreground-muted">
                            {rightIcon}
                        </div>
                    )}
                </div>

                {message && (
                    <p
                        className={cn(
                            "absolute top-full w-full pl-5! text-xs!",
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

Textarea.displayName = "Textarea";

export default Textarea;