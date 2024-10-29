import * as httpRequest from '@/libs/axios';
import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

export interface Topic {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  status: string;
  metadata: string;
}

export interface TopicCreateResponse {
  success: boolean;
  message: string;
  topic: Topic;
}

export interface TopicListResponse {
  success: boolean;
  topics: Topic[];
}


// export const getTopics = async (): Promise<Topic[]> => {
//   try {
//     const response: TopicListResponse = await httpRequest.get('/topics');
//     return response.topics;
//   } catch (error) {
//     throw new Error(error as any);
//   }
// };

// export const useGetTopics = (p0: string) => {
//   return useQuery({
//     queryKey: ['topics'],
//     queryFn: getTopics,
//   });
// };

export const getTopicById = async (id: string): Promise<Topic> => {
  try {
    const response = await httpRequest.get(`/topics/${id}`);
    return response; 
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetTopicById = (id: string) => {
  return useQuery<Topic, Error>({
    queryKey: ['topic', id], 
    queryFn: () => getTopicById(id), 
    enabled: !!id, 
  });
};

export const createTopic = async (topic: Partial<Topic>): Promise<TopicCreateResponse> => {
  try {
    const response = await httpRequest.post('/topics', topic);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateTopic = async (topic: Topic): Promise<Topic> => {
  try {
    const response = await httpRequest.put(`/topics/${topic.id}`, topic);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteTopic = async (id: string): Promise<void> => {
  try {
    await httpRequest.remove(`/topics/${id}`, {});
  } catch (error) {
    throw new Error(error as any);
  }
};


export const useCreateTopicMutation = (
  options?: UseMutationOptions<TopicCreateResponse, Error, Partial<Topic>>,
) => {
  return useMutation({
    mutationKey: ['createTopic'],
    mutationFn: createTopic,
    ...options,
  });
};

export const useUpdateTopicMutation = (options?: UseMutationOptions<Topic, Error, Topic>) => {
  return useMutation({
    mutationKey: ['updateTopic'],
    mutationFn: updateTopic,
    ...options,
  });
};

export const useDeleteTopicMutation = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteTopic'],
    mutationFn: deleteTopic,
    ...options,
  });
};
