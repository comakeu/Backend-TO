
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {email: 'johndoe@gmail.com', password: '1234', first_name: 'John', last_name: 'Doe', phone: '080111'},
        {email: 'janedoe@gmail.com', password: '12345', first_name: 'Jane', last_name: 'Doe', phone: '0802222'},
        {email: 'funmi@gmail.com', password: '123456', first_name: 'Funmi', last_name: 'Zara', phone: '080333'}
      ]);
    });
};
