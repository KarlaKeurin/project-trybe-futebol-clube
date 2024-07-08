import { ILeaderboardModel } from '../Interfaces/leaderboards/ILeaderboardModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';
import LeaderboardModel from '../models/LeaderboardModel';
// import { NewEntity } from '../Interfaces';

export default class LeaderboardService {
  constructor(
    private leaderboardModel: ILeaderboardModel = new LeaderboardModel(),
  ) {}

  public async createLeaderboardHome(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.createLeaderboardHome();

    return {
      status: 'SUCCESSFUL',
      data: leaderboard,
    };
  }

  public async createLeaderboardAway(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.createLeaderboardAway();

    return {
      status: 'SUCCESSFUL',
      data: leaderboard,
    };
  }

  public async createLeaderBoard(): Promise<ServiceResponse<ILeaderboard[]>> {
    const leaderboard = await this.leaderboardModel.createLeaderBoard();

    return {
      status: 'SUCCESSFUL',
      data: leaderboard,
    };
  }
}
