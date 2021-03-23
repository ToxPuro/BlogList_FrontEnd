

describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        username: 'Tester',
        name: 'Tester',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3001/api/users', user)
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains("Login")
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
          cy.get('#username').type('Tester')
          cy.get('#password').type('salainen')
          cy.get('#login-button').click()
          cy.contains('Tester logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('Nimi')
            cy.get('#password').type('salasana')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({username: 'Tester', password: 'salainen'})
        })
    
        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title').type('Testi')
            cy.get('#author').type('Tester')
            cy.get('#url').type('TestiUrl')
            cy.get('#create-blog-button').click()
            cy.contains('a new blog Testi by Tester added')

        })
      })

    describe('When blog is created', function() {
        beforeEach(function() {
            cy.login({username: 'Tester', password: 'salainen'})
            cy.createBlog({title: 'Testi', author: 'Tester', url: "TestiUrl", likes: 0})
        })
        it('blog can be liked', function() {
            cy.contains('view').click()
            cy.contains('likes: 0')
            cy.contains('like').click()
            cy.contains('likes: 1')
        })
        
        it('blog can be removed ', function() {
            cy.get('#viewTesti').click()
            cy.contains('remove').click()
            cy.get('#viewTesti').should('not.exist')
        })
    })

    describe('When list of blogs exists', function() {
        beforeEach(function() {
            cy.login({username: 'Tester', password: 'salainen'})
            cy.createBlog({title: 'LikedBlog', author: 'Tester', url: 'TestiUrl', likes: 1})
            cy.createBlog({title: 'Testi', author: 'Tester', url: "TestiUrl", likes: 0})
        })

        it('blogs are in correct order', function() {
            cy.get('#blogs').get('ul li:first').contains('LikedBlog')
            cy.get('#viewTesti').click()
            cy.contains('like').click()
            cy.contains('like').click()
            cy.contains('hide').click()
            cy.get('#blogs').get('ul li:first').contains('Testi')
        })
  })
})