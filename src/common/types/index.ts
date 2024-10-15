export interface IResponse {
  code: number;
  message: string;
}

export interface CommonModel {
  createAt: string;
  updateAt: string;
  createBy: string;
  updateBy: string;
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
