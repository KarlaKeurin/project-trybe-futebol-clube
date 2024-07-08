import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderboardsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderBoardService(),
  ) {}

  public async createLeaderboardHome(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.createLeaderboardHome();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createLeaderboardAway(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.createLeaderboardAway();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createLeaderBoard(_req: Request, res: Response) {
    const { status, data } = await this.leaderboardService.createLeaderBoard();

    res.status(mapStatusHTTP(status)).json(data);
  }
}
