describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Patrick Mota',
      username: 'trick',
      password: 'trick123'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('trick');
      cy.get('#password').type('trick123');
      cy.get('#login-button').click();

      cy.contains('logout');
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('.notification')
        .contains('Wrong credentials')
        .should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'trick', password: 'trick123' });
    });

    it('A blog can be created', function () {
      cy.contains('add blog').click();
      cy.get('#input-title').type('Cypress Blog');
      cy.get('#input-author').type('Cypress author');
      cy.get('#input-url').type('https://cypress.io');
      cy.contains('create').click();
      cy.get('.notification').contains('a new blog Cypress Blog by Cypress author');
    });

    it('A blog can be liked', function () {
      cy.createBlog({ title: 'Cypress Blog', author: 'Cypress author', url: 'https://cypress.io' });
      cy.contains('view').click();
      cy.contains('likes 0').parent().contains('like').click();
      cy.contains('likes 1');
    });

    it('A blog can be removed', function () {
      cy.createBlog({ title: 'Cypress Blog', author: 'Cypress author', url: 'https://cypress.io' });
      cy.contains('view').click();
      cy.contains('remove').click();
      cy.get('.notification').contains('blog as been removed');
    });

    it("A blog can't be removed by another user", function () {
      cy.createBlog({ title: 'Cypress Blog', author: 'Cypress author', url: 'https://cypress.io' });
      cy.contains('logout').click();

      const user = {
        name: "Ba'alzamon",
        username: 'ishmael',
        password: 'ishmael123'
      };
      cy.request('POST', 'http://localhost:3001/api/users/', user);

      cy.contains('login').click();
      cy.get('#username').type('ishmael');
      cy.get('#password').type('ishmael123');
      cy.get('#login-button').click();

      cy.contains('view').click();

      cy.get('#hidden').should('not.contain', 'remove');
    });

    it('blogs are ordered according to likes', function () {
      cy.createBlog({
        title: 'The title with the most likes',
        author: 'first',
        url: 'https://cypress.io'
      });
      cy.createBlog({
        title: 'The title with the second most likes',
        author: 'second',
        url: 'https://cypress.io'
      });

      cy.get('.blog').eq(0).contains('view').click();
      cy.get('.blog').eq(0).contains('likes 0').parent().contains('like').click();

      cy.get('.blog').eq(1).contains('view').click();
      cy.get('.blog').eq(1).contains('likes 0').parent().contains('like').click();

      cy.get('.blog').eq(1).contains('likes 1').parent().contains('like').click();

      cy.get('.blog').eq(0).should('contain', 'likes 2');
      cy.get('.blog').eq(1).should('contain', 'likes 1');
    });
  });
});
