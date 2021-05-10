const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

/* // Here from before
blogsRouter.get('/', (request, response) => {
    response.send('<h1>Hello, world!</h1>')
})
*/

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
    const body = request.body
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    blog
    .save()
    .then(result => {
        response.status(201).json(result)
    })
    .catch((error) => console.error(error))
})

module.exports = blogsRouter
