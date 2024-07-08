# Boas vindas ao repositório do Trybe Futebol Clube!

  O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

  No desenvolvimento do `TFC`, criei uma API (utilizando o método `TDD`) e também integrei *- através do docker-compose -* as aplicações para que elas funcionem consumindo um banco de dados.

  Nesse projeto, construi **um back-end dockerizado utilizando modelagem de dados através do Sequelize**, respeitando regras de negócio do projeto. A API é capaz de ser consumida pelo front-end. 🚀

  

  <details>
  <summary><strong> Regras de negócios da página de classificação dos times: </strong></summary>
  

    - `Classificação`: Posição na classificação;
    - `Time`: Nome do time;
    - `P`: Total de Pontos;
    - `J`: Total de Jogos;
    - `V`: Total de Vitórias;
    - `E`: Total de Empates;
    - `D`: Total de Derrotas;
    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos;
    - `SG`: Saldo total de gols;
    - `%`: Aproveitamento do time.

  - Todas as regras de negócio e cálculos necessários deverão ser realizados no seu back-end. A aplicação front-end - que já está pronta - apenas renderizará essas informações.

  - Para calcular o `Total de Pontos`, você deve levar em consideração que:

    - O time `vitorioso`: marcará +3 pontos;
    - O time `perdedor`: marcará 0 pontos;
    - Em caso de `empate`: ambos os times marcam +1 ponto.

  - Para o campo `Aproveitamento do time (%)`, que é a porcentagem de jogos ganhos, use a seguinte fórmula: `[P / (J * 3)] * 100`, onde:

    - `P`: Total de Pontos;
    - `J`: Total de Jogos.

    Obs.: O seu resultado deverá ser limitado a `duas casas decimais`.

  - Para calcular `Saldo de Gols` use a seguinte fórmula: `GP - GC`, onde:

    - `GP`: Gols marcados a favor;
    - `GC`: Gols sofridos.

  - O resultado deverá ser ordenado sempre de forma decrescente, levando em consideração a quantidade de pontos que o time acumulou. Em caso de empate no `Total de Pontos`, você deve levar em consideração os seguintes critérios para desempate:

  **Ordem para desempate**

  - 1º Total de Vitórias;
  - 2º Saldo de gols;
  - 3º Gols a favor;

  - Os endpoints dessa seção, irão alimentar uma tabela idêntica ao exemplo abaixo no front-end:

    | Classificação | Time        | P   | J   | V   | E   | D   | GP  | GC  | SG  | %    |
    | ------------- | ----------- | --- | --- | --- | --- | --- | --- | --- | --- | ---- |
    | 1             | Ferroviária | 38  | 15  | 12  | 2   | 1   | 44  | 13  | 31  | 84.4 |
</details>

## Variáveis de ambiente

Para rodar o backend separadamente, é necessário adicionar as variáveis de ambiente no seu `.env`. Pode alterar o arquivo `.env.example` no projeto e após retirar o `.exemple`, ficando apenas `.env`.

## Rodando o projeto localmente

Clone o projeto
```
git clone 
```
Entre no diretório do projeto
```
cd project-trybe-futebol-clube
```

Instale as dependências na raíz do projeto e nos diretórios backend e frontend
```
npm install && npm run install:apps
```

## Rodando o Docker Compose

Entre no diretório `app`
```
cd app
```

Execute os containers
```
npm run compose:up
```
### Acesse o app através do endpoint http://localhost:3000/

Para parar a execução dos containers rode o comando
```
npm run compose:down
```

## Rodando os testes do Back-end

Entre no diretório `backend`
```
cd app/backend
```

Execute os testes
```
npm run test
```

Para saber a cobertura dos testes
```
npm run test:coverage
```
