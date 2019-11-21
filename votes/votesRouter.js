const router = require('express').Router();
const votesDb = require('./votesModel');
const usersDb = require('../users/userModel');
const issuesDb = require('../issues/issuesModel');
const restricted = require('../auth/authenticate-middleware');

//middlewares

function validateUserId(req, res, next) {
  usersDb.findById(req.body.user_id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: "invalid user id"
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: `Can't load the user id ${error.message}`
    })
  })
};


function validateIssuesId(req, res, next) {
  issuesDb.getById(req.body.issues_id)
  .then(issue => {
    if (issue) {
      req.issue = issue;
      next();
    } else {
      res.status(400).json({
        message: "invalid issue id"
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: `Can't load the issue id ${error.message}`
    })
  })
};

function validateVotes(req, res, next) {
  if(req.body && req.body.user_id && req.body.issues_id) {
    next();
  } else {
    res.status(400).json({
      message: `user_id or issues_id missing`
    })
  }
}

function checkDuplicates(req, res, next) {
  votesDb.getVote(req.body)
  .then(data => {
    if(data.length) {
      res.status(401)
      .json({
        message: `Alredy voted`
      })
    } else {
      next();
    }
  })
  .catch(error => {
    res.status(500).json({
      message: `Error checking for duplicates`
    });
  });
}


router.post('/', [restricted, validateVotes, validateIssuesId, validateUserId, checkDuplicates], (req, res)=> {
  votesDb.addVote(req.body)
  .then(() => {
    res.status(201).json({
      message: `a vote successfully added`
    })
  })
  .catch(error => {
    res.status(500).json({
      message: `Error adding a vote ${error.message}`
    })
  })
})

router.delete('/:issue_id', [restricted, validateUserId, validateIssuesId], (req, res) => {
  votesDb.removeVote(req.params.user_id, req.params.issues_id)
  .then(() => {
    res.status(200).json({
      message: `Vote was deleted successfully`
    })
  })
  .catch(error => {
    res.status(500).json({
      message: `Error deleted vote ${error.message}`
  })
})
})

module.exports = router;






