import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import TeamModel from '../database/models/TeamModel';
import { team, teams, teamNotFound  } from './mocks/Team.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams testes', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se retorna todos os times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(teams);
  });

  it('Testa se retorna um time por id', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.be.eq(200);
    expect(body).to.be.deep.eq(team);
  });
  it('Testa se retorna "Not Found" se o time não existir', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(null as any);

    const { status, body } = await chai.request(app).get('/teams/999');

    expect(status).to.be.eq(404);
    expect(body.message).to.be.eq(teamNotFound);
  });
})
