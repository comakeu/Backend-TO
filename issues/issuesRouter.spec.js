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

describe('Issues', () => {

  describe('GET /', () => {
    test('should respond with status code 200 OK', async () => {
      const response = await request(server).get('/api/issues');
      expect(response.status).toBe(200)
    })
    it('should return JSON', () => {
      return request(server).get('/').then(res => {
        expect(res.type).toBe('application/json')
      })
    })
  })

  describe('POST /', () => {
    test('should add an issue, respond with status 201 and the new id of the prison', async () => {
      const issue = { description: 'Overgrown trees in our street', latitude: '60.56.21', longitude: '20.44', user_id: '1', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dirtroadpotholes.JPG/169px-Dirtroadpotholes.JPG' }
      const responsePost = await request(server).post('/api/issues').send(issue)
        .set('authorization', token)
      expect(responsePost.status).toBe(201);
      const expectedPost = { message: "Issue added successfully" }
      expect(responsePost.body).toEqual(expectedPost)
    })
    test('should not add an issue without a valid token', async () => {
      const issue = { description: 'Overgrown trees in our street', latitude: '60.56.21', longitude: '20.44', user_id: '1', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dirtroadpotholes.JPG/169px-Dirtroadpotholes.JPG' }
      const responsePost = await request(server).post('/api/issues').send(issue)
      expect(responsePost.status).toBe(401);
      const expectedPost = { message: 'Authentication failed' }
      expect(responsePost.body).toEqual(expectedPost)
    })
  })

  describe('PUT to  /api/issues/:id', () => {

    test('should not allow editing without a valid token', async () => {
      const changes = { first_name: "editTest" };
      const response = await request(server).put('/api/issues/1').send(changes);

      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Authentication failed' });
    })
  })

  describe('DELETE to /api/issues/:id', () => {
    
    test('It should not delete an issue without a valid token', async () => {
      const response = await request(server).delete('/api/issues/1');
      expect(response.status).toBe(401);
      expect(response.body).toEqual({ message: 'Authentication failed' })
    })
  })
})
