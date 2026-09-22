import React from 'react'
import usePaginationPages from '../data/pages';
import { sizes, VersionOneSizesProps } from '../data/sizes';
import { useBaseButtonClassName } from '../data/baseButtonClass';
import { cn } from '@/utils/helpers/tailwind_merge';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';


export default function Pagination({
    currentPage,
    siblingCount,
    totalPages,
    size,
    disabled,
    onPageChange,
    buttonClassName,
    className,
    showFirstLast,
    showPreviousNext,
    activeClassName,
}: {
    currentPage: number;
    siblingCount: number;
    totalPages: number;
    size: keyof(VersionOneSizesProps);
    disabled: boolean;
    onPageChange: (page: number) => void;
    buttonClassName?: string;
    className?: string;
    showFirstLast: boolean;
    showPreviousNext: boolean;
    activeClassName?: string;
}) {

    const DOTS = "...";

    const { pages } = usePaginationPages({
        currentPage, DOTS, siblingCount, totalPages
    })

    const sizeConfig = sizes[size];

    const canGoPrevious =
        currentPage > 1 && !disabled;

    const canGoNext =
        currentPage < totalPages && !disabled;

    const goToPage = (page: number) => {

        if (disabled) return;

        if (page < 1 || page > totalPages) {
            return;
        }

        if (page === currentPage) {
            return;
        }

        onPageChange(page);
    };

    const { baseButtonClass } = useBaseButtonClassName({
        sizeConfig, buttonClassName
    })

    return (
        <div
            className={cn(
                "flex items-center",
                sizeConfig.gap,
                className
            )}
            aria-label="Pagination"
        >

            {showFirstLast && (
                <button
                    type="button"
                    aria-label="Go to first page"
                    disabled={!canGoPrevious}
                    onClick={() => goToPage(1)}
                    className={baseButtonClass}
                >
                    <ChevronsLeft
                        className={sizeConfig.icon}
                    />
                </button>
            )}

            {showPreviousNext && (
                <button
                    type="button"
                    aria-label="Go to previous page"
                    disabled={!canGoPrevious}
                    onClick={() =>
                        goToPage(currentPage - 1)
                    }
                    className={baseButtonClass}
                >
                    <ChevronLeft
                        className={sizeConfig.icon}
                    />
                </button>
            )}

            {pages.map((page, index) => {

                if (page === DOTS) {
                    return (
                        <span
                            key={`dots-${index}`}
                            aria-hidden="true"
                            className={cn(
                                baseButtonClass,
                                "cursor-default",
                                "hover:bg-transparent",
                                "hover:text-foreground-secondary"
                            )}
                        >
                            ...
                        </span>
                    );
                }

                const isActive =
                    page === currentPage;

                return (
                    <button
                        key={page}
                        type="button"
                        aria-current={
                            isActive
                                ? "page"
                                : undefined
                        }
                        aria-label={`Go to page ${page}`}
                        disabled={disabled}
                        onClick={() =>{
                            if (typeof page !== "number") {
                                return
                            };
                            goToPage(page)
                        } }
                        className={cn(
                            baseButtonClass,

                            isActive && cn(
                                "bg-primary",
                                "text-primary-foreground",
                                "hover:bg-primary-hover",
                                "hover:text-primary-foreground",
                                activeClassName
                            )
                        )}
                    >
                        {page}
                    </button>
                );
            })}

            {showPreviousNext && (
                <button
                    type="button"
                    aria-label="Go to next page"
                    disabled={!canGoNext}
                    onClick={() =>
                        goToPage(currentPage + 1)
                    }
                    className={baseButtonClass}
                >
                    <ChevronRight
                        className={sizeConfig.icon}
                    />
                </button>
            )}

            {showFirstLast && (
                <button
                    type="button"
                    aria-label="Go to last page"
                    disabled={!canGoNext}
                    onClick={() =>
                        goToPage(totalPages)
                    }
                    className={baseButtonClass}
                >
                    <ChevronsRight
                        className={sizeConfig.icon}
                    />
                </button>
            )}

        </div>
    )
}
