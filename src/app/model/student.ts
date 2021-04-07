import { Image } from './image';

export interface Student {
  id?: number;
  name: string;
  lastname: string;
  university?: string;
  comment?: string;
  image?: Image;
  isActive?: boolean;
  averageEvaluationDetails: {
    streamOverall: {
      fe?: number;
      be?: number;
      qa?: number;
      project?: number;
    };
  };
}
