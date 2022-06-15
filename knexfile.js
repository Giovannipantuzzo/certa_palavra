// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds',
    },
    useNullAsDefault: true,
    pool: {
      // afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
      min: 2,
      max: 10,
    },
  },
};
