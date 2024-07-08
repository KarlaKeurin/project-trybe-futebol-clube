import { Identifiable } from '..';

export interface ILeaderboard extends Identifiable {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
}

export interface ILeaderboardSort extends ILeaderboard {
  goalsBalance: number,
}

export interface ILeader extends ILeaderboard {
  leaderboard: object,
  team: object,
}
