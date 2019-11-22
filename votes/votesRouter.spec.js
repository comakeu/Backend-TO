const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');
const generateToken = require('../auth/generateToken.js');


beforeEach(async () => {
  await db('users').truncate()
})

let token;

beforeAll((done) => {
  token = generateToken('user');
  done();
})

describe('Votes', () => {

  describe('POST /', () => {
    test('should not add a vote without token porvided', async () => {
      const vote = {user_id: '1', issue_id: '2'}
      const response = await request(server).post('/api/votes').send(vote)
            expect(response.status).toBe(401);
            const expected = { message: 'Authentication failed' }
            expect(response.body).toEqual(expected)
    })
  })

  describe('DELETE /', () => {
    test('Should not delete a vote without token provided', async () => {
      const vote = {user_id: 1, issue_id: 2}
      const response = await request(server).post('/api/votes').send(vote)
      expect(response.status).toBe(401);
      const expected = { message: 'Authentication failed' }
      expect(response.body).toEqual(expected)
    })
  })
})
