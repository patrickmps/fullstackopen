const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog');
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const data = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes || 0,
    user: user.id
  });

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const result = await blog.save();

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result);
});

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const blog = await Blog.findById(id)

  return response.status(200).json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)

  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true })

  return response.status(200).json(result)
})

module.exports = blogsRouter;
