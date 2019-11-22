const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');
const generateToken = require('../auth/generateToken.js');
const bcrypt = require('bcryptjs');


beforeEach(async () => {
  await db('users').truncate()
})

let token;

beforeAll((done) => {
  token = generateToken('user');
  done();
})



describe('users', () => {

  describe('GET /api/user/:id',() => {

    test('Returns status code 200 and JSON data', async () => {
    const password = bcrypt.hashSync('12345', 10);
    await db('users').insert({ email: 'user1@gmail.com', password: password, first_name: 'test', last_name: 'user', phone: '00000' })
    const res = await request(server).post('/api/login').send({ email: 'user1@gmail.com', password: '12345'});  
    const token = res.body.token;
    return request(server).get('/api/user/4')
      .set('Authorization', `${token}`)
            .then(res => {
              expect(res.type).toBe('application/json')
      })
    })
    test('should respond with status code 200 OK', async () => {
      const response = await request(server).get('/api/prisons');
      expect(response.status).to
    })
  })

  // describe('PUT /api/user/:id endpoint', () => {
  //   test('returns status 200 on edit of valid user',async () => {
  //     const userObj = { id: 1, email: 'user1@gmail.com', password: '12345', first_name: 'test', last_name: 'user', phone: '00000' };
  //     await request(server)
  //     .post('/api/user')
  //     .send(userObj)
  //     .set('authorization', token);
  //     const changes = {first_name: 'edittest'};
  //     const response = await request(server).put('/api/user/1')
  //     .send(changes).set('authorization', token);
  //     const expected = { id: 1, email: 'user1@gmail.com', password: '12345', first_name: 'edittest', last_name: 'user', phone: '00000' }
  //     // expect(response.status).toBe(200);
  //     expect(response.body).toEqual(expected);
  //   })
  // })
})