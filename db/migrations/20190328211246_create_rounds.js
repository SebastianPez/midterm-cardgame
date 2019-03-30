exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', function (table) {
    table.increments('id').primary();
    table.integer('match_id');
    table.string('player1_name');
    table.string('player2_name');
    table.integer('player1_bid');
    table.integer('player2_bid');
    table.integer('player1_score');
    table.integer('player2_score');
    table.integer('round_number');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds');
};
