import { NextFunction, Request, Response } from 'express';
import JWT from '../utils/JWT';
// import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

const teamModel = new TeamModel();

class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static async validateToken(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const tokenSplit = token.split(' ');
    if (tokenSplit.length !== 2 || tokenSplit[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    const validToken = JWT.verify(tokenSplit[1]);
    if (typeof validToken === 'string') {
      return res.status(401).json({ message: validToken });
    }

    next();
  }

  static async validateMatch(req: Request, res: Response, next: NextFunction):
  Promise<Response | void> {
    const { homeTeamId, awayTeamId } = req.body;

    if (!homeTeamId || !awayTeamId) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (typeof homeTeamId !== 'number' || typeof awayTeamId !== 'number') {
      return res.status(400).json({ message: 'Home team and away team must be numbers' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const homeTeamExists = await teamModel.findById(homeTeamId);
    const awayTeamExists = await teamModel.findById(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  }
}

export default Validations;
