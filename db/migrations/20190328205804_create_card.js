
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function (table) {
    table.increments('id').primary();
    table.integer('player_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
