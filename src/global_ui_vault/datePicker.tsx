"use client";

import React, { forwardRef } from "react";
import { CalendarDays } from "lucide-react";
import { cn } from "@/src/utils/tailwind_merge";

export interface DatePickerProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "type" | "value" | "onChange" | "size"
    > {
    label?: React.ReactNode;
    required?: boolean;

    helperText?: React.ReactNode;
    error?: string;
    success?: string;

    loading?: boolean;

    value?: string;
    placeholder?: string;

    min?: string;
    max?: string;

    size?: "sm" | "md" | "lg";

    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;

    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const sizes = {
    sm: "h-11 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
};

const DatePicker = forwardRef<
    HTMLInputElement,
    DatePickerProps
>(
    (
        {
            label,
            required,

            helperText,
            error,
            success,

            loading = false,

            value,
            placeholder,

            disabled,

            min,
            max,

            size = "sm",

            containerClassName,
            labelClassName,
            inputClassName,

            onChange,
            onFocus,
            onBlur,

            ...props
        },
        ref
    ) => {
        const message =
            error || success || helperText;

        const messageClass = error
            ? "text-danger!"
            : success
                ? "text-success!"
                : "text-foreground-secondary!";

        const isDisabled =
            disabled || loading;

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
                    <input
                        ref={ref}
                        type="date"
                        value={value ?? ""}
                        placeholder={placeholder}
                        disabled={isDisabled}
                        required={required}
                        min={min}
                        max={max}
                        aria-invalid={!!error}
                        onChange={(e) =>
                            onChange?.(
                                e.target.value
                            )
                        }
                        onFocus={onFocus}
                        onBlur={onBlur}
                        className={cn(
                            sizes[size],

                            "w-full rounded-[var(--radius-md)]",
                            "border border-input",
                            "bg-surface",

                            "px-4 pr-11",

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

                            success &&
                                !error &&
                                "border-success focus:border-success focus:ring-success/15",

                            isDisabled &&
                                "cursor-not-allowed opacity-60",

                            loading &&
                                "cursor-wait",

                            inputClassName
                        )}
                        {...props}
                    />

                    {loading ? (
                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                            <i className="pi pi-spin pi-spinner text-foreground-muted" />
                        </div>
                    ) : (
                        <CalendarDays
                            size={18}
                            className={cn(
                                "pointer-events-none absolute right-4 top-1/2 -translate-y-1/2",
                                "text-foreground-muted"
                            )}
                        />
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

DatePicker.displayName = "DatePicker";

export default DatePicker;