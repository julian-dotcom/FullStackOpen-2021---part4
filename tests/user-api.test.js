const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


test('receive error when creating invalid user', async () => {
    const newUser = {
        username: 'as',
        name: 'Hallo',
        password: '1234'
    }
    await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
})
  


afterAll(() => {
    mongoose.connection.close()
})

