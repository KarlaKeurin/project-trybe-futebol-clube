/* eslint-disable max-lines-per-function */
import SequelizeTeam from '../database/models/TeamModel';
import SequelizeMatch from '../database/models/MatchModel';
import { ILeaderboard, ILeader, ILeaderboardSort } from '../Interfaces/leaderboards/ILeaderboard';
import { ILeaderboardModel } from '../Interfaces/leaderboards/ILeaderboardModel';
import { IMatch } from '../Interfaces/matches/IMatch';

export default class LeaderboardModel implements ILeaderboardModel {
  private modelTeam = SequelizeTeam;
  private modelMatch = SequelizeMatch;

  private static filterMatches(id: number, dataMatch: IMatch[], isHome: boolean) {
    return dataMatch
      .filter((match) => (isHome ? match.homeTeamId === id : match.awayTeamId === id));
  }

  private static calculatePoints(matches: IMatch[], isHome: boolean) {
    return matches.reduce((acc, match) => {
      const homeGoals = isHome ? match.homeTeamGoals : match.awayTeamGoals;
      const awayGoals = isHome ? match.awayTeamGoals : match.homeTeamGoals;

      if (homeGoals > awayGoals) return acc + 3;
      if (homeGoals === awayGoals) return acc + 1;
      return acc;
    }, 0);
  }

  private static calculateProperties(id: number, dataMatch: IMatch[], isHome: boolean) {
    const matches = LeaderboardModel.filterMatches(id, dataMatch, isHome);
    const totalGames = matches.length;
    const totalPoints = LeaderboardModel.calculatePoints(matches, isHome);

    const totalVictories = matches.filter((match) => {
      const homeGoals = isHome ? match.homeTeamGoals : match.awayTeamGoals;
      const awayGoals = isHome ? match.awayTeamGoals : match.homeTeamGoals;
      return homeGoals > awayGoals;
    }).length;

    const totalDraws = matches
      .filter((match) => match.homeTeamGoals === match.awayTeamGoals).length;

    const totalLosses = totalGames - (totalVictories + totalDraws);

    const goalsFavor = matches
      .reduce((acc, match) => acc + (isHome ? match.homeTeamGoals : match.awayTeamGoals), 0);

    const goalsOwn = matches
      .reduce((acc, match) => acc + (isHome ? match.awayTeamGoals : match.homeTeamGoals), 0);

    return {
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn };
  }

  private static async finalReturn(leaderboard: ILeader[]) {
    return Promise.all(leaderboard.map(async (team: ILeader) => {
      const {
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
      } = team;

      const goalsBalance = goalsFavor - goalsOwn;
      const efficiency = ((totalPoints / (totalGames * 3)) * 100).toFixed(2);

      return {
        ...team,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        efficiency,
      };
    }));
  }

  private static sortLeaderboard(leaderboard: ILeaderboardSort[]) {
    return leaderboard.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  }

  private async createLeaderboard(isHome: boolean): Promise<ILeaderboard[]> {
    const team = await this.modelTeam.findAll();
    const matches = await this.modelMatch.findAll({ where: { inProgress: false } });

    const leaderboard = team.map(({ id, teamName }) => {
      const stats = LeaderboardModel.calculateProperties(id, matches, isHome);
      return { name: teamName, ...stats };
    });

    const finalLeaderboard = await LeaderboardModel.finalReturn(leaderboard as any);
    return LeaderboardModel.sortLeaderboard(finalLeaderboard);
  }

  async createLeaderboardHome(): Promise<ILeaderboard[]> {
    return this.createLeaderboard(true);
  }

  async createLeaderboardAway(): Promise<ILeaderboard[]> {
    return this.createLeaderboard(false);
  }

  async createLeaderBoard(): Promise<ILeaderboard[]> {
    const teams = await this.modelTeam.findAll();
    const matches = await this.modelMatch.findAll({ where: { inProgress: false } });

    const leaderboard = teams.map(({ id, teamName }) => {
      const homeStats = LeaderboardModel.calculateProperties(id, matches, true);
      const awayStats = LeaderboardModel.calculateProperties(id, matches, false);

      const totalStats = {
        totalPoints: homeStats.totalPoints + awayStats.totalPoints,
        totalGames: homeStats.totalGames + awayStats.totalGames,
        totalVictories: homeStats.totalVictories + awayStats.totalVictories,
        totalDraws: homeStats.totalDraws + awayStats.totalDraws,
        totalLosses: homeStats.totalLosses + awayStats.totalLosses,
        goalsFavor: homeStats.goalsFavor + awayStats.goalsFavor,
        goalsOwn: homeStats.goalsOwn + awayStats.goalsOwn,
      };

      return { name: teamName, ...totalStats };
    });

    const finalLeaderboard = await LeaderboardModel.finalReturn(leaderboard as any);
    return LeaderboardModel.sortLeaderboard(finalLeaderboard);
  }
}
