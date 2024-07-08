import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import MatchModel from '../database/models/MatchModel';
import Validations from '../middlewares/Validations';
import JWT from '../../src/utils/JWT';
import {
  match,
  matches,
  updatedMatch,
  validToken,
} from './mocks/Match.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches testes', () => {
  beforeEach(function () { sinon.restore(); });

  it('Testa se a rota /matches retorna um array de objetos', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app)
    .get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body[0]).to.have.property('id');
    expect(body[0]).to.have.property('homeTeamGoals');
    expect(body[0]).to.have.property('awayTeamGoals');
    expect(body[0]).to.have.property('inProgress');
    expect(body[0]).to.deep.equal(matches[0]);
  });

  it('Testa se a rota /matches/:id atualiza uma partida', async () => {
    sinon.stub(MatchModel, 'update').resolves(match as any);
    sinon.stub(MatchModel, 'findByPk').resolves(match as any);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .set('authorization', 'Bearer validToken')
    .send(updatedMatch);

    expect(status).to.be.equal(200);
  });

  it('Testa se a rota /matches/:id/finish finaliza uma partida', async () => {
    sinon.stub(MatchModel, 'update').resolves(match as any);
    sinon.stub(MatchModel, 'findByPk').resolves(match as any);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'Bearer validToken');

    expect(status).to.be.equal(200);
    expect(body.message).to.equal('Finished');
  })

  it('Testa se é possível fitrar as partidas pelos jogos em andamento', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app)
    .get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body[0]).to.have.property('id');
    expect(body[0]).to.have.property('homeTeamGoals');
    expect(body[0]).to.have.property('awayTeamGoals');
    expect(body[0]).to.have.property('inProgress');
  });

  it('Testa se é possível fitrar as partidas pelos jogos finalizados', async () => {
    sinon.stub(MatchModel, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app)
    .get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.an('array');
    expect(body[0]).to.have.property('id');
    expect(body[0]).to.have.property('homeTeamGoals');
    expect(body[0]).to.have.property('awayTeamGoals');
    expect(body[0]).to.have.property('inProgress');
    expect(body[0]).to.deep.equal(matches[0]);    
  });

  it('Testa se é possível criar uma partida', async () => {
    sinon.stub(MatchModel, 'create').resolves(match as any);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('authorization', 'Bearer validToken')
    .send(match);

    expect(status).to.be.equal(201);
    expect(body).to.have.property('id');
    expect(body).to.have.property('homeTeamGoals');
    expect(body).to.have.property('awayTeamGoals');
    expect(body).to.have.property('inProgress');
  });

  it('Testa se a partida a ser atualizada existe, não existir, retorna o status 404 e uma mensagem', async () => {
    sinon.stub(MatchModel, 'update').resolves(undefined);
    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .set('authorization', 'Bearer validToken')
    .send(updatedMatch);

    expect(status).to.be.equal(404);
    expect(body.message).to.equal('Match 1 not found');
  });

  it('Testa se a partida a ser finalizada existe, não existir, retorna o status 404 e uma mensagem', async () => {
    sinon.stub(MatchModel, 'update').resolves(undefined);
    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(JWT, 'verify').resolves();

    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'Bearer validToken');

    expect(status).to.be.equal(404);
    expect(body.message).to.equal('Finished');
  });
})
