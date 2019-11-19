
exports.up = function(knex) {
  return knex.schema
  .createTable('users', users => {
    users.increments();
    users.string('email', 255)
    .notNullable()
    .unique();
    users.string('password', 255)
    .notNullable();
    users.string('first_name', 255)
    .notNullable();
    users.string('last_name', 255)
    .notNullable();
    users.string('phone').notNullable();
  })
  .createTable('issues', issues => {
    issues.increments();
    issues.text('description')
    .notNullable();
    issues.float('latitude');
    issues.float('longitude');
    issues.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    issues.string('imgURL').notNullable();
  })
  .createTable('votes', votes => {
    votes.integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onUpdate('CASCADE')
    .onDelete('CASCADE')
    votes.integer('issues_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('issues')
    .onUpdate('CASCADE')
    .onDelete('CASCADE');
    votes.primary(['user_id', 'issues_id'])
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('votes')
  .dropTableIfExists('issues')
  .dropTableIfExists('users')
};
