exports.up = function(knex, Promise) {
  return knex.schema.createTable('hands', function (table) {
    table.increments('id').primary();
    table.integer('player_id');
    table.integer('match_id');
    table.integer('round_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hands');
};
