const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', { title: 1, author: 1, url: 1, date: 1 }) // show information on the blogs created by a user
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = await request.body
    if (!body.password || body.password.length < 3) {
        response.status(400).json({ error: 'password is required and must be at least 3 characters long' })
    }
    if (!body.username || body.username.length < 3) {
        response.status(400).json({ error: 'username is required and must be at least 3 characters long' })
    }
    const saltRounds = 10

    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
})

module.exports = usersRouter