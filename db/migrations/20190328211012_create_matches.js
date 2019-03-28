exports.up = function(knex, Promise) {
  return knex.schema.createTable('matches', function (table) {
    table.increments('id').primary();
    table.integer('game_id');
    table.string('player1_name');
    table.string('player2_name');
    table.string('match_date');
    table.string('winner');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('matches');
};
