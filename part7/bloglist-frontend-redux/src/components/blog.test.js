import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';
import BlogForm from './BlogForm';

test('renders content', async () => {
  const user = {
    username: 'patrickmps'
  };
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'patrickmps',
      name: 'Patrick'
    }
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const element = await screen.findByText('React patterns Michael Chan', { exact: false });
  expect(element).toBeDefined();

  const div = container.querySelector('#hidden');
  expect(div).toHaveStyle('display: none');
});

test('clicking the button calls event handler once', async () => {
  const user = {
    username: 'patrickmps'
  };
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'patrickmps',
      name: 'Patrick'
    }
  };

  const { container } = render(<Blog blog={blog} user={user} />);

  const handleUserEvent = userEvent.setup();
  const button = screen.getByText('view');
  await handleUserEvent.click(button);

  const div = container.querySelector('#hidden');
  expect(div).not.toHaveStyle('display: none');
});
test('clicking the button 2 times calls event handler two times', async () => {
  const user = {
    username: 'patrickmps'
  };
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      username: 'patrickmps',
      name: 'Patrick'
    }
  };

  const updateBlog = jest.fn();

  render(<Blog blog={blog} user={user} updateBlog={updateBlog} />);

  const handleUserEvent = userEvent.setup();
  const button = screen.getByText('like');

  await handleUserEvent.click(button);
  await handleUserEvent.click(button);

  expect(updateBlog).toHaveBeenCalledTimes(2);
});

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/'
  };

  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('Write the blog title here');
  const inputAuthor = screen.getByPlaceholderText('Insert blog author here');
  const inputUrl = screen.getByPlaceholderText('Write the blog address here');
  const sendButton = screen.getByText('create');

  await user.type(inputTitle, blog.title);
  await user.type(inputAuthor, blog.author);
  await user.type(inputUrl, blog.url);
  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toStrictEqual(blog);
});
