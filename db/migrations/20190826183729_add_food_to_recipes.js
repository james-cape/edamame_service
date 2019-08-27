exports.up = function(knex, Promise) {
    return knex.schema.table('recipes', function(t) {
        t.string('food').notNull().defaultTo(0);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('recipes', function(t) {
        t.dropColumn('food');
    });
};
