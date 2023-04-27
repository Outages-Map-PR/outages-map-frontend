import { slowCypressDown } from 'cypress-slow-down'
slowCypressDown()
describe('login', () => {
    it('user should be able to see the map', () => {
        cy.visit('http://localhost:3000/')

        cy.get('iframe')

    })
})