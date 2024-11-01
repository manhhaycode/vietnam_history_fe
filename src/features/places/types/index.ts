import { CommonModel } from '@/common/types';

export interface IPlace extends CommonModel {
  id: string;
  name: string;
  description: string;
  location: string;
  thumbnail: string;
  status: EPlaceStatus;
}

export enum EPlaceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
