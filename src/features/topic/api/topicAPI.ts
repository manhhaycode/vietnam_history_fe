import { IPagination, IPaginationFilter } from '@/common/types';
import { ITopic } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

export const getTopic = async (id: string): Promise<ITopic> => {
  try {
    const response = await httpRequest.get(`/topics/${id}`);
    return response.topic as ITopic;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getTopics = async (filter: IPaginationFilter<Partial<ITopic>>): Promise<IPagination<ITopic>> => {
  try {
    const response: IPagination<ITopic> = await httpRequest.get('/topics', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createTopic = async (data: Partial<ITopic>) => {
  try {
    const response = await httpRequest.post('/topics', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateTopic = async (id: string, data: Partial<ITopic>) => {
  try {
    const response = await httpRequest.put(`/topics/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteTopic = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/topics/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetTopics = (filter: IPaginationFilter<Partial<ITopic & { eraId: string; eventId: string }>>) => {
  return useQuery({
    queryKey: ['topics', filter],
    queryFn: () => getTopics(filter),
  });
};

export const useGetTopic = (id?: string) => {
  return useQuery({
    queryKey: ['topic', id],
    queryFn: () => getTopic(id!),
    enabled: !!id,
    placeholderData: undefined,
  });
};

export const useCreateTopicMutation = (options?: UseMutationOptions<any, Error, Partial<ITopic>>) => {
  return useMutation({
    mutationKey: ['createTopic'],
    mutationFn: createTopic,
    ...options,
  });
};

export const useUpdateTopicMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<ITopic> }>,
) => {
  return useMutation({
    mutationKey: ['updateTopic'],
    mutationFn: ({ id, data }) => updateTopic(id, data),
    ...options,
  });
};

export const useDeleteTopicMuatation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteTopic'],
    mutationFn: deleteTopic,
    ...options,
  });
};
