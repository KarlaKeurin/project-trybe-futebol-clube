# Projeto Trybe Futebol Clube

## O que vou desenvolver?

Você vai construir um back-end dockerizado utilizando modelagem de dados através do Sequelize. Seu desenvolvimento deve respeitar regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já provido nesse projeto.

## Missão essencial

- [X] PR aberto para entrega do projeto Trybe Futebol Clube

## O que preciso saber para fazer o projeto?

- [ ] Entender o que é um ORM e como ele realiza operações em banco de dados relacional
- [ ] Entender como construir uma API
- [ ] Entender como trabalhar com várias aplicações executadas em ambientes isolados (_containers_)
- [ ] Entender como criar um serviço de comunicação entre ambientes isolados em um mesmo host com o docker-compose

## Checklist das configurações mínimas para rodar o projeto

- [ ] Estou usando o `node` na versão `16.14.0 LTS` ou superior, caso não esteja consultar no [FAQ](../blob/main/FAQ.md) como atualizar;
- [ ] Estou usando o `docker-compose` na versão `2.5` ou superior, caso não esteja consultar no [FAQ](../blob/main/FAQ.md) como atualizar;
- [ ] Configurei minha `Dockerfile` do _frontend_ e do _backend_, para copiar arquivos, instalar dependências e executar a aplicação
- [ ] Criei a _migration_ de teams do requisito 1, e renomeei a seeder de time retirando o "`_`"
- [ ] O comando `npm run compose:up` na raiz do projeto sobe todos os containers sem apresentar falhas (Esse comando pode levar até 10 minutos para terminar de rodar)
- [ ] Se já fiz outras _migrations_ e _models_, renomeei as seeders, retirando os `_` do nome dos arquivos, mudando o padrão de `20211205212238-user.ts_` para `20211205212238-user.ts`

## Habilidades para o projeto

### _Serão necessários para realização do projeto_ domínio técnico das seguintes seções

- [ ] Docker: Utilizando Containers
- [ ] Node.js: ORM e Autenticação
- [ ] Programação Orientada a Objetos (POO) e SOLID

### Conteúdos de Soft Skills

- [ ] Leitura do dia 3 `Introdução à resolução de problemas` da Seção `Rumo ao Mercado` no conteúdo de `Soft Skills` do Course

### Requisitos obrigatórios do Projeto

- [ ] 1 - Desenvolva a _migration_ e o _model_ que representa a tabela de times nos respectivos diretórios no caminho `/app/backend/src/database`
- [ ] 2 - (TDD) Desenvolva testes que cubram no mínimo 5 por cento dos arquivos do diretório `/app/backend/src`, com um mínimo de 7 linhas cobertas
- [ ] 3 - Desenvolva o _endpoint_ `/teams` no back-end de forma que ele possa retornar corretamente todos os times
- [ ] 4 - (TDD) Desenvolva testes que cubram no mínimo 10 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 19 linhas cobertas
- [ ] 5 - Desenvolva o _endpoint_ `/teams/:id` no back-end de forma que ele possa retornar dados de um time específico
- [ ] 6 - Desenvolva a _migration_ e o _model_ que representa a tabela de pessoas usuárias nos respectivos diretórios no caminho `/app/backend/src/database` 
- [ ] 7 - (TDD) Desenvolva testes que cubram no mínimo 15 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 25 linhas cobertas
- [ ] 8 - Desenvolva o _endpoint_ `/login `no back-end de maneira que ele permita o acesso com dados válidos no front-end
- [ ] 9 - (TDD) Desenvolva testes que cubram no mínimo 20 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 35 linhas cobertas
- [ ] 10 - Desenvolva o _endpoint_ `/login` no back-end de maneira que ele não permita o acesso com um email não cadastrado ou senha incorreta no front-end
- [ ] 11 - (TDD) Desenvolva testes que cubram no mínimo 30 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 45 linhas cobertas
- [ ] 12 - Desenvolva um _middleware_ de validação para o _token_, verificando se ele é válido, e desenvolva o _endpoint_ `/login/role` no back-end de maneira que ele retorne os dados corretamente no front-end
- [ ] 13 - Desenvolva a _migration_ e o _model_ que representa a tabela de partidas nos respectivos diretórios no caminho `/app/backend/src/database` 
- [ ] 14 - (TDD) Desenvolva testes que cubram no mínimo 45 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 70 linhas cobertas
- [ ] 15 - Desenvolva o _endpoint_ `/matches` de forma que os dados apareçam corretamente na tela de partidas no front-end
- [ ] 16 - Desenvolva o _endpoint_ `/matches` de forma que seja possível filtrar somente as partidas em andamento, e também filtrar somente as partidas finalizadas, na tela de partidas do front-end
- [ ] 17 - Desenvolva o _endpoint_ `/matches/:id/finish` de modo que seja possível finalizar uma partida no banco de dados
- [ ] 18 - Desenvolva o _endpoint_ `/matches/:id` de forma que seja possível atualizar partidas em andamento
- [ ] 19 - (TDD) Desenvolva testes que cubram no mínimo 60 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 80 linhas cobertas
- [ ] 20 - Desenvolva o _endpoint_ `/matches` de modo que seja possível cadastrar uma nova partida em andamento no banco de dados
- [ ] 21 - Desenvolva o _endpoint_ `/matches` de forma que não seja possível inserir uma partida com times iguais nem com um time que não existe na tabela de times
- [ ] 23 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que retorne as informações do desempenho dos times da casa com as seguintes propriedades: _name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor_ e _goalsOwn_
- [ ] 24 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end com os dados iniciais do banco de dados, incluindo as propriedades _goalsBalance_ e _efficiency_, além das propriedades do requisito anterior
- [ ] 25 - Desenvolva o _endpoint_ `/leaderboard/home` de forma que seja possível filtrar as classificações dos times da casa na tela de classificação do front-end, e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [ ] 26 - Desenvolva o _endpoint_ `/leaderboard/away` de forma que retorne as informações do desempenho dos times visitantes com as seguintes propriedades: _name, totalPoints, totalGames, totalVictories, totalDraws, totalLosses, goalsFavor_ e _goalsOwn_
- [ ] 27 - Desenvolva o endpoint `/leaderboard/away`, de forma que seja possível filtrar as classificações dos times visitantes na tela de classificação do front-end, com os dados iniciais do banco de dados, incluindo as propriedades goalsBalance e efficiency, além das propriedades do requisito anterior
- [ ] 28 - Desenvolva o _endpoint_ `/leaderboard/away` de forma que seja possível filtrar as classificações dos times quando visitantes na tela de classificação do front-end e atualizar a tabela ao inserir a partida Corinthians 2 X 1 Internacional
- [ ] 29 - Desenvolva o _endpoint_ `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end com os dados iniciais do banco de dados

## Requisitos Bônus

- [ ] 22 - (Bônus; TDD) Desenvolva testes que cubram no mínimo 80 por cento dos arquivos no diretório `/app/backend/src`, com um mínimo de 100 linhas cobertas
- [ ] 30 - (Bônus) Desenvolva o _endpoint_ `/leaderboard` de forma que seja possível filtrar a classificação geral dos times na tela de classificação do front-end e atualizar a tabela ao inserir a partida Flamengo 3 X 0 Napoli-SC

## Conteúdos de Carreira
Projeto finalizado e aprovado pelo avaliador do GitHub? É hora de deixar registrada a sua capacidade técnica.
Acesse o conteúdo [GitHub: Publicando projetos feitos na Trybe](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/a3cac6d2-5060-445d-81f4-ea33451d8ea4/section/d4f5e97a-ca66-4e28-945d-9dd5c4282085/day/eff12025-1627-42c6-953d-238e9222c8ff/lesson/49cb103b-9e08-4ad5-af17-d423a624285a) e publique seu projeto de forma correta em seu GitHub pessoal, preservando todo seu histórico de commits, e respeitando os [Termos de Uso da Trybe](https://www.betrybe.com/termos-de-uso). 🎉

Desejamos um bom projeto para todas as pessoas estudantes e que seja fonte de muito aprendizado. ✌️
