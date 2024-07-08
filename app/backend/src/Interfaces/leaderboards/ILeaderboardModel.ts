import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardModel {
  createLeaderboardHome(): Promise<ILeaderboard[]>;
  createLeaderboardAway(): Promise<ILeaderboard[]>;
  createLeaderBoard(): Promise<ILeaderboard[]>;
}
