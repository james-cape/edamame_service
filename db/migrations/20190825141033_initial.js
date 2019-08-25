exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('recipes', function(table) {
      table.increments('id').primary();
      t.string('title').notNullable();
      t.string('password').notNullable();

      table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
};
