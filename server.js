const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authRouter = require('./auth/auth-router');
const issuesRouter = require('./issues/issuesRouters');
const userRouter = require('./users/userRouter');
const votesRouter = require('./votes/votesRouter')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter)
server.use('/api/user', userRouter)
server.use('/api/issues', issuesRouter)
server.use('/api/votes', votesRouter)

server.get('/', (req, res) => {
  res.status(200).json('API is working')
});


module.exports = server;