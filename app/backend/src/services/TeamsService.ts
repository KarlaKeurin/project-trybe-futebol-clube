import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();

    return {
      status: 'SUCCESSFUL',
      data: teams,
    };
  }

  public async getTeamById(id: ITeam['id']): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);

    if (!team) {
      return {
        status: 'NOT_FOUND',
        data: { message: `Team ${id} not found` },
      };
    }

    return {
      status: 'SUCCESSFUL',
      data: team,
    };
  }
}
