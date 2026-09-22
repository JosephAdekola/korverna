
export type VersionOnePaginationSizesProps = {
    button: string;
    icon: string;
    gap: string
}

export type VersionOneSizesProps = {
    sm: VersionOnePaginationSizesProps;
    md: VersionOnePaginationSizesProps;
    lg: VersionOnePaginationSizesProps
}

export const sizes: VersionOneSizesProps = {
    sm: {
        button: "h-7 min-w-7 text-xs",
        icon: "h-3.5 w-3.5",
        gap: "gap-0.5",
    },
    md: {
        button: "h-8 min-w-8 text-sm",
        icon: "h-4 w-4",
        gap: "gap-1",
    },
    lg: {
        button: "h-10 min-w-10 text-sm",
        icon: "h-5 w-5",
        gap: "gap-1.5",
    },
};