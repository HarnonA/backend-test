// Update with your config settings.

module.exports = {

  // development: {
  //   client: 'postgresql',
  //   connection: {
  //     filename: './dev.sqlite3'
  //   }
  // },



  client: 'postgresql',
  connection: {
    database: 'rogalabsdb',
    user: 'postgres',
    password: ''
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }


};
