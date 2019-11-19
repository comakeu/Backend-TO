
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('votes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('votes').insert([
        {user_id: 1, issues_id: 2},
        {user_id: 2, issues_id: 3},
        {user_id: 3, issues_id: 4},
        {user_id: 3, issues_id: 1},
        {user_id: 2, issues_id: 1}
      ]);
    });
};
