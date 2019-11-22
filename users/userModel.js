const db = require('../database/dbConfig');

module.exports = {
  findBy,
  add,
  findById,
  update,
  remove,
  getUserIssues,
}

function findBy(filter) {
  return db('users').where(filter)
}

function findById(id) {
  return db('users')
  .select('id', 'email', 'first_name', 'last_name', 'phone')
  .where({ id })
  .first()
}

function add(users) {
  return db('users')
  .insert(users, 'id')
  .then(ids => {
    const [id] = ids;
    return findById(id)
  })
}

function update(id, changes) {
  return db('users')
  .where({ id})
  .update(changes)
}

function remove(id) {
  return db('users')
  .where('id', id)
  .del();
}

function getUserIssues(userId) {
  return db('issues as i')
  .join('users as u', 'u.id', 'i.user_id')
  .select('i.*')
  .where('i.user_id', userId)
}

