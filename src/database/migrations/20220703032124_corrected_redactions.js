exports.up = function (knex) {
  return knex.schema.createTable('corrected_redactions', (table) => {
    table.string('firebase_id').notNullable();
    table.foreign('firebase_id').references('firebase_id').inTable('user').onDelete('cascade');
    table.uuid('redaction_id').notNullable();
    table.foreign('redaction_id').references('redaction_id').inTable('redaction').onDelete('cascade');
    table.boolean('rate').defaultTo(null);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('corrected_redactions');
};
