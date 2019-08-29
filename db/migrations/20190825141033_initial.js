exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('recipes', function(table) {
      table.increments('id').primary();
      table.string('label').notNullable();
      table.string('image').notNullable();
      table.string('url').notNullable();
      table.float('yield').notNullable();              // number of servings
      table.float('calories').notNullable();
      table.float('totalWeight').notNullable();
      // t.string('ingredients').notNullable();     //would require another table
      // t.string('totalNutrients').notNullable();  //would require another table
      // t.string('totalDaily').notNullable();      //would require another table
      // t.string('dietLabels').notNullable();      //would require another table
      // t.string('healthLabels').notNullable();    //would require another table

      // table.timestamps(true, true);
    })
  ])
};


exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('recipes')
  ]);
};
