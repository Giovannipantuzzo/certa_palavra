exports.up = async function (knex) {
  await knex.schema.alterTable('redaction', (table) => {
    table.string('redaction_corrector_id');
  });
  await knex.schema.raw(`
                    ALTER TABLE "redaction"
                    ALTER COLUMN "redaction_corrector_id"
                    DROP DEFAULT;
                    `);
};

exports.down = async function (knex) {
  await knex.schema.alterTable('redaction', (table) => {
    table.dropColumn('redaction_corrector_id');
  });
};
