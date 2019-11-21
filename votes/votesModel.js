const db = require('../database/dbConfig')

module.exports = {
  getAllVotes,
  getVote,
  addVote,
  removeVote
}

function getVote(vote) {
  return db('votes')
  .where(vote)

}

function addVote(vote) {
  return db('votes')
  .insert(vote)
}

function removeVote(vote) {
  return db('votes')
  .where(vote)
  .del()
}
function getAllVotes() {
  return db('votes')
}