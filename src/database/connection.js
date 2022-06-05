import knex from 'knex';

import config from '../../knexfile';

const environment = process.env.NODE_ENV || 'development';

const configuration = config[environment];

const registerService = (name, initFn) => {
  if (process.env.NODE_ENV === 'development') {
    if (!(name in global)) {
      global[name] = initFn();
    }
    return global[name];
  }
  return initFn();
};

export const connection = registerService('db', () => knex(configuration));
