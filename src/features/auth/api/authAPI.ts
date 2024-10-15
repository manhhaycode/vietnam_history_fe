import * as httpRequest from '@/libs/axios';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { IGoogleAuthUrlResponse, IRefreshTokenRequest, IRefreshTokenResponse, IVerifyTokenResponse } from '../types';
import Cookies from 'js-cookie';
export const getGoogleAuthUrl = async (redirect: string): Promise<IGoogleAuthUrlResponse> => {
  try {
    const response = await httpRequest.post('/auth/login-google', { redirect });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const verifyToken = async (localToken: string): Promise<IVerifyTokenResponse> => {
  try {
    const response: IVerifyTokenResponse = await httpRequest.get('/auth/verify-token', {
      params: { token: localToken },
    });
    Cookies.set('vn-history-at', response.accessToken, { expires: response.accessTokenExpiredAt });
    Cookies.set('vn-history-rt', response.refreshToken, { expires: response.refreshTokenExpiredAt });
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const refreshToken = async (data: IRefreshTokenRequest): Promise<IRefreshTokenResponse> => {
  try {
    const response = await httpRequest.post('/auth/refresh-token', data);
    return response;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const useGetGoogleAuthUrlMutation = (
  options?: UseMutationOptions<IGoogleAuthUrlResponse, unknown, string, unknown>,
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

export const useRefreshTokenMutation = (
  options?: UseMutationOptions<IRefreshTokenResponse, unknown, IRefreshTokenRequest, unknown>,
) => {
  return useMutation({
    mutationKey: ['refreshToken'],
    mutationFn: refreshToken,
    ...options,
  });
};
