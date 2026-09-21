"use client";

import React from "react";
import { FileMinus, Plus } from "lucide-react";
import { cn } from "@/utils/helpers/tailwind_merge";
import {
    UploadedFile,
} from "./fileUpload.types";
import {
    formatFileSize,
    getFileIcon,
} from "./fileUpload.helpers";

interface FileUploadPreviewProps {
    files: UploadedFile[];
    disabled: boolean;
    canAddMore: boolean;
    openFilePicker: () => void;
    removeFile: (id: string) => void;
    uploadClassName?: string;
}

export default function FileUploadPreview({
    files,
    disabled,
    canAddMore,
    openFilePicker,
    removeFile,
    uploadClassName,
}: FileUploadPreviewProps) {
    return (
        <div
            className={cn(
                "grid gap-3",

                "grid-cols-2",
                "sm:grid-cols-3",
                "md:grid-cols-4",
                "lg:grid-cols-5",

                uploadClassName
            )}
        >
            {files.map((item) => {
                const isImage =
                    item.file.type.startsWith(
                        "image/"
                    );

                return (
                    <div
                        key={item.id}
                        className="
                            group
                            relative
                            aspect-square
                            overflow-hidden
                            rounded-[var(--radius-md)]
                            border
                            border-border
                            bg-surface
                            shadow-[var(--shadow-xs)]
                            transition-all
                            duration-[var(--duration-normal)]
                            ease-[var(--ease-default)]
                            hover:-translate-y-0.5
                            hover:shadow-[var(--shadow-sm)]
                        "
                    >
                        {isImage ? (
                            <img
                                src={item.blobUrl}
                                alt={item.file.name}
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-[var(--duration-slow)]
                                    group-hover:scale-105
                                "
                            />
                        ) : (
                            <div className="
                                flex
                                h-full
                                w-full
                                flex-col
                                items-center
                                justify-center
                                gap-3
                                p-4
                                bg-surface
                            ">
                                <i
                                    className={cn(
                                        getFileIcon(
                                            item.file
                                        ),
                                        "text-3xl text-primary"
                                    )}
                                />

                                <div className="w-full text-center">
                                    <p className="
                                        truncate
                                        text-xs!
                                        font-medium!
                                        text-foreground!
                                    ">
                                        {item.file.name}
                                    </p>

                                    <span className="
                                        text-[11px]
                                        text-foreground-muted
                                    ">
                                        {formatFileSize(
                                            item.file.size
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}

                        {isImage && (
                            <div className="
                                pointer-events-none
                                absolute
                                inset-0
                                bg-black/0
                                transition-colors
                                duration-[var(--duration-normal)]
                                group-hover:bg-black/10
                            " />
                        )}

                        <button
                            type="button"
                            aria-label={`Remove ${item.file.name}`}
                            disabled={disabled}
                            onClick={() =>
                                removeFile(item.id)
                            }
                            className="
                                absolute
                                right-2
                                top-2
                                z-10
                                flex
                                h-7
                                w-7
                                items-center
                                justify-center
                                rounded-full
                                bg-danger
                                text-danger-foreground
                                shadow-[var(--shadow-sm)]
                                opacity-0
                                scale-75
                                transition-all
                                duration-[var(--duration-fast)]
                                ease-[var(--ease-out)]
                                hover:bg-danger/90
                                group-hover:opacity-100
                                group-hover:scale-100
                                focus:opacity-100
                                focus:scale-100
                                focus:outline-none
                                focus:ring-2
                                focus:ring-danger
                                focus:ring-offset-2
                            "
                        >
                            <FileMinus className="h-3 w-3" />
                        </button>
                    </div>
                );
            })}

            {canAddMore && (
                <button
                    type="button"
                    disabled={disabled}
                    onClick={openFilePicker}
                    className="
                        aspect-square
                        rounded-[var(--radius-md)]
                        border-2
                        border-dashed
                        border-input
                        bg-surface
                        flex
                        flex-col
                        items-center
                        justify-center
                        gap-2
                        text-foreground-muted
                        transition-all
                        duration-[var(--duration-normal)]
                        ease-[var(--ease-default)]
                        hover:border-primary
                        hover:bg-primary/5
                        hover:text-primary
                        hover:scale-[1.01]
                        focus:outline-none
                        focus:ring-4
                        focus:ring-primary/15
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                    "
                >
                    <span className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-primary/10
                        text-primary
                    ">
                        <Plus className="h-4 w-4" />
                    </span>

                    <span className="text-xs font-medium">
                        Add more
                    </span>
                </button>
            )}
        </div>
    );
}