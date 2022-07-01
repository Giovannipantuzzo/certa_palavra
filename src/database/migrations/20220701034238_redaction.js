exports.up = function (knex) {
  return knex.schema.createTable('redaction', (table) => {
    table.uuid('redaction_id').primary().notNullable();
    table.string('firebase_id').notNullable();
    table.foreign('firebase_id').references('firebase_id').inTable('user').onDelete('cascade');
    table.string('title').notNullable();
    table.string('grade_1');
    table.string('grade_2');
    table.string('grade_3');
    table.string('grade_4');
    table.string('grade_5');
    table.string('final_grade');
    table.string('description');
    table.string('file_url').notNullable();
    table.boolean('status').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('corrected_at');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('redaction');
};
