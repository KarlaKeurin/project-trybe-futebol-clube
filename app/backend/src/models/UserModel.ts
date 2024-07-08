import SequelizeUser from '../database/models/UserModel';
import { IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    return dbData ? dbData.toJSON() as IUser : null;
  }
}
