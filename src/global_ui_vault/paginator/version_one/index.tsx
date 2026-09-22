"use client";

import React from "react";
import { cn } from "@/utils/helpers/tailwind_merge";
import { PaginationProps } from "./data/PaginationProps";
import Pagination from "./components/pagination";

export default function PaginationV1({
    currentPage,
    totalPages,
    onPageChange,

    siblingCount = 1,

    showFirstLast = false,
    showPreviousNext = true,

    showContainer = true,

    className,
    containerClassName,
    buttonClassName,
    activeClassName,

    size = "md",

    disabled = false,
}: PaginationProps) {

    if (totalPages <= 1) {
        return null;
    }

    if (!showContainer) {
        return <Pagination
            buttonClassName={buttonClassName}
            className={className}
            currentPage={currentPage}
            disabled={disabled}
            onPageChange={onPageChange}
            showFirstLast={showFirstLast}
            showPreviousNext={showPreviousNext}
            siblingCount={siblingCount}
            size={size}
            totalPages={totalPages}
            activeClassName={activeClassName} />
    }

    return (
        <div
            className={cn(
                "inline-flex",
                "items-center",
                "rounded-[var(--radius-md)]",
                "border",
                "border-border",
                "bg-card",
                "px-2",
                "py-1",
                "shadow-[var(--shadow-xs)]",
                containerClassName
            )}
        >
            <Pagination
                buttonClassName={buttonClassName}
                className={className}
                currentPage={currentPage}
                disabled={disabled}
                onPageChange={onPageChange}
                showFirstLast={showFirstLast}
                showPreviousNext={showPreviousNext}
                siblingCount={siblingCount}
                size={size}
                totalPages={totalPages}
                activeClassName={activeClassName} />
        </div>
    );
}