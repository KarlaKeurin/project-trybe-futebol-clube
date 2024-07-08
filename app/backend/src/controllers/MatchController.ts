import { Request, Response } from 'express';
import MatchService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches();

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getInProgressMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches(true);

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async getCompletedMatches(_req: Request, res: Response) {
    const { status, data } = await this.matchService.getAllMatches(false);

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { status } = await this.matchService.finishMatch(Number(id));

    res.status(mapStatusHTTP(status)).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match = req.body;
    const { status, data } = await this.matchService.updatedMatch(Number(id), match);

    res.status(mapStatusHTTP(status)).json(data);
  }

  public async createMatch(req: Request, res: Response) {
    const match = req.body;
    const { status, data } = await this.matchService.createMatch(match);

    res.status(mapStatusHTTP(status)).json(data);
  }
}
