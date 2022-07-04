exports.up = function (knex) {
  return knex.schema.createTable('redaction_comments', (table) => {
    table.uuid('comment_id').primary().notNullable();
    table.string('firebase_id').notNullable();
    table.foreign('firebase_id').references('firebase_id').inTable('user').onDelete('cascade');
    table.uuid('redaction_id').notNullable();
    table.foreign('redaction_id').references('redaction_id').inTable('redaction').onDelete('cascade');
    table.string('comment').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('redaction_comments');
};
