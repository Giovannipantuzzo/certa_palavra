exports.up = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.string('perfil_photo_url');
  });
  await knex.schema.raw(`
                    ALTER TABLE "user"
                    ALTER COLUMN "perfil_photo_url"
                    DROP DEFAULT;
                    `);
};

exports.down = async function (knex) {
  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('perfil_photo_url');
  });
};
