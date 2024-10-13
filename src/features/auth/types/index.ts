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
