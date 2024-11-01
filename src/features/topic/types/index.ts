import { CommonModel } from '@/common/types';

export interface ITopic extends CommonModel {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  status: ETopicStatus;
}

export enum ETopicStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  ACHIEVED = 'ACHIEVED',
  DISABLED = 'DISABLED',
}
