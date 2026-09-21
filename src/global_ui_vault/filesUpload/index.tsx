"use client";

import { cn } from "@/utils/helpers/tailwind_merge";
import React, { forwardRef } from "react";

import {
    FileUploadProps,
} from "./fileUpload.types";

import FileUploadEmptyState from "./FileUploadEmptyState";
import FileUploadPreview from "./FileUploadPreview";
import useFileUpload from "./useFileUpload";

const FileUpload = forwardRef<
    HTMLInputElement,
    FileUploadProps
>(
    (
        {
            label,
            required,

            helperText,
            error,
            success,

            loading = false,
            disabled = false,

            accept,
            maxFiles,
            multiple = true,

            onChange,

            size = "md",

            containerClassName,
            labelClassName,
            uploadClassName,
        },
        ref
    ) => {
        const {
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
        } = useFileUpload({
            loading,
            disabled,
            accept,
            maxFiles,
            multiple,
            onChange,
        });

        const message =
            error || success || helperText;

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

                <input
                    ref={(node) => {
                        inputRef.current = node;
                        setInputRef(node, ref);
                    }}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    disabled={resolvedDisabled}
                    onChange={handleFileChange}
                    className="hidden"
                />

                {files.length === 0 ? (
                    <FileUploadEmptyState
                        size={size}
                        loading={loading}
                        disabled={resolvedDisabled}
                        isDragging={isDragging}
                        accept={accept}
                        maxFiles={maxFiles}
                        uploadClassName={
                            uploadClassName
                        }
                        openFilePicker={
                            openFilePicker
                        }
                        setIsDragging={
                            setIsDragging
                        }
                        handleDrop={handleDrop}
                    />
                ) : (
                    <FileUploadPreview
                        files={files}
                        disabled={resolvedDisabled}
                        canAddMore={canAddMore}
                        openFilePicker={
                            openFilePicker
                        }
                        removeFile={removeFile}
                        uploadClassName={
                            uploadClassName
                        }
                    />
                )}

                {message && (
                    <p
                        className={cn(
                            "text-xs!",
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

FileUpload.displayName = "FileUpload";

export default FileUpload;
