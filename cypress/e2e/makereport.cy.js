import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown()
describe('Make a Report', () => {
    it('user should be able to make a report (logged out)', () => {

        cy.visit('http://localhost:3000/report')

        cy.contains('h1', "Please log in to make a report").should('be.visible')

        //
        // // submit the form
        // cy.get('button').contains('Sign in').click()
        // cy.contains('button', 'Logout').should('be.visible')
    })

    it('user should be able to make a report (logged in)', () => {
        cy.visit('http://localhost:3000/login')

        // fill in the form
        cy.get('input[type="username"]').type('test2@gmail.com')
        cy.get('input[type="password"]').type('this_is_a_test')

        cy.get('button').contains('Login').click()

        cy.reload()

        cy.wait(500)

        cy.visit('http://localhost:3000/report')

        cy.get('input[type="address"]').type("Arecibo, PR")

        cy.get('select[type="type"]').select("water")

        cy.get('input[type="company"]').type("AAA")

        cy.get('button').contains('Make a Report').click()

        //
        // // submit the form
        // cy.get('button').contains('Sign in').click()
        // cy.contains('button', 'Logout').should('be.visible')
    })


})