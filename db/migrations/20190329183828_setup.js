exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.addColumn('cards', function(table){
        table.string('url');
      })
    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropColumn('url')
    ])
  };