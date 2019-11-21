const db = require('../database/dbConfig');
const request = require('supertest');
const server = require('../server');

const bcrypt = require('bcryptjs');

beforeEach(async () => {
  await db('users').truncate()
})

describe('User', () => {
  describe('GET /:id', () => {

    test('Returns json OK', () => {
      return request(server).get('/api/user')
      .expect('Content-Type', /json/)
    });

    test('Should return 200 status', () => {
      return request(server).get('/api/user')
      .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijo2LCJlbWFpbCI6InVzZXIyQGdtYWlsLmNvbSIsImlhdCI6MTU3NDI4MjkzMiwiZXhwIjoxNTc0MzY5MzMyfQ.g4njZNIY2atgaXuhKmrooSv51nz-Hpe8jyPJ5N_a3ZY')
      .then(res => {
        expect(res.status).toBe(200)
      })
    })
  })
})