const db = require('../database/dbConfig')

module.exports = {
getAllVotes
}

function getAllVotes() {
  return db('votes')
}