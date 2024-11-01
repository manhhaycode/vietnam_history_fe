import { IPagination, IPaginationFilter } from '@/common/types';
import { IFigure } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getFigures = async (
  filter: IPaginationFilter<Partial<IFigure>>
): Promise<IPagination<IFigure>> => {
  try {
    const response: IPagination<IFigure> = await httpRequest.get('/figures', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createFigure = async (data: Partial<IFigure>) => {
  try {
    const response = await httpRequest.post('/figures', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateFigure = async (id: string, data: Partial<IFigure>) => {
  try {
    const response = await httpRequest.put(`/figures/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteFigure = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/figures/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetFigures = (filter: IPaginationFilter<Partial<IFigure>>) => {
  return useQuery({
    queryKey: ['figures', filter],
    queryFn: () => getFigures(filter),
  });
};

export const useCreateFigureMutation = (
  options?: UseMutationOptions<any, Error, Partial<IFigure>>
) => {
  return useMutation({
    mutationKey: ['createFigure'],
    mutationFn: createFigure,
    ...options,
  });
};

export const useUpdateFigureMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IFigure> }>
) => {
  return useMutation({
    mutationKey: ['updateFigure'],
    mutationFn: ({ id, data }) => updateFigure(id, data),
    ...options,
  });
};


export const useDeleteFigureMutation = (
  options?: UseMutationOptions<any, Error, string>
) => {
  return useMutation({
    mutationKey: ['deleteFigure'],
    mutationFn: deleteFigure,
    ...options,
  });
};
