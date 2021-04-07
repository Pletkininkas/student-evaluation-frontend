export interface Evaluation {
  id: number;
  userId: number;
  userUsername: string;
  userStream: string;
  stream: string;
  communication?: number;
  learnAbility?: number;
  direction?: number;
  evaluation: number;
  comment?: string;
  active: boolean;
}
