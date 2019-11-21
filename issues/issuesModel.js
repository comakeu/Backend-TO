const db = require('../database/dbConfig');

module.exports = {
  get,
  getById,
  add,
  update,
  remove,
  getIssueVotes
}

function get() {
 return db('issues as i')
  .count('v.user_id', { as: 'votes' })
  .from('issues as i')
  .join('users as u', 'i.user_id', 'u.id')
  .leftJoin('votes as v', 'i.id', 'v.issues_id')
  .select('i.*', 'u.first_name', 'u.last_name')
  .groupBy('i.id', 'u.first_name', 'u.last_name') 
}

function getById(id) {
  return db('issues as i')
  .where({ id })
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

function getIssueVotes(issueId) {
  return db('votes as v')
  .join('users as u', 'u.id', 'v.user_id')
  .select('u.first_name', 'u.last_name')
  .where('v.issues_id', issueId)
}
