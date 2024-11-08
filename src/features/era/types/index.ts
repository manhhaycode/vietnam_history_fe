import { CommonModel } from '@/common/types';

export interface IEra extends CommonModel {
  id: string;
  name: string;
  startDate: string; 
  endDate: string;   
  description: string;
  thumbnail: string;
  status: EEraStatus;
  era: 'AD' | 'BC'; 
}

export enum EEraStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
