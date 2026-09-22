import React from "react";

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
  searchable?: boolean;
  pagination?: boolean;
}

export default function DataTableSkeleton({
  columns = 6,
  rows = 8,
  searchable = true,
  pagination = true,
}: DataTableSkeletonProps) {
  return (
    <div className="rounded-2xl bg-white animate-pulse">
      {/* Search */}
      {searchable && (
        <div className="p-4">
          <div className="h-10 w-full max-w-sm rounded-lg " />
        </div>
      )}

      <table className="w-full">
        {/* Table Body */}
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex} className="">
              {Array.from({ length: columns }).map((_, columnIndex) => (
                <td key={columnIndex} className="px-4 py-4">
                  <div
                    className={`h-4 rounded bg-(--color-border) ${
                      columnIndex === 0
                        ? "w-10"
                        : columnIndex === 1
                        ? "w-36"
                        : columnIndex === 2
                        ? "w-48"
                        : columnIndex === columns - 1
                        ? "w-24"
                        : "w-20"
                    }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between borde-t p-4">
          <div className="h-4 w-36 rounded bg-(--color-border)" />

          <div className="flex gap-2">
            <div className="h-9 w-9 rounded-lg bg-(--color-border)" />
            <div className="h-9 w-9 rounded-lg bg-(--color-border)" />
          </div>
        </div>
      )}
    </div>
  );
}