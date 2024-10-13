import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IGoogleAuthUrlResponse, IVerifyTokenResponse } from '../types';

export const getGoogleAuthUrl = async (): Promise<IGoogleAuthUrlResponse> => {
  try {
    const response = await httpRequest.post('/auth/login-google');
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const verifyToken = async (localToken: string): Promise<IVerifyTokenResponse> => {
  try {
    const response = httpRequest.get('/auth/verify-token', { params: { token: localToken } });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetGoogleAuthUrlMutation = (
  options?: UseMutationOptions<IGoogleAuthUrlResponse, unknown, void, unknown>,
) => {
  return useMutation({
    mutationKey: ['getGoogleAuthUrl'],
    mutationFn: getGoogleAuthUrl,
    ...options,
  });
};

export const useVerifyTokenMutation = (
  options?: UseMutationOptions<IVerifyTokenResponse, unknown, string, unknown>,
) => {
  return useMutation({
    mutationKey: ['verifyToken'],
    mutationFn: verifyToken,
    ...options,
  });
};
