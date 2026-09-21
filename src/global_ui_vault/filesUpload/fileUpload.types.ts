import React, {
    Dispatch,
    SetStateAction,
} from "react";

export interface UploadedFile {
    id: string;
    file: File;
    blobUrl: string;
}

export interface FileUploadProps {
    label?: React.ReactNode;
    required?: boolean;

    helperText?: React.ReactNode;
    error?: string;
    success?: string;

    loading?: boolean;
    disabled?: boolean;

    /**
     * File types accepted by the browser.
     *
     * Example:
     * "image/*"
     * ".pdf,.doc,.docx"
     * "image/*,.pdf"
     *
     * Defaults to all file types.
     */
    accept?: string;

    /**
     * Maximum number of files allowed.
     *
     * Defaults to unlimited.
     */
    maxFiles?: number;

    /**
     * Allows multiple files to be selected at once.
     *
     * Defaults to true.
     */
    multiple?: boolean;

    /**
     * Files selected by the user.
     */
    onChange?: (files: File[]) => void;

    size?: "sm" | "md" | "lg";

    containerClassName?: string;
    labelClassName?: string;
    uploadClassName?: string;
}

export const sizes = {
    sm: {
        upload: "min-h-32",
        icon: "text-2xl",
        text: "text-sm",
    },
    md: {
        upload: "min-h-40",
        icon: "text-3xl",
        text: "text-sm",
    },
    lg: {
        upload: "min-h-48",
        icon: "text-4xl",
        text: "text-base",
    },
};