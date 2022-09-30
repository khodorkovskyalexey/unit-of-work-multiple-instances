import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('cats', (t) => {
    t.increments('id').primary();
    t.string('name');
  });

  return knex.schema.createTable('dogs', (t) => {
    t.increments('id').primary();
    t.string('name');
  });
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('cats');
  return knex.schema.dropTable('dogs');
}

