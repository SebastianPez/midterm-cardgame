exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('cards', function(table){
        table.addColumn('url');
      })
    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropColumn('url')
    ])
  };