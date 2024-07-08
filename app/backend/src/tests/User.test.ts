import * as bcrypt from 'bcryptjs';
import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserController from '../controllers/UserController';
import UserService from '../services/UserService';
import { App } from '../app';
import UserModel from '../models/UserModel';
import JWT from '../utils/JWT';

import {
  user,
  userWithoutPassword,
  users,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
  expectedRole,
  invalidToken,
} from './mocks/User.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Users e Login testes', () => {

  beforeEach(function () { sinon.restore(); });

  it('Testa se não é possível fazer o login com os dados do body incorretos', async () => {
    const { status, body } = await chai.request(app)
    .post('/login')
    .send({});
    
    expect(status).to.be.eq(400);
    expect(body.message).to.be.eq('All fields must be filled');
  });

  it('Testa se não é possível fazer o login com o email inválido', async () => {
    const { status, body } = await chai.request(app)
    .post('/login')
    .send(invalidEmailLoginBody);
    
    expect(status).to.be.eq(401);
    expect(body.message).to.be.eq('Invalid email or password');
  });

  it('Testa se não é possível fazer o login com a senha inválida', async () => {
    const { status, body } = await chai.request(app)
    .post('/login')
    .send(invalidPasswordLoginBody);
    
    expect(status).to.be.eq(401);
    expect(body.message).to.be.eq('Invalid email or password');
  });

  it('Testa se retorna o token quando o login for válido', async () => {
    sinon.stub(UserModel.prototype, 'findByEmail').resolves(userRegistered as any);
    sinon.stub(bcrypt, 'compareSync').resolves(true);
    sinon.stub(JWT, 'sign').returns('validToken');
    
    const { status, body } = await chai.request(app)
    .post('/login')
    .send(validLoginBody);
    
    expect(status).to.be.eq(200);
    expect(body).to.have.property('token');
  });

  it('Testa se retorna "Token not found" quando não houver token', async () => {
    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', '');

    expect(status).to.be.eq(401);
    expect(body.message).to.be.eq('Token not found');
  });

  it('Testa se retorna a role do usuário', async () => {
    sinon.stub(JWT, 'verify').returns(expectedRole);

    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'Bearer validToken');

    expect(status).to.be.eq(200);
    expect(body).to.have.property('role').eq('admin');
  });

  it('Testa se retorna "Token must be a valid token" quando o token não tiver o Bearer', async () => {
    const { status, body } = await chai.request(app)
    .get('/login/role')
    .set('authorization', 'validToken');

    expect(status).to.be.eq(401);
    expect(body.message).to.be.eq('Token must be a valid token');
  });
});
