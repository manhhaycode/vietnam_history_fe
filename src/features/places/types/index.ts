import { CommonModel } from '@/common/types';
import { IEra } from '@/features/era';
import { IEvent } from '@/features/event';

export interface IPlace extends CommonModel {
  id: string;
  name: string;
  description: string;
  location: string;
  thumbnail: string;
  status: EPlaceStatus;
  eraId: IEra['id'];   
  eventId: IEvent['id']; 
}

export enum EPlaceStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
