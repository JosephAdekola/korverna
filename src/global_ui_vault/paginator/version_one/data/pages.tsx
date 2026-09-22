import React, { useMemo } from 'react'
import { range } from '../functions/range';

export default function usePaginationPages({
    totalPages,
    siblingCount,
    currentPage,
    DOTS
}: {
    totalPages: number;
    siblingCount: number;
    currentPage: number;
    DOTS: string;
}) {

    const pages = useMemo(() => {

        if (totalPages <= 0) {
            return [];
        }

        if (totalPages <= 5) {
            return range(1, totalPages);
        }

        const totalPageNumbers =
            siblingCount * 2 + 5;

        /*
         * If there are not enough pages to require
         * ellipsis, show all pages.
         */
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages);
        }

        const leftSiblingIndex = Math.max(
            currentPage - siblingCount,
            1
        );

        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPages
        );

        const showLeftDots =
            leftSiblingIndex > 2;

        const showRightDots =
            rightSiblingIndex < totalPages - 1;

        /*
         * Example:
         *
         * 1 ... 4 5 6 ... 12
         */
        if (showLeftDots && showRightDots) {
            return [
                1,
                DOTS,
                ...range(
                    leftSiblingIndex,
                    rightSiblingIndex
                ),
                DOTS,
                totalPages,
            ];
        }

        /*
         * Example:
         *
         * 1 2 3 4 ... 12
         */
        if (!showLeftDots && showRightDots) {
            return [
                ...range(
                    1,
                    3 + siblingCount * 2
                ),
                DOTS,
                totalPages,
            ];
        }

        /*
         * Example:
         *
         * 1 ... 10 11 12
         */
        return [
            1,
            DOTS,
            ...range(
                totalPages -
                (2 + siblingCount * 2),
                totalPages
            ),
        ];

    }, [
        currentPage,
        totalPages,
        siblingCount,
    ]);

    return {pages}
}
