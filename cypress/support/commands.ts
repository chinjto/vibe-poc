/**
 * Custom Cypress Commands for Vibe POC
 */

// Declare custom commands for TypeScript support
declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Login with email and password credentials
     * @param email User email
     * @param password User password
     * @example cy.login('user@example.com', 'password123')
     */
    login(email: string, password: string): Chainable<Subject>;

    /**
     * Login with intercepted API mock
     * Useful for controlling the response behavior
     * @param email User email
     * @param password User password
     * @param options Mock response options
     * @example cy.loginWithMock('user@example.com', 'password123', { token: 'mock-token' })
     */
    loginWithMock(
      email: string,
      password: string,
      options?: { statusCode?: number; token?: string; error?: string }
    ): Chainable<Subject>;
  }
}

/**
 * Login command - performs login with mocked API response
 */
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');

  // Mock successful login
  cy.intercept('POST', '/api/auth/login', {
    statusCode: 200,
    body: {
      token: 'test-jwt-token-12345',
      user: { id: 1, email }
    }
  });

  cy.get('[data-cy=login-email]').type(email);
  cy.get('[data-cy=login-password]').type(password);
  cy.get('[data-cy=login-submit]').click();

  // Wait for redirect
  cy.url().should('include', '/dashboard');
});

/**
 * Login with custom mock options
 */
Cypress.Commands.add(
  'loginWithMock',
  (
    email: string,
    password: string,
    options: { statusCode?: number; token?: string; error?: string } = {}
  ) => {
    const { statusCode = 200, token = 'test-jwt-token-12345', error } = options;

    cy.visit('/login');

    const mockResponse =
      statusCode === 200
        ? {
            token,
            user: { id: 1, email }
          }
        : {
            error: error || 'Login failed'
          };

    cy.intercept('POST', '/api/auth/login', {
      statusCode,
      body: mockResponse
    });

    cy.get('[data-cy=login-email]').type(email);
    cy.get('[data-cy=login-password]').type(password);
    cy.get('[data-cy=login-submit]').click();
  }
);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
