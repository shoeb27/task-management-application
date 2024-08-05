/// <reference types='cypress' />

const createTask = {
  data: null,
};

const inputField = () => {
  cy.get('#title').should('be.visible');
  cy.get('#title')
    .type('Sample Task')
    .should('have.focus')
    .should('have.value', 'Sample Task');
};

const descriptionField = () => {
  cy.get('#description').should('be.visible');
  cy.get('#description')
    .type('Sample Task')
    .should('have.focus')
    .should('have.value', 'Sample Task');
};

const statusField = () => {
  cy.get('.ant-select').should('be.visible');
  cy.get('.ant-select').click();
  cy.wait(10);
  cy.get('.ant-select-item-option-content').contains('Todo').click();
  cy.get('.ant-select').click();
  cy.get('.ant-select-item-option-content').contains('InProgress').click();
};

describe('Add new task dialog', () => {
  before(() => {
    cy.intercept('http://localhost:3000/api/tasks', response => {
      if (response.method === 'POST' && response.body.success === true) {
        createTask['data'] = response.body.data;
      }
    });
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('[type="button"]').contains('Add Task').click();
  });

  context('Should form validation work', () => {
    it('Should save and cancel button visible', () => {
      cy.get('[name="save"]').should('be.visible');
      cy.get('[name="save"]').should('have.text', 'Save');
      cy.get('[name="Cancel"]').should('be.visible');
      cy.get('[name="Cancel"]').should('have.text', 'Cancel');
    });

    it('Should not be submitted while form is empty', () => {
      cy.get('[name="save"]').click();
      cy.get('#title_help:first-child').should(
        'have.text',
        'Please input a title!'
      );
      cy.get('#description_help:first-child').should(
        'have.text',
        'Please input a description!'
      );
      cy.get('#status_help:first-child').should(
        'have.text',
        'Please input a status!'
      );
    });

    it('Should validation working properly', () => {
      cy.log('Check validation for title field.');
      inputField();
      cy.get('#title').clear().should('not.have.value');
      cy.get('#title_help:first-child').should(
        'have.text',
        'Please input a title!'
      );

      cy.log('Check validation for description field.');
      descriptionField();
      cy.get('#description').clear().should('not.have.value');
      cy.get('#description_help:first-child').should(
        'have.text',
        'Please input a description!'
      );

      cy.log('Check validation for status field.');
      statusField();
    });

    it('Should modal dismiss while clicking on cancel button', () => {
      cy.get('[name="Cancel"]').click();
    });
  });

  context('Add/Edit/Delete task', () => {
    it('Should create new task', () => {
      inputField();
      descriptionField();
      statusField();

      cy.get('[name="save"]').click();
    });
  });
});
