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

module.exports = blogsRouter;
