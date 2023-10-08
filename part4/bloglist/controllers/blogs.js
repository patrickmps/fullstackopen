const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const data = request.body;

  const blog = new Blog({
    title: data.title,
    author: data.author,
    url: data.url,
    likes: data.likes || 0,
  });

  if (!blog.title || !blog.url) {
    return response.status(400).end();
  }

  const result = await blog.save();

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
