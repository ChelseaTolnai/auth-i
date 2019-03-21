exports.seed = function(knex, Promise) {
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {username: 'CATolnai', password: 'password'},
        {username: 'DOGharams', password: 'password'},
        {username: 'JDoe', password: 'password'},
      ]);
    });
};
