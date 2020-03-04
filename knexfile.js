// Update with your config settings.
require('dotenv').config();
const pg = require('pg');
pg.defaults.ssl = true;


module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    },
   
    pool: {min:0,max:7}
  },

  testing: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    },
  },

  production: {
    client: 'pg',
    connection:  process.env.DATABASE_URL,
    migrations: {
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    },
  }

};
