import { CommonModel } from '@/common/types';

export interface IArtifact extends CommonModel {
  id: string;
  name: string;
  description: string;
  locationFound: string;
  thumbnail: string;
  status: EArtifactStatus;
}

export enum EArtifactStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
