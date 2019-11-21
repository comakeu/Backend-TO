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
   const issue = { description: 'Overgrown trees in our street', latitude: '60.56.21', longitude: '20.44', user_id:'1', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dirtroadpotholes.JPG/169px-Dirtroadpotholes.JPG'} 
   const responsePost = await request(server).post('/api/issues').send(issue)
   .set('authorization', token)
   expect(responsePost.status).toBe(201);
   const expectedPost = {"message": "Issue added successfully"}
   expect(responsePost.body).toEqual(expectedPost)
  })
})

// describe('PUT to  /api/issues/:id', () => {
//   test('should edit the issue, and return the updated issue', async () => {
//     const issueToUpdate = {description: 'Too many potholes in our street', latitude: '60.564.21', longitude: '20.31.44', user_id:'1', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dirtroadpotholes.JPG/169px-Dirtroadpotholes.JPG'}
//     await request(server).post('api/issues').send(issueToUpdate)
//     .set('authorization', token);
//     const changes = { description: 'so many potholes'}
//     const response = await request(server).put('/api/issues/1')
//     .send(changes).set('authorization', token);
//     const expected = { message: `1 issue updated successfully` }
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expected)
//   });
// })
})
