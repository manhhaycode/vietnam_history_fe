import * as httpRequest from '@/libs/axios';
import { IConversation, IConversationItem, IConversationListRes } from '../types';
import { useQuery, useMutation, UseMutationOptions } from '@tanstack/react-query';

export const getConversations = async (): Promise<IConversationItem[]> => {
  try {
    const response: IConversationListRes = await httpRequest.get('/conversations');
    return response.conversations;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const getConversation = async (id: string): Promise<IConversation> => {
  try {
    const response = await httpRequest.get(`/conversations/${id}`);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const createConversation = async (conversation: IConversation): Promise<IConversation> => {
  try {
    const response = await httpRequest.post('/conversations', conversation);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const updateConversation = async (conversation: IConversation): Promise<IConversation> => {
  try {
    const response = await httpRequest.patch(`/conversations/${conversation.id}`, conversation);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deleteConversation = async (id: string): Promise<void> => {
  try {
    await httpRequest.remove(`/conversations/${id}`, {});
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetConversations = () => {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: () => getConversations(),
    // enabled: !!data.page || !!data.search || !!data.size,
  });
};

export const useGetConversation = (id?: string) => {
  return useQuery({
    queryKey: ['conversation', id],
    queryFn: () => getConversation(id!),
    enabled: !!id,
  });
};

export const useCreateConversationMutation = (options?: UseMutationOptions<IConversation, Error, IConversation>) => {
  return useMutation({
    mutationKey: ['createConversation'],
    mutationFn: createConversation,
    ...options,
  });
};

export const useUpdateConversationMutation = (options?: UseMutationOptions<IConversation, Error, IConversation>) => {
  return useMutation({
    mutationKey: ['updateConversation'],
    mutationFn: updateConversation,
    ...options,
  });
};

export const useDeleteConversationMutation = (options?: UseMutationOptions<void, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteConversation'],
    mutationFn: deleteConversation,
    ...options,
  });
};
