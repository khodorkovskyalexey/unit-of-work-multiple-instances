import Knex from "knex";
import { Model } from "objection";

export const initObjectionClient = () => {
  const knex = Knex({
    client: 'pg',
    debug: true,
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'root',
      password: 'root',
      database: 'root',
    },
  });

  Model.knex(knex);
  return knex;
}

