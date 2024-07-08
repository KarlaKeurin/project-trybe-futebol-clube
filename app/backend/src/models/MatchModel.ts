import SequelizeMatch from '../database/models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeams from '../database/models/TeamModel';
import { NewEntity } from '../Interfaces';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatch;

  async findAll(): Promise<IMatch[]> {
    const dbData = await this.model.findAll({
      include: [
        { model: SequelizeTeams, as: 'homeTeam', attributes: ['teamName'], required: true },
        { model: SequelizeTeams, as: 'awayTeam', attributes: ['teamName'], required: true },
      ],
      order: [['id', 'ASC']],
    });
    return dbData;
  }

  async finishMatch(id: IMatch['id']): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    await this.model.update({ inProgress: false }, { where: { id } });

    return this.model.findByPk(id);
  }

  async updateMatch(id: IMatch['id'], match: IMatch): Promise<IMatch | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    await this.model.update(match, { where: { id } });

    return this.model.findByPk(id);
  }

  async createMatch(match: NewEntity<IMatch>): Promise<IMatch> {
    const dbData = await this.model.create(match);
    const { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }: IMatch = dbData;
    return { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress };
  }
}
