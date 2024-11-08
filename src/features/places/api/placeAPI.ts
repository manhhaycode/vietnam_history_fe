import { IPagination, IPaginationFilter } from '@/common/types';
import { IPlace } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getPlaces = async (filter: IPaginationFilter<Partial<IPlace>>): Promise<IPagination<IPlace>> => {
  try {
    const response: IPagination<IPlace> = await httpRequest.get('/places', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createPlace = async (data: Partial<IPlace>) => {
  try {
    const response = await httpRequest.post('/places', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updatePlace = async (id: string, data: Partial<IPlace>) => {
  try {
    const response = await httpRequest.put(`/places/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deletePlace = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/places/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetPlaces = (filter: IPaginationFilter<Partial<IPlace & { eventId: string; eraId: string }>>) => {
  return useQuery({
    queryKey: ['places', filter],
    queryFn: () => getPlaces(filter),
  });
};

export const useCreatePlaceMutation = (options?: UseMutationOptions<any, Error, Partial<IPlace>>) => {
  return useMutation({
    mutationKey: ['createPlace'],
    mutationFn: createPlace,
    ...options,
  });
};

export const useUpdatePlaceMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IPlace> }>,
) => {
  return useMutation({
    mutationKey: ['updatePlace'],
    mutationFn: ({ id, data }) => updatePlace(id, data),
    ...options,
  });
};

export const useDeletePlaceMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deletePlace'],
    mutationFn: deletePlace,
    ...options,
  });
};
