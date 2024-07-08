const fs = require('fs').promises;
const { defaultScripts } = require('../config/constants');

const checkScripts = async () => {
  const packageJson = await fs.readFile('app/backend/package.json');
  
  const packageJsonParsed = JSON.parse(packageJson);

  try {
    expect(packageJsonParsed.scripts['test']).toBe(defaultScripts.test);
    expect(packageJsonParsed.scripts['test:coverage']).toBe(defaultScripts['test:coverage']);
    expect(packageJsonParsed.scripts['test:coverage:json']).toBe(defaultScripts['test:coverage:json']);
    expect(packageJsonParsed.scripts['db:reset']).toBe(defaultScripts['db:reset']);
    expect(packageJsonParsed.scripts.build).toBe(defaultScripts.build);
    expect(packageJsonParsed.scripts.prestart).toBe(defaultScripts.prestart);
    expect(packageJsonParsed.scripts.start).toBe(defaultScripts.start);
    expect(packageJsonParsed.scripts.predev).toBe(defaultScripts.predev);
    expect(packageJsonParsed.scripts.dev).toBe(defaultScripts.dev);
    expect(packageJsonParsed.scripts.lint).toBe(defaultScripts.lint);
  } catch (error) {
    throw new Error('Scripts do backend/package.json foram alterados\n', error)
  }
};

module.exports = checkScripts;