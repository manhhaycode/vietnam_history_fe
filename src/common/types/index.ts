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
  page: number;
  size: number;
  total: number;
  data: T[];
}

export interface IFilter {
  search?: string;
  page?: number;
  size?: number;
}
