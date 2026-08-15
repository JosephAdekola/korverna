"use client";

import { cn } from "@/src/utils/tailwind_merge";
import "react-phone-number-input/style.css";

import React from "react";
import PhoneInputLib, {
    Value,
    isValidPhoneNumber,
} from "react-phone-number-input";

export interface PhoneInputProps
    extends Omit<
        React.InputHTMLAttributes<HTMLInputElement>,
        "size" | "value" | "onChange"
    > {
    label?: React.ReactNode;
    required?: boolean;

    helperText?: React.ReactNode;
    error?: string;
    success?: string;

    loading?: boolean;

    value?: Value;
    onChange?: (value: Value) => void;

    defaultCountry?: "NG" | "US" | "GB" | "CA";

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

const PhoneInput = ({
    label,
    required,

    helperText,
    error,
    success,

    loading = false,
    disabled,

    value,
    onChange,

    defaultCountry = "NG",

    size = "sm",

    containerClassName,
    labelClassName,
    inputClassName,

    ...props
}: PhoneInputProps) => {
    const isValid =
        !value || isValidPhoneNumber(value);

    const message =
        error ||
        (value && !isValid
            ? "Invalid phone number"
            : success || helperText);

    const messageClass = error
        ? "text-danger!"
        : value && !isValid
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
                <PhoneInputLib
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry={defaultCountry}
                    value={value}
                    onChange={val=>onChange && onChange(val ?? "")}
                    disabled={disabled || loading}
                    aria-invalid={
                        !!error || (!!value && !isValid)
                    }
                    {...props}
                    className={cn(
                        sizes[size],

                        "w-full rounded-[var(--radius-md)]",
                        "border border-input",
                        "bg-surface",

                        "px-4",

                        "text-foreground",

                        "transition-all",
                        "duration-[var(--duration-normal)]",
                        "ease-[var(--ease-default)]",

                        "focus-within:border-primary",
                        "focus-within:ring-4",
                        "focus-within:ring-primary/15",
                        "focus-within:shadow-[var(--shadow-xs)]",

                        error &&
                            "border-danger focus-within:border-danger focus-within:ring-danger/15",

                        value &&
                            !isValid &&
                            !error &&
                            "border-danger focus-within:border-danger focus-within:ring-danger/15",

                        disabled &&
                            "cursor-not-allowed opacity-60",

                        loading &&
                            "cursor-wait",

                        inputClassName
                    )}
                />

                {loading && (
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <i className="pi pi-spin pi-spinner text-foreground-muted" />
                    </div>
                )}
            </div>

            <style jsx global>{`
                .PhoneInput {
                    display: flex;
                    align-items: center;
                }

                .PhoneInputCountry {
                    margin-right: 0.5rem;
                }

                .PhoneInputCountrySelect {
                    background: transparent;
                    border: none;
                    outline: none;
                    color: inherit;
                }

                .PhoneInputInput {
                    width: 100%;
                    min-width: 0;
                    height: 100%;
                    border: none;
                    outline: none;
                    background: transparent;
                    color: inherit;
                    font: inherit;
                }

                .PhoneInputInput::placeholder {
                    color: var(--color-foreground-muted);
                }

                .PhoneInputInput:disabled {
                    cursor: not-allowed;
                }
            `}</style>

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
};

export default PhoneInput;
