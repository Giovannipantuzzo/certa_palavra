exports.up = function (knex) {
  return knex.schema.createTable('essay_status', (table) => {
    table.uuid('essay_status_id').primary().notNullable();
    table.string("user_firebase_id").notNullable();
    table.string("corrector_firebase_id").notNullable();
    table.string('grade_1').notNullable();
    table.string('grade_2').notNullable();
    table.string('grade_3').notNullable();
    table.string('grade_4').notNullable();
    table.string('grade_5').notNullable();
    table.string('final_grade').notNullable();
    table.boolean('status').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('essay_status');
};
