const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
    //console.log('got to route handler')
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.likes === undefined) {body.likes = 0} //done for 4.11* 
    if (!body.title || !body.url) {
        response.status(400).end()        
    }
    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    })
    try {
        const savedBlog = await blog.save()
        response.json(savedBlog.toJSON())    
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/:id', async (request, response, next) => {
    try{
      const blog = await Blog.findById(request.params.id)
      if (blog) {
        response.json(blog)
      } else {
        response.status(404).end()
      }
    } catch(exception) {
      next(exception)
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findById(request.params.id) // make sure id exists first
        if (!blog) { response.status(404).end() }
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } catch (exception) {
        next(exception)
      }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body
        const blog = await Blog.findById(request.params.id) // make sure id exists first
        if (!blog) { response.status(404).end() }
        blog.likes = body.likes
        await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(blog.toJSON())
    } catch(exception) {
        next(exception)
      }
})

module.exports = blogsRouter
