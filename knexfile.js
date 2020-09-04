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
    database: 'rogalabsdb1',
    user: 'postgres',
    password: 'my1234'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }


};
