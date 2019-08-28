var shell = require('shelljs');
var request = require('supertest');
var app = require('./../app');
const configuration = require('./../knexfile')['development'];

const database = require('knex')(configuration);

describe('Recipes API', () => {
  test('Test GET /recipes path', async () => {
    return request('http://localhost:3000').get('/recipes?food=mango&limit=10')
    .then(response => {
      expect(response.status).toBe(201)
      expect(response.body).toEqual({ data: 'Added recipes to the database' })
    })
  })
})
