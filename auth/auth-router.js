const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../users/userModel');

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  Users.add(user)
  .then(addedUSer => {
    res.status(201).json({
      message: `${addedUSer.user} User registered successfully`
    })
  })
  .catch(error => {
    res.status(500).json(error.message)
  });
});

module.exports = router;