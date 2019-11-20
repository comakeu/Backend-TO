const router = require('express').Router();
const IssuesDb = require('./issuesModel');


// custom middleware
function validateUserId(req, res, next) {
  IssuesDb.getById(req.params.id)
  .then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({
        message: 'Invalid user Id'
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: `Can't load the user id ${error.message}`
    });
  });
};

function validateIssue(req, res, next) {
  if(!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'missing issue data'
    })
  } else if (!req.body.description || !req.body.latitude || !req.body.longitude
   || !req.body.imgURL) {
    res.status(400).json({
      message: 'Missing required text field'
    })
  } else {
    next()
  }
}

router.get('/', (req, res) => {
  IssuesDb.get(req.body)
  .then(issues => {
    res.status(200).json(issues)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error fething issues ${error.message}`
    });
  });
});

router.get('/:id/', validateUserId, (req,res) => {
  IssuesDb.getById(req.user.id)
  .then(issues => {
    res.status(200).json(issues)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error fetching issues ${error.message}` 
    })
  })
})

// router.post('/:id/issues', validateIssue, (req,res) => {
//   IssuesDb.add(req.body)
//   .then(issue => {
//     res.status(201).json(issue);
//   })
//   .catch(error => {
//     res.status(500).json({
//       error: `Error adding the issue ${error.message}`
//     });
//   });
// });


module.exports = router;