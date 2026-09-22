export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;

    /**
     * Number of pages shown around the current page.
     *
     * Example:
     * siblingCount={1}
     * → 1 ... 4 [5] 6 ... 20
     */
    siblingCount?: number;

    /**
     * Show first/last page buttons.
     */
    showFirstLast?: boolean;

    /**
     * Show previous/next buttons.
     */
    showPreviousNext?: boolean;

    /**
     * Whether to show the surrounding container.
     */
    showContainer?: boolean;

    /**
     * Custom class names.
     */
    className?: string;
    containerClassName?: string;
    buttonClassName?: string;
    activeClassName?: string;

    /**
     * Size presets.
     */
    size?: "sm" | "md" | "lg";

    /**
     * Disable the entire pagination.
     */
    disabled?: boolean;
}