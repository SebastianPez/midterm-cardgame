exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('cards', function(table){
        table.string('url').notNull()
      })
    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
    knex.schema.table('cards', function(table){
      table.dropColumn('url')
    })
    ])
  }



