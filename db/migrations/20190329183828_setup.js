exports.up = function(knex, Promise) {
    return Promise.all([
      knex.schema.table('cards', function(table){
        table.string('url');
        table.integer('id');
      })
    ])
  };

  exports.down = function(knex, Promise) {
    return Promise.all([
      knex.schema.dropColumn('urls')
    ])
  };