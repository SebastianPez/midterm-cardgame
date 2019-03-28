exports.up = function(knex, Promise) {
  return knex.schema.createTable('rounds', function (table) {
    table.increments('id').primary();
    table.integer('match_id');
    table.string('player_id');
    table.integer('points');
    table.integer('roundMaster_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('rounds');
};
