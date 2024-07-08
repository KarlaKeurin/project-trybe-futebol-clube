import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Model from '../database/models';
import { ILeaderboard } from '../Interfaces/leaderboards/ILeaderboard';

import {
  leaderboardTeams,
  leaderboardHomeTeams,
  leaderboardAwayTeams,
} from './mocks/Leaderboard.mocks';


import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Leaderboard testes', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se a rota /leaderboard retorna a classificação geral dos times', async () => {
    sinon.stub(Model, "query").resolves(leaderboardTeams as any);
    
    const { status, body } = await chai.request(app)
      .get('/leaderboard');

    expect(status).to.be.equal(200);
  });

  it('Testa se a rota /leaderboard/home retorna a classificação de todos os times da casa', async () => {
    sinon.stub(Model, "query").resolves(leaderboardHomeTeams as any);
    
    const { status, body } = await chai.request(app)
      .get('/leaderboard/home');

    expect(status).to.be.equal(200);
  });

  it('Testa se', async () => {
    sinon.stub(Model, "query").resolves(leaderboardAwayTeams as any);
    
    const { status, body } = await chai.request(app)
      .get('/leaderboard/away');

    expect(status).to.be.equal(200);
  });  
});
