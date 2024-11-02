import { IPagination, IPaginationFilter } from '@/common/types';
import { IEra } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getEras = async (filter: IPaginationFilter<Partial<IEra>>): Promise<IPagination<IEra>> => {
  try {
    const response: IPagination<IEra> = await httpRequest.get('/eras', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createEra = async (data: Partial<IEra>) => {
  try {
    const response = await httpRequest.post('/eras', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateEra = async (id: string, data: Partial<IEra>) => {
  try {
    const response = await httpRequest.put(`/eras/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteEra = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/eras/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetEras = (filter: IPaginationFilter<Partial<IEra>>) => {
  return useQuery({
    queryKey: ['eras', filter],
    queryFn: () => getEras(filter),
  });
};

export const useCreateEraMutation = (options?: UseMutationOptions<any, Error, Partial<IEra>>) => {
  return useMutation({
    mutationKey: ['createEra'],
    mutationFn: createEra,
    ...options,
  });
};

export const useUpdateEraMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IEra> }>,
) => {
  return useMutation({
    mutationKey: ['updateEra'],
    mutationFn: ({ id, data }) => updateEra(id, data),
    ...options,
  });
};

export const useDeleteEraMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteEra'],
    mutationFn: deleteEra,
    ...options,
  });
};
