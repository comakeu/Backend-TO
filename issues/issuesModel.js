const db = require('../database/dbConfig');

module.exports = {
  get,
  getById,
  add,
  update,
  remove
}

function get() {
  return db('issues')
}

function getById(id) {
  return db('issues')
  .where({ id})
  .first();
}

function add(issue) {
  return db('issues')
  .insert(issue)
  .then(ids => {
    return getById(ids[0])
  })
}

function update(id, changes) {
  return db('issues')
  .where({ id })
  .update(changes)
}

function remove(id) {
return db('issues')
.where( 'id', id )
.del()
}