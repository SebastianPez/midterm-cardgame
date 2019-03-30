
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cards', function (table) {
    table.increments('id').primary();
    table.string('suit');
    table.integer('value');
    table.integer('hand_id')
    table.string('boolean')
    table.integer('match_id')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cards');
};
