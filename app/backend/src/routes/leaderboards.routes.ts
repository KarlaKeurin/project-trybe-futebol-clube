import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get('/leaderboard/home', (req: Request, res: Response) => leaderboardController
  .createLeaderboardHome(req, res));

router.get('/leaderboard/away', (req: Request, res: Response) => leaderboardController
  .createLeaderboardAway(req, res));

router.get('/leaderboard', (req: Request, res: Response) => leaderboardController
  .createLeaderBoard(req, res));

export default router;
