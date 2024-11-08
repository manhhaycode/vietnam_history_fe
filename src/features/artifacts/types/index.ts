import { CommonModel } from '@/common/types';
import { IEra } from '@/features/era'; 
import { IEvent } from '@/features/event'; 
export interface IArtifact extends CommonModel {
  id: string;
  name: string;
  description: string;
  locationFound: string;
  thumbnail: string;
  status: EArtifactStatus;
  eraId: IEra['id'];   
  eventId: IEvent['id']; 
}

export enum EArtifactStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
