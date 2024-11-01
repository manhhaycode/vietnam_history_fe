import { IPagination, IPaginationFilter } from '@/common/types';
import { IArtifact } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getArtifacts = async (filter: IPaginationFilter<Partial<IArtifact>>): Promise<IPagination<IArtifact>> => {
  try {
    const response: IPagination<IArtifact> = await httpRequest.get('/artifacts', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createArtifact = async (data: Partial<IArtifact>) => {
  try {
    const response = await httpRequest.post('/artifacts', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateArtifact = async (id: string, data: Partial<IArtifact>) => {
  try {
    const response = await httpRequest.put(`/artifacts/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteArtifact = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/artifacts/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetArtifacts = (filter: IPaginationFilter<Partial<IArtifact>>) => {
  return useQuery({
    queryKey: ['artifacts', filter],
    queryFn: () => getArtifacts(filter),
  });
};

export const useCreateArtifactMutation = (options?: UseMutationOptions<any, Error, Partial<IArtifact>>) => {
  return useMutation({
    mutationKey: ['createArtifact'],
    mutationFn: createArtifact,
    ...options,
  });
};

export const useUpdateArtifactMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IArtifact> }>,
) => {
  return useMutation({
    mutationKey: ['updateArtifact'],
    mutationFn: ({ id, data }) => updateArtifact(id, data),
    ...options,
  });
};

export const useDeleteArtifactMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteArtifact'],
    mutationFn: deleteArtifact,
    ...options,
  });
};
