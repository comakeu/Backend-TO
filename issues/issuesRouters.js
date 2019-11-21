const router = require('express').Router();
const IssuesDb = require('./issuesModel');
const restriction = require('../auth/authenticate-middleware');


// custom middleware
function validateIssueId(req, res, next) {
  IssuesDb.getById(req.params.id)
  .then(issue => {
    if (issue) {
      req.issue = issue;
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
  } else if (!req.body.description || !req.body.latitude || !req.body.longitude || !req.body.user_id
   || !req.body.imgURL) {
    res.status(400).json({
      message: 'Missing required text field'
    })
  } else {
    next()
  }
}

router.get('/', (req, res) => {
  IssuesDb.get()
  .then(issues => {
    res.status(200).json(issues)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error fething issues ${error.message}`
    });
  });
});

router.get('/:id/', validateIssueId, async (req,res)=> {
  try {
    const issue = await IssuesDb.getById(req.params.id);
    const votes = await IssuesDb.getIssueVotes(req.params.id);
    const result = {
      ...issue,
      votes
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
       message: `Unable to get the issue ${error.message}` 
      });
  }
})


router.post('/', validateIssue, (req,res) => {
  IssuesDb.add(req.body)
  .then(() => {
    res.status(201).json({
      message: `Issue added successfully`
    });
  })
  .catch(error => {
    res.status(500).json({
      error: `Error adding the issue ${error.message}`
    });
  });
});

router.put('/:id', [restriction, validateIssue, validateIssueId], (req, res) => {
  IssuesDb.update(req.issue.id, req.body)
  .then(updatedIssue => {
    res.status(200).json({
      message: `${updatedIssue} issue updated successfully`
    })
  })
  .catch(error => {
    res.status(500).json({
      error: `Error updating issue ${error.message}`
    });
  });
});

router.delete('/:id', [restriction, validateIssueId], (req, res) => {
  IssuesDb.remove(req.issue.id)
  .then(() => {
    res.status(200).json({
      message: `The issue has been deleted successfully`
    })
  })
  .catch(error => {
    res.status(500).json({
      error: `The issue was unable to be deleted ${error.message}`
    })
  })
})


module.exports = router;