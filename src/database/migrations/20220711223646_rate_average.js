exports.up = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.string('average_rate');
    table.integer('like_number');
    table.integer('dislike_number');
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('average_rate');
    table.dropColumn('like_number');
    table.dropColumn('dislike_number');
  });
};
