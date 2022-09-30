import type { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'root',
      password: 'root',
      database: 'root',
    },
    migrations: {
      directory: './migrations',
    },
  },
};

module.exports = config;
