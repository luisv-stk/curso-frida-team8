export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, row: T) => string;
  cellClass?: string | ((value: any, row: T) => string);
}

export interface TableConfig {
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  dense?: boolean;
  responsive?: boolean;
}

export interface TableSortEvent {
  column: string;
  direction: 'asc' | 'desc' | null;
}

export interface TableFilterEvent {
  column: string;
  value: string;
}

export interface TableSelectionEvent<T = any> {
  selectedRows: T[];
  allSelected: boolean;
}

export interface TablePaginationEvent {
  page: number;
  pageSize: number;
  total: number;
}

export interface TableProps<T = any> {
  data: T[];
  columns: TableColumn<T>[];
  config?: TableConfig;
  loading?: boolean;
  selectable?: boolean;
  pagination?: {
    enabled: boolean;
    pageSize: number;
    showSizeOptions?: boolean;
    sizeOptions?: number[];
  };
  emptyMessage?: string;
  loadingMessage?: string;
}

export interface TableEvents<T = any> {
  onSort?: (event: TableSortEvent) => void;
  onFilter?: (event: TableFilterEvent) => void;
  onSelect?: (event: TableSelectionEvent<T>) => void;
  onPageChange?: (event: TablePaginationEvent) => void;
  onRowClick?: (row: T, index: number) => void;
  onRowDoubleClick?: (row: T, index: number) => void;
}
