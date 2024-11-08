import { CommonModel } from '@/common/types';
import { IEra } from '@/features/era'; 
import { IEvent } from '@/features/event'; 

export interface IFigure extends CommonModel{
  id: string;
  name: string;
  biography: string;
  birthDate: string;
  deathDate: string;
  thumbnail: string;
  status: EFigureStatus;
  eraId: IEra['id'];
  eventId: IEvent['id'];

}
export enum EFigureStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  PUBLISHED = 'PUBLISHED',
  REJECTED = 'REJECTED',
  DELETED = 'DELETED',
}
