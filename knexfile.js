// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'edamam_development',
      user:     'jamescape',
      password: null
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: {
      database: 'edamam_test',
      user:     'jamescape',
      password: null
    },
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev'
    },
    useNullAsDefault: true
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'edamam_staging',
      user:     'jamescape',
      password: null
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.HEROKU_DB_URL,
    migrations: {
      directory: './db/migrations'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
