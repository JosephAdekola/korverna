"use client";

import React, { DragEvent } from "react";
import { CloudUpload, LoaderCircle } from "lucide-react";
import { cn } from "@/utils/helpers/tailwind_merge";
import { sizes } from "./fileUpload.types";

interface FileUploadEmptyStateProps {
    size: "sm" | "md" | "lg";
    loading: boolean;
    disabled: boolean;
    isDragging: boolean;
    accept?: string;
    maxFiles?: number;
    uploadClassName?: string;

    openFilePicker: () => void;
    setIsDragging: React.Dispatch<
        React.SetStateAction<boolean>
    >;
    handleDrop: (
        event: DragEvent<HTMLDivElement>
    ) => void;
}

export default function FileUploadEmptyState({
    size,
    loading,
    disabled,
    isDragging,
    accept,
    maxFiles,
    uploadClassName,
    openFilePicker,
    setIsDragging,
    handleDrop,
}: FileUploadEmptyStateProps) {
    return (
        <div
            role="button"
            tabIndex={disabled ? -1 : 0}
            onClick={openFilePicker}
            onKeyDown={(event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();
                    openFilePicker();
                }
            }}
            onDragOver={(event) => {
                event.preventDefault();

                if (!disabled) {
                    setIsDragging(true);
                }
            }}
            onDragLeave={() => {
                setIsDragging(false);
            }}
            onDrop={handleDrop}
            className={cn(
                sizes[size].upload,

                "w-full",
                "rounded-[var(--radius-md)]",
                "border-2 border-dashed",

                "flex flex-col",
                "items-center",
                "justify-center",
                "gap-3",

                "px-6",
                "py-8",

                "bg-surface",

                "text-center",

                "cursor-pointer",

                "transition-all",
                "duration-[var(--duration-normal)]",
                "ease-[var(--ease-default)]",

                isDragging
                    ? "border-primary bg-primary/5 scale-[1.01]"
                    : "border-input hover:border-primary/60 hover:bg-primary/[0.02]",

                "focus:outline-none",
                "focus:ring-4",
                "focus:ring-primary/15",

                disabled &&
                    "cursor-not-allowed opacity-60",

                uploadClassName
            )}
        >
            <div
                className={cn(
                    "flex items-center justify-center",
                    "h-12 w-12",
                    "rounded-full",
                    "bg-primary/10",
                    "text-primary",
                    "transition-transform",
                    "duration-[var(--duration-normal)]",
                    isDragging && "scale-110"
                )}
            >
                {loading ? (
                    <LoaderCircle
                        className={cn(
                            "animate-spin",
                            sizes[size].icon
                        )}
                    />
                ) : (
                    <CloudUpload
                        className={cn(
                            sizes[size].icon
                        )}
                    />
                )}
            </div>

            <div className="flex flex-col gap-1">
                <span
                    className={cn(
                        "font-medium text-foreground",
                        sizes[size].text
                    )}
                >
                    {loading
                        ? "Processing files..."
                        : "Click to upload or drag and drop"}
                </span>

                <span className="text-xs text-foreground-muted">
                    {accept
                        ? accept
                        : "Any file type"}
                </span>

                {maxFiles && (
                    <span className="text-xs text-foreground-muted">
                        Maximum {maxFiles}{" "}
                        {maxFiles === 1
                            ? "file"
                            : "files"}
                    </span>
                )}
            </div>
        </div>
    );
}