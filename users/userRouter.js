const router = require('express').Router();
const userDb = require('./userModel');
const restricted = require('../auth/authenticate-middleware');

//middlewares

function validateUserId(req, res, next) {
  userDb.findById(req.params.id)
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

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({
      message: "missing user data"
    })
  } else if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.phone) {
    res.status(400).json({
      message: "missing required input field"
    })
  } else {
    next();
  }
}


//Endpoints
router.get('/:id',[restricted, validateUserId], (req, res) => {
  res.json(req.user)
});

router.put('/:id', [restricted, validateUserId, validateUser], (req, res) => {
  userDb.update(req.user.id, req.body)
  .then(updatedUser => {
    res.status(200).json({
      message: `${updatedUser} user updated successfuly`
  })
})
  .catch(error => {
    res.status(500).json({
      error: `Error updating user ${error.message}`
    });
  });
});

router.delete('/:id', [restricted, validateUserId], (req, res) => {
  userDb.remove(req.user.id)
  .then(() => {
    res.status(200).json({
      message: 'This user has been deleted'
    })
  })
  .catch(error => {
    res.status(500).json({
      error: `Error removing the user ${error.message}`
    })
  })
})

router.get('/:id/issues', [restricted, validateUserId], (req, res) => {
  userDb.getUserIssues(req.user.id)
  .then(issues => {
    res.status(200).json(issues)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error fetching issues ${error.message}`
    });
  });
});

module.exports = router;