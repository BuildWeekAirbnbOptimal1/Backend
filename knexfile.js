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
   
    pool: {min:0,max:7}
  },

  testing: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    migrations: {
      directory: 'database/migrations'
    }
  },

  production: {
    client: 'pg',
    connection:  process.env.DATABASE_URL,
    migrations: {
      directory: 'database/migrations'
    }
  }

};
