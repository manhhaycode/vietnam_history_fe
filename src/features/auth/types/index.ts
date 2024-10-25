import { IResponse } from '@/common/types';

export interface IGoogleAuthUrlResponse extends IResponse {
  localToken: string;
  url: string;
}

export interface IVerifyTokenResponse extends IResponse {
  userId: string;
  sessionId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredAt: number;
  refreshTokenExpiredAt: number;
}

export interface IRefreshTokenRequest {
  userId: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse extends IResponse {
  accessToken: string;
  accessTokenExpiredAt: number;
}
