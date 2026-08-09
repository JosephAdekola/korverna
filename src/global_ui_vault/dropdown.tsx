"use client";

import React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/src/utils/tailwind_merge";

export interface SelectOption<T = string> {
    label: string;
    value: T;
}

export interface SelectProps<T = string> {
    label?: React.ReactNode;
    required?: boolean;

    helperText?: React.ReactNode;
    error?: string;
    success?: string;

    loading?: boolean;

    options: SelectOption<T>[];

    value?: T;
    placeholder?: string;

    disabled?: boolean;

    size?: "sm" | "md" | "lg";

    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;

    onChange?: (value: T) => void;
}

const sizes = {
    sm: "h-11 text-sm",
    md: "h-12 text-base",
    lg: "h-14 text-lg",
};

function Select<T = string>({
    label,
    required,

    helperText,
    error,
    success,

    loading = false,

    options,

    value,
    placeholder = "Select an option",

    disabled = false,

    size = "sm",

    containerClassName,
    labelClassName,
    inputClassName,

    onChange,
}: SelectProps<T>) {
    const ref = React.useRef<HTMLDivElement>(null);

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !ref.current.contains(
                    event.target as Node
                )
            ) {
                setOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    const message =
        error || success || helperText;

    const messageClass = error
        ? "text-danger!"
        : success
            ? "text-success!"
            : "text-foreground-secondary!";

    const isDisabled = disabled || loading;

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

            <div
                ref={ref}
                className="relative"
            >
                <button
                    type="button"
                    disabled={isDisabled}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-invalid={!!error}
                    onClick={() =>
                        setOpen((prev) => !prev)
                    }
                    className={cn(
                        sizes[size],

                        "flex w-full items-center justify-between",
                        "rounded-[var(--radius-md)]",
                        "border border-input",
                        "bg-surface",
                        "px-4",

                        "text-left text-foreground",

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
                >
                    <span
                        className={cn(
                            "truncate",
                            !selectedOption &&
                                "text-foreground-muted"
                        )}
                    >
                        {selectedOption?.label ??
                            placeholder}
                    </span>

                    {loading ? (
                        <i className="pi pi-spin pi-spinner shrink-0 text-foreground-muted" />
                    ) : (
                        <ChevronDown
                            size={18}
                            className={cn(
                                "shrink-0 text-foreground-muted",
                                "transition-transform",
                                "duration-[var(--duration-fast)]",
                                open &&
                                    "rotate-180"
                            )}
                        />
                    )}
                </button>

                {open && !isDisabled && (
                    <div
                        role="listbox"
                        className={cn(
                            "absolute left-0 top-full z-50 mt-2 w-full",
                            "max-h-60 overflow-y-auto",
                            "rounded-[var(--radius-md)]",
                            "border border-input",
                            "bg-surface",
                            "p-1",
                            "shadow-[var(--shadow-md)]"
                        )}
                    >
                        {options.length > 0 ? (
                            options.map(
                                (option, index) => {
                                    const isSelected =
                                        option.value ===
                                        value;

                                    return (
                                        <button
                                            key={index}
                                            type="button"
                                            role="option"
                                            aria-selected={
                                                isSelected
                                            }
                                            onClick={() => {
                                                onChange?.(
                                                    option.value
                                                );
                                                setOpen(false);
                                            }}
                                            className={cn(
                                                "flex w-full items-center justify-between",
                                                "rounded-[var(--radius-sm)]",
                                                "px-3 py-2.5",
                                                "text-left text-sm",
                                                "text-foreground",

                                                "transition-colors",
                                                "duration-[var(--duration-fast)]",

                                                "hover:bg-surface-secondary",

                                                isSelected &&
                                                    "bg-surface-secondary"
                                            )}
                                        >
                                            <span className="truncate">
                                                {
                                                    option.label
                                                }
                                            </span>

                                            {isSelected && (
                                                <Check
                                                    size={
                                                        16
                                                    }
                                                    className="ml-3 shrink-0 text-primary"
                                                />
                                            )}
                                        </button>
                                    );
                                }
                            )
                        ) : (
                            <div className="px-3 py-3 text-sm text-foreground-muted">
                                No options available
                            </div>
                        )}
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

export default Select;