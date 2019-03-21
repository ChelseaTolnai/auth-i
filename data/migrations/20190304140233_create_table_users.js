exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(t) {
    t.increments();
    t.string('username', 128)
     .unique()
     .notNullable();
    t.string('password', 128)
     .notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
