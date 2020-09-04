
exports.up = function(knex) {
    return knex.schema.createTable('denuncias', table => {
        table.increments('id').primary()
        table.decimal('latitude')
        table.decimal('longitude')
        table.string('nome')
        table.string('cpf')
        table.string('titulo')
        table.string('descricao')
        table.string('logradouro')
        table.string('bairro')
        table.string('cidade').notNull()
        table.string('estado').notNull()
        table.string('pais').notNull()
        table.string('cep')
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('denuncias')
  
};

