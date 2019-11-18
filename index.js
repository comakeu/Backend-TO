// require('dotenv').config()

// const server = require('./server')
// const port = require('./config').port

// server.listen(port, () => {
//   console.log('listening on ' + port)
// })

const server = require('./server');

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
