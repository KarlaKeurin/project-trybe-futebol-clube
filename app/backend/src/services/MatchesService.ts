import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { IMatch } from '../Interfaces/matches/IMatch';
import MatchModel from '../models/MatchModel';
import { NewEntity } from '../Interfaces';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

  public async getAllMatches(inProgress?: boolean): Promise<ServiceResponse<IMatch[]>> {
    const matches = await this.matchModel.findAll();
    console.log(matches);

    if (inProgress === true) {
      return {
        status: 'SUCCESSFUL',
        data: matches.filter((match) => match.inProgress.valueOf() === true),
      };
    }
    if (inProgress === false) {
      return { status: 'SUCCESSFUL',
        data: matches.filter((match) => match.inProgress.valueOf() === false),
      };
    }
    return {
      status: 'SUCCESSFUL',
      data: matches,
    };
  }

  public async finishMatch(id: IMatch['id']): Promise<ServiceResponse<IMatch>> {
    const match = await this.matchModel.finishMatch(id);

    if (!match) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: match,
    };
  }

  public async updatedMatch(id: IMatch['id'], match: IMatch): Promise<ServiceResponse<IMatch>> {
    const updatedMatch = await this.matchModel.updateMatch(id, match);

    if (!updatedMatch) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Match ${id} not found` },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: updatedMatch,
    };
  }

  public async createMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const inProgress = true;

    const newMatch = await this.matchModel.createMatch({ ...match, inProgress });

    return {
      status: 'CREATED',
      data: newMatch,
    };
  }
}
