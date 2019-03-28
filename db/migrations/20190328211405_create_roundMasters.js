exports.up = function(knex, Promise) {
  return knex.schema.createTable('roundMasters', function (table) {
    table.increments('id').primary();
    table.integer('roundNO');
    table.integer('game_id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roundMasters');
};
