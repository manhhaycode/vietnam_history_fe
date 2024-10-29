import { IPagination, IPaginationFilter } from '@/common/types';
import { ITopic } from '../types';
import * as httpRequest from '@/libs/axios';
import { useQuery } from '@tanstack/react-query';

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

export const useGetTopics = (filter: IPaginationFilter<Partial<ITopic>>) => {
  return useQuery({
    queryKey: ['topics', filter],
    queryFn: () => getTopics(filter),
  });
};
