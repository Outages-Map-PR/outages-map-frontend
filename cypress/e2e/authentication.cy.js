import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown()
describe('login', () => {
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
})