const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');

const bcrypt = require('bcryptjs');

beforeEach(async () => {
  await db('users').truncate()
})

describe('Users', () => {

  describe('POST /register', async () => {
    test('Should return a status of 201', async () => {
      const response = await request(server).post('/api/auth/register')
      .send({ email: 'user@gmail.com', password: '1234', first_name:'test',
              last_name: 'user', phone: '00000'})
      expect(response.status).toBe(201)
    })
    test('should register a user successfully', async () => {
      const newUser = await request(server).post('/api/auth/register')
      .send({ email: 'user1@gmail.com', password: '12345', first_name:'test',
              last_name: 'user1', phone: '00000'})
      expect(newUser.body.email).toMatch(/user1@gmail.com/)
    })
  })

  describe('POST /login', async () => {
    test('should return 200 status', async () => {
      await db('users').insert({
        email: 'user@gmail.com', password: bcrypt.hashSync('1234', 10), first_name: 'test', last_name: 'user', phone: '00000'
      })
      const res = await request(server).post('/api/auth/login')
      .send({
        email: 'user@gmail.com',
        password: '1234'
      })
      .set('Content-Type', 'application/json')
      expect(res.status).toBe(200)
    })

    test('Token should exist', async () => {
      await db('users').insert({
        email: 'user@gmail.com', password: bcrypt.hashSync('1234', 10), first_name: 'test', last_name: 'user', phone: '00000'
      })
      const res = await request(server).post('/api/auth/login')
      .send({
        email: 'user@gmail.com',
        password: '1234'
      })
      .set('Content-Type', 'application/json')
      expect(res.body.token).toBeTruthy()
    })
  })
})