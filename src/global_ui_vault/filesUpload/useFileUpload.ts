"use client";

import { cn } from "@/utils/helpers/tailwind_merge";
import React, {
    ChangeEvent,
    DragEvent,
    useEffect,
    useRef,
    useState,
} from "react";

import { UploadedFile } from "./fileUpload.types";

interface UseFileUploadProps {
    loading: boolean;
    disabled: boolean;
    accept?: string;
    maxFiles?: number;
    multiple: boolean;
    onChange?: (files: File[]) => void;
}

export default function useFileUpload({
    loading,
    disabled,
    accept,
    maxFiles,
    multiple,
    onChange,
}: UseFileUploadProps) {
    const inputRef =
        useRef<HTMLInputElement | null>(null);

    const [files, setFiles] = useState<UploadedFile[]>(
        []
    );

    const [isDragging, setIsDragging] =
        useState(false);

    const resolvedDisabled = disabled || loading;

    const setInputRef = (
        node: HTMLInputElement | null,
        ref?: React.ForwardedRef<HTMLInputElement>
    ) => {
        inputRef.current = node;

        if (typeof ref === "function") {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    };

    useEffect(() => {
        return () => {
            files.forEach((item) => {
                URL.revokeObjectURL(item.blobUrl);
            });
        };
    }, [files]);

    const openFilePicker = () => {
        if (resolvedDisabled) return;

        inputRef.current?.click();
    };

    const processFiles = (
        selectedFiles: File[]
    ) => {
        if (
            !selectedFiles.length ||
            resolvedDisabled
        ) {
            return;
        }

        let incomingFiles = multiple
            ? selectedFiles
            : selectedFiles.slice(0, 1);

        if (maxFiles !== undefined) {
            const remainingSlots = Math.max(
                maxFiles - files.length,
                0
            );

            incomingFiles = incomingFiles.slice(
                0,
                remainingSlots
            );
        }

        if (!incomingFiles.length) return;

        const newFiles: UploadedFile[] =
            incomingFiles.map((file) => ({
                id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
                file,
                blobUrl:
                    URL.createObjectURL(file),
            }));

        const updatedFiles = multiple
            ? [...files, ...newFiles]
            : newFiles;

        setFiles(updatedFiles);

        onChange?.(
            updatedFiles.map(
                (item) => item.file
            )
        );
    };

    const handleFileChange = (
        event: ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFiles = Array.from(
            event.target.files ?? []
        );

        processFiles(selectedFiles);

        event.target.value = "";
    };

    const handleDrop = (
        event: DragEvent<HTMLDivElement>
    ) => {
        event.preventDefault();
        event.stopPropagation();

        setIsDragging(false);

        if (resolvedDisabled) return;

        const droppedFiles = Array.from(
            event.dataTransfer.files
        );

        processFiles(droppedFiles);
    };

    const removeFile = (id: string) => {
        setFiles((currentFiles) => {
            const fileToRemove =
                currentFiles.find(
                    (item) => item.id === id
                );

            if (fileToRemove) {
                URL.revokeObjectURL(
                    fileToRemove.blobUrl
                );
            }

            const updatedFiles =
                currentFiles.filter(
                    (item) => item.id !== id
                );

            onChange?.(
                updatedFiles.map(
                    (item) => item.file
                )
            );

            return updatedFiles;
        });
    };

    const canAddMore =
        !maxFiles ||
        files.length < maxFiles;

    return {
        inputRef,
        setInputRef,
        files,
        isDragging,
        setIsDragging,
        resolvedDisabled,
        openFilePicker,
        handleFileChange,
        handleDrop,
        removeFile,
        canAddMore,
    };
}