import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const router = Router();

router.get('/teams', (req: Request, res: Response) => teamController.getAllTeams(req, res));
router.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default router;
