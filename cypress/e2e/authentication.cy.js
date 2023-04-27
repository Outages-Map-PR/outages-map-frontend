import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown()
describe('Log-in/Sign Up', () => {
    it('user should be able to log in', () => {
        cy.visit('http://localhost:3000/login')

        // fill in the form
        cy.get('input[type="username"]').type('test2@gmail.com')
        cy.get('input[type="password"]').type('this_is_a_test')

        cy.get('button').contains('Login').click()

        cy.reload()

        cy.wait(500)



        cy.visit('http://localhost:3000/report')

        cy.contains('h1', 'Make a Report').should('be.visible')
        //
        // // submit the form
        // cy.get('button').contains('Sign in').click()
        // cy.contains('button', 'Logout').should('be.visible')
    })

    it('user should be able to sign up', () => {
        //cy.get("#close").click()
        cy.visit('http://localhost:3000/login')

        cy.get('button').contains('Sign Up').click()

        // fill in the form
        cy.get('input[type="name"]').type('E2E Tests')
        cy.get('input[type="email"]').type("test3@test.com")
        cy.get('input[type="phone"]').type("1234567890")
        cy.get('#password1').type('this_is_a_test')
        cy.get('#password2').type('this_is_a_test')

        cy.get('#sign-up').click()

        cy.contains('h3', 'User successfully created.').should('be.visible')
        //
        // // submit the form
        // cy.get('button').contains('Sign in').click()
        // cy.contains('button', 'Logout').should('be.visible')
    })
})