exports.up = function(knex, Promise) {
  return knex.schema.createTable('hands', function (table) {
    table.increments('id').primary();
    table.integer('player_name');
    table.integer('match_id');
    table.integer('round_id');
    table.string('card_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('hands');
};
