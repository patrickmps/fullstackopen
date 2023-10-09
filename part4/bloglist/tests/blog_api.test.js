const mongoose = require('mongoose');
const supertest = require('supertest');
const bcrypt = require('bcrypt')
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user')
const helper = require('./test_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 1000000);

  test('checks if the id is with underscore', async () => {
    const { body } = await api.get('/api/blogs');
    body.forEach((blog) => expect(blog.id).toBeDefined());
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(b => b.title)

    expect(titles).toContain(
      'Go To Statement Considered Harmful'
    )
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);

    expect(titles).toContain(
      'First class tests',
    );
  });

  test('blog without likes is not added', async () => {
    const newBlog = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('a blog can\'t be added without title or url', async () => {
    const newBlog = {
      title: '',
      author: 'Robert C. Martin',
      url: '',
      likes: 2,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);
  });
})

describe('deletion of a blog', () => {
  test('a valid blog can be deleted', async () => {
    let blogsAtEnd = await helper.blogsInDb();
    const blogsId = blogsAtEnd.map((b) => b.id);

    const toBeDeleted = blogsId[0]

    await api
      .delete(`/api/blogs/${toBeDeleted}`)
      .expect(204)

    blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    expect(blogsId).toContain(
      toBeDeleted
    );
  });
})

describe('updating a blog', () => {
  test('a valid blog can be updated', async () => {
    const blog = {
      title: 'Blog do Tulio',
      author: 'Tulio Calil',
      url: 'https://tuliocalil.com/',
      likes: 8,
    }

    const blogsAtEnd = await helper.blogsInDb()
    const toBeUpdated = blogsAtEnd[0]

    const { body: result } = await api.put(`/api/blogs/${toBeUpdated.id}`).send(blog).expect(200);

    expect({ title: result.title, author: result.author, url: result.url, likes: result.likes }).toEqual(blog)
  });
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('the user can\'t be added with username/password invalid', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ml',
      name: 'Matti Luukkainen',
      password: 'sa',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})

afterAll(async () => {
  await mongoose.connection.close();
});