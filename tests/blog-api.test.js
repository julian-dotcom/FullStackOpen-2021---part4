const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
  {
    title: 'aaa',
    author: 'aaa',
    url: 'aaa',
    likes: 111
  },
  {
    title: 'bbb',
    author: 'bbb',
    url: 'bbb',
    likes: 222
  },
  {
    title: 'ccc',
    author: 'ccc',
    url: 'ccc',
    likes: 333
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

// ---- 4.8 
test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
})


test('there are n blog posts', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

// ---- 4.10
test('testing whether blog was successfully added to data base: ', async () => {
    const newBlog = {
        title: "ccc",
        author: "ccc",
        url: "ccc",
        likes: "333"
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('ccc')

})

// ---- 4.11*
test('testing what happens when likes parameter isn\'t given', async () => {
    const newBlog = {
        title: "ccc",
        author: "ccc",
        url: "ccc"
        //likes intentionally missing
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
    const likes = response.body[response.body.length - 1].likes
    expect(likes).toEqual(0)
})

// ---- 4.12*
test('testing what happens when title or url parameter aren\'t given', async () => {
    const newBlog = {
        author: "ccc",
        url: "ccc"
        //likes intentionally missing
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        
})

// ---- 4.13
test('test whether you can delete a blog post', async () => {
    const response = await api.get('/api/blogs')
    //console.log(response.body)
    const initialLength = response.body.length
    //console.log('initialLength: ', initialLength)
    const firstBlogId = response.body[0].id
    //console.log(firstBlogId)
    await api
        .delete(`/api/blogs/${firstBlogId}`)
        .expect(204)

    const updatedResponse = await api.get('/api/blogs')
    expect(updatedResponse.body).toHaveLength(initialLength - 1)

})

// ---- 4.14 
test('test whether you can update a blog post\'s likes', async () => {
    const response = await api.get('/api/blogs')
    const firstId = response.body[0].id
    const newLikes = { likes: 1111111232323}
    const newResponse = await api  
                            .put(`/api/blogs/${firstId}`)
                            .send(newLikes)
    expect(newResponse.body.likes).toEqual(newLikes.likes)
})


afterAll(() => {
    mongoose.connection.close()
})

