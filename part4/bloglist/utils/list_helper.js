const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs) => blogs.reduce((favorite, blog) => (
  blog.likes > favorite?.likes ? {
    title: blog.title, author: blog.author, likes: blog.likes,
  } : favorite), { likes: 0 });

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
