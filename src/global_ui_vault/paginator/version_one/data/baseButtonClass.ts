import { cn } from "@/utils/helpers/tailwind_merge";
import { VersionOnePaginationSizesProps } from "./sizes";

export function useBaseButtonClassName ({
    sizeConfig,
    buttonClassName
}: {
    sizeConfig: VersionOnePaginationSizesProps
    buttonClassName?: string;
}) {

    const baseButtonClass = cn(
        "inline-flex",
        "items-center",
        "justify-center",
        "shrink-0",

        sizeConfig.button,

        "rounded-[var(--radius-sm)]",

        "font-medium",
        "text-foreground-secondary",

        "transition-colors",
        "duration-[var(--duration-fast)]",
        "ease-[var(--ease-default)]",

        "hover:bg-surface",
        "hover:text-foreground",

        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-primary/20",

        "disabled:pointer-events-none",
        "disabled:opacity-40",

        buttonClassName
    );

    return {baseButtonClass}

}