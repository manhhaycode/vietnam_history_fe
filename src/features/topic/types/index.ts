import { CommonModel } from '@/common/types';
import { IEra } from '@/features/era';
import { IEvent } from '@/features/event';

export interface ITopic extends CommonModel {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  status: ETopicStatus;
  eraId: IEra['id'];
  eventId: IEvent['id'];
}

export enum ETopicStatus {
  PUBLISHED = 'PUBLISHED',
  PENDING = 'PENDING',
  ACHIEVED = 'ACHIEVED',
  DISABLED = 'DISABLED',
}
