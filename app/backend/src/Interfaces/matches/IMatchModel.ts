import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  finishMatch(id: IMatch['id']): Promise<IMatch | null>;
  updateMatch(id: IMatch['id'], match: IMatch): Promise<IMatch | null>;
  createMatch(match: IMatch): Promise<IMatch>;
}
