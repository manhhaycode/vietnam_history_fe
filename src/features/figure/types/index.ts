export interface IFigure {
    id: string;
    name: string;
    biography: string;
    birthDate: string; 
    deathDate: string; 
    thumbnail: string;
    status: EFigureStatus; 
  }
  export enum EFigureStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED',
    REJECTED = 'REJECTED',
    DELETED = 'DELETED',
  }
  