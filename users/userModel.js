const db = require('../database/dbConfig');

module.exports = {
  findBy,
  add,
  findById
}

function findBy(filter) {
  return db('users').where(filter)
}

function findById(id) {
  return db('users')
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