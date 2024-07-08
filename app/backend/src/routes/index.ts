import { Router } from 'express';
import teamsRouter from './teams.routes';
import usersRouter from './users.routes';
import matchesRouter from './matches.routes';
import leaderboardsRouter from './leaderboards.routes';

const router = Router();

router.use('/', teamsRouter);
router.use('/', usersRouter);
router.use('/', matchesRouter);
router.use('/', leaderboardsRouter);

export default router;
