exports.up = function (knex) {
  return knex.schema.createTable('login_attempts', (table) => {
    table.string('email').primary().unique().notNullable();
    table.integer('attempts').notNullable().defaultTo(0);
    table.timestamp('lock_time').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('login_attempts');
};
