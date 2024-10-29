import { IPagination, IPaginationFilter } from '@/common/types';
import { IEvent } from '../types';
import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';

// Fetch events with pagination and filtering
export const getEvents = async (filter: IPaginationFilter<Partial<IEvent>>): Promise<IPagination<IEvent>> => {
  try {
    const response: IPagination<IEvent> = await httpRequest.get('/events', {
      params: filter,
    });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

// Create a new event
export const createEvent = async (data: Partial<IEvent>) => {
  try {
    const response = await httpRequest.post('/events', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

// Update an existing event
export const updateEvent = async (id: string, data: Partial<IEvent>) => {
  try {
    const response = await httpRequest.put(`/events/${id}`, data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

// Delete an event by ID
export const deleteEvent = async (id: string) => {
  try {
    const response = await httpRequest.remove(`/events/${id}`, {});
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

// Hook to fetch events using React Query
export const useGetEvents = (filter: IPaginationFilter<Partial<IEvent>>) => {
  return useQuery({
    queryKey: ['events', filter],
    queryFn: () => getEvents(filter),
  });
};

// Hook to create an event with mutation options
export const useCreateEventMutation = (options?: UseMutationOptions<any, Error, Partial<IEvent>>) => {
  return useMutation({
    mutationKey: ['createEvent'],
    mutationFn: createEvent,
    ...options,
  });
};

// Hook to update an event
export const useUpdateEventMutation = (
  options?: UseMutationOptions<any, Error, { id: string; data: Partial<IEvent> }>,
) => {
  return useMutation({
    mutationKey: ['updateEvent'],
    mutationFn: ({ id, data }) => updateEvent(id, data),
    ...options,
  });
};

// Hook to delete an event
export const useDeleteEventMutation = (options?: UseMutationOptions<any, Error, string>) => {
  return useMutation({
    mutationKey: ['deleteEvent'],
    mutationFn: deleteEvent,
    ...options,
  });
};
