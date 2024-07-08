const { resolve } = require('path');

module.exports = {
  prefix: 'trybe-eval-tfc',
  challengesFolder: resolve('app'),
  containerPorts: {
    frontend: 3000,
    backend: 3001,
    database: 3306,
  },
  jwtSecret: process.env.JWT_SECRET || "jwt_secret",
  defaultDelay: 5000,
  defaultRounds: 30,
  puppeteerDefs: {
    headless: !(process.env.SHOW_BROWSER === "true"),
    slowMo: 5,
    baseUrl: "http://localhost",
    pause: {
      brief: 500,
      medium: 2000,
      long: 5000
    }
  },
  sequelizeDefs: {
    username: 'root',
    password: '123456',
    database: 'TRYBE_FUTEBOL_CLUBE',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: false,
  },
  numbers: {
    one: 1,
    three: 3
  },
  defaultScripts: {
    "test": "mocha -r ts-node/register ./src/tests/*$NAME*.{test,spec}.ts -t 10000 --exit",
    "test:coverage": "nyc npm run test",
    "test:coverage:json": "nyc --reporter=json-summary npm run test",
    "db:reset": "npx tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
    "build": "tsc --project tsconfig.json",
    "prestart": "npm run build && npm run db:reset",
    "start": "node ./build/server.js",
    "predev": "npm run db:reset",
    "dev": "tsnd --watch \"./src/**\" --transpile-only ./src/server.ts",
    "lint": "eslint ./src --ext .ts"
  },
};
