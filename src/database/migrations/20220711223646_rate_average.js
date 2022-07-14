exports.up = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.string('average_rate');
    table.integer('like_number').defaultTo(0);
    table.integer('dislike_number').defaultTo(0);
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('average_rate');
    table.dropColumn('like_number');
    table.dropColumn('dislike_number');
  });
};
