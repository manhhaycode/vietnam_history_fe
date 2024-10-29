export interface IResponse {
  code: number;
  message: string;
}

export interface CommonModel {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface IPagination<T> {
  currentPage: number;
  size: number;
  totalPage: number;
  data: T[];
}

export interface IPaginationFilter<T> {
  page: number;
  pageSize: number;
  filter?: T;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IFilter {
  search?: string;
  page?: number;
  size?: number;
}

export interface TableHeaderItem {
  label: string;
  key: string;
  sortable?: boolean;
  width?: number;
  render?: (text: any, record: any, index: number) => JSX.Element;
}

export type NextUIColor = 'success' | 'warning' | 'primary' | 'default' | 'secondary' | 'danger' | undefined;
