/// <reference types="cypress" />

const taskDetails = {};

describe('Check http://localhost:3000/api/tasks request', () => {
  it('GET 200 status on Get task list.', () => {
    cy.request({
      method: 'GET',
      url: `http://localhost:3000/api/tasks`,
    }).as('getTasks');

    cy.get('@getTasks').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.property('data');
    });
  });

  it('POST 200 status on add new task.', () => {
    cy.request({
      method: 'POST',
      url: `http://localhost:3000/api/tasks`,
      body: { title: 'test', description: 'test', status: 'Todo' },
    }).as('addTask');

    cy.get('@addTask').should((response: any) => {
      taskDetails['data'] = response.body.data;
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.property('data');
    });
  });

  it('PUT 200 status on edit existing task.', () => {
    cy.request({
      method: 'PUT',
      url: `http://localhost:3000/api/tasks/${taskDetails['data'].id}`,
      body: { title: 'test1', description: 'test1', status: 'InProgress' },
    }).as('editTask');

    cy.get('@editTask').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
      expect(response.body).to.have.property('data');
    });
  });

  it('DELETE 200 status on delete existing task.', () => {
    cy.request({
      method: 'DELETE',
      url: `http://localhost:3000/api/tasks/${taskDetails['data'].id}`,
    }).as('deleteTask');

    cy.get('@deleteTask').should((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property('headers');
    });
  });
});
