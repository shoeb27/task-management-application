/// <reference types="cypress" />

describe('Application Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should render application header', () => {
    cy.get('header').should('be.visible');
    cy.log('Check header css property');
    cy.get('header').should('have.css', 'position', 'fixed');
  });

  it('Shuld show application brand name', () => {
    cy.get('header strong').should('be.visible');
    cy.log('Check header css property');
    cy.get('header strong').should('have.css', 'font-family', 'cursive');
    cy.get('header strong').should('have.css', 'color', 'rgb(255, 255, 255)');
    cy.get('header strong').should('have.css', 'font-size', '20px');
  });
});
