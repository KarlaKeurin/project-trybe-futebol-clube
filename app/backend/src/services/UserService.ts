import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../Interfaces/users/IUser';
import { IUserModel } from '../Interfaces/users/IUserModel';
import {
  ServiceMessage,
  ServiceResponse,
  ServiceRole,
} from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);

    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return {
          status: 'UNAUTHORIZED',
          data: { message: 'Invalid email or password' },
        };
      }
      const { email, role } = user as IUser;
      const token = this.jwtService.sign({ email, role });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return {
      status: 'UNAUTHORIZED',
      data: { message: 'Invalid email or password' },
    };
  }

  public async getByRole(token: string):
  Promise<ServiceResponse<ServiceRole | IUser>> {
    const decoded = this.jwtService.verify(token.split(' ')[1]);

    if (typeof decoded === 'string') {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid token' } };
    }

    return { status: 'SUCCESSFUL', data: { role: decoded.role } };
  }
}
