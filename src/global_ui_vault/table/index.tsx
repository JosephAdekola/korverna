import React from "react";
import {
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";
import { DataTableProps } from "./types";
import DataTableSkeleton from "./dataTableSkeleton";

export default function DataTable<T>({
    data,
    columns,
    containerClassname = "rounded-2xl border bg-white",
    tableHeadClassname = "border-b bg-muted/30",
    thClassname = "h-12 px-4 text-left text-xs uppercase font-semibold text-muted-foreground whitespace-nowrap",
    trClassname = " border-b transition-colors hover:bg-muted/40",
    tdClassname = "px-4 py-4 text-sm",
    rowKey,
    loading = false,
    searchable = true,
    pagination = true,
    pageSize = 10,
    emptyMessage = "No data found",
}: DataTableProps<T>) {
    const [search, setSearch] = React.useState("");
    const [page, setPage] = React.useState(1);

    const filteredData = React.useMemo(() => {
        if (!search) return data;

        return data.filter((row) =>
            JSON.stringify(row)
                .toLowerCase()
                .includes(search.toLowerCase())
        );
    }, [search, data]);

    const totalPages = Math.ceil(filteredData.length / pageSize);

    const paginatedData = pagination
        ? filteredData.slice(
            (page - 1) * pageSize,
            page * pageSize
        )
        : filteredData;

    return (
        <div className={`${containerClassname}`}>
            {searchable && (
                <div className="p-4 border-b">
                    <div className="relative max-w-sm">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />

                        <input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            className="h-10 w-full rounded-lg border pl-10 pr-4 text-sm outline-none
                                focus:ring-2 focus:ring-blue-500 "/>
                    </div>
                </div>
            )}

            <table className="w-full">
                <thead className={`${tableHeadClassname}`}>
                    <tr>
                        {columns.map((column, idx) => (
                            <th
                                key={idx}
                                className={`${thClassname}`} >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {!loading &&
                        paginatedData.map((row, idx) => (
                            <tr
                                key={idx}
                                className={`${trClassname}`} >
                                {columns.map((column, idx) => (
                                    <td
                                        key={idx}
                                        className={`${tdClassname}`}>
                                        {column.render
                                            ? column.render(row)
                                            : String(
                                                row[column.key as keyof T] ?? ""
                                            )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                </tbody>
            </table>

            {!loading && filteredData.length === 0 && (
                <div className="p-20 text-center text-muted-foreground">
                    {emptyMessage}
                </div>
            )}

            {loading && (
                <DataTableSkeleton
                    searchable={false}
                    pagination={false} />
            )}

            {pagination && totalPages > 1 && (
                <div className="flex items-center justify-between border-t p-4">
                    <p className="text-sm text-muted-foreground">
                        Showing {paginatedData.length} of{" "}
                        {filteredData.length}
                    </p>

                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                            className="h-9 w-9 rounded-lg border grid place-items-center ">
                            <ChevronLeft size={16} />
                        </button>

                        <button
                            disabled={page === totalPages}
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
                            className=" h-9 w-9 rounded-lg border grid place-items-center " >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}