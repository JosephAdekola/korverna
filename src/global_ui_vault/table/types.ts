import { ReactNode } from "react";

export interface TableColumnProps<T> {
  key?: keyof T ;
  header: string;
  render?: (row: T) => ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: TableColumnProps<T>[];
  containerClassname?: string;
  tableHeadClassname?: string;
  thClassname?: string;
  trClassname?: string;
  tdClassname?: string;
  loading?: boolean;
  selectable?: boolean;
  searchable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  emptyMessage?: string;
  rowKey?: keyof T;
}