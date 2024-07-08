import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchController';
import Validations from '../middlewares/Validations';

const matchController = new MatchController();

const router = Router();

router.get('/matches', (req: Request, res: Response) => {
  if (req.query.inProgress === 'true') {
    return matchController.getInProgressMatches(req, res);
  }
  if (req.query.inProgress === 'false') {
    return matchController.getCompletedMatches(req, res);
  }
  return matchController.getAllMatches(req, res);
});

router.patch('/matches/:id/finish', Validations.validateToken, (req, res) => matchController
  .finishMatch(req, res));

router.patch('/matches/:id', Validations.validateToken, (req, res) => matchController
  .updateMatch(req, res));

router.post(
  '/matches',
  Validations.validateToken,
  Validations.validateMatch,
  (req, res) => matchController
    .createMatch(req, res),
);

export default router;
