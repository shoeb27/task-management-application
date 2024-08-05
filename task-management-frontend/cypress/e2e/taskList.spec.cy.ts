/// <reference types='cypress' />

describe('Task List', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should should show main content', () => {
    cy.get('main div').should('be.visible');
  });

  it('Should show header of card', () => {
    cy.get('main .ant-typography').should('be.visible');
    cy.get('main .ant-typography').should('have.text', 'Task List');
    cy.log('Checking style properties for task list table header');
    cy.get('main .ant-typography').should('have.css', 'font-size', '20px');
    cy.get('main .ant-typography').should(
      'have.css',
      'color',
      'rgba(0, 0, 0, 0.88)'
    );
  });

  it('Should show add task button', () => {
    cy.get('[type="button"]').should('be.visible');
    cy.get('[type="button"]').should('have.text', 'Add Task');
    cy.get('[type="button"]').should('not.be.disabled');
    cy.get('[type="button"]').should(
      'have.css',
      'border-color',
      'rgb(145, 202, 255)'
    );
  });

  it('Should work button action for add task', () => {
    cy.get('[type="button"]').click();
    cy.get('.ant-modal-content').should('be.visible');
  });
});
