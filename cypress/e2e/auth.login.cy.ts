/**
 * Feature 1: Access & Security (Login + Redirection)
 * 
 * This test suite covers authentication scenarios:
 * - Protected route access
 * - Successful login
 * - Failed login
 * - Session persistence
 */

describe('Feature 1: Authentication & Access Control', () => {
  const loginUrl = '/login';
  const dashboardUrl = '/dashboard';
  const apiLoginEndpoint = '/api/auth/login';

  beforeEach(() => {
    // Clear local storage before each test to ensure independence
    cy.clearLocalStorage();
  });

  // ============================================================
  // Scenario 1: Protected Access - Unauthenticated user redirected to login
  // ============================================================
  describe('Scenario 1: Protected route access', () => {
    it('should redirect unauthenticated user from /dashboard to /login', () => {
      cy.visit(dashboardUrl);
      cy.url().should('include', loginUrl);
    });

    it('should display login page when accessing dashboard without session', () => {
      cy.visit(dashboardUrl);
      cy.get('[data-cy=login-email]').should('be.visible');
      cy.get('[data-cy=login-password]').should('be.visible');
      cy.get('[data-cy=login-submit]').should('be.visible');
    });
  });

  // ============================================================
  // Scenario 2: Successful Login
  // ============================================================
  describe('Scenario 2: Successful login', () => {
    beforeEach(() => {
      cy.visit(loginUrl);
    });

    it('should send POST request to /api/auth/login with valid credentials', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      }).as('loginRequest');

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      cy.get('@loginRequest').should('have.been.calledOnce');
      cy.get('@loginRequest').then((interception) => {
        expect(interception.request.body).to.deep.include({
          email: 'user@example.com',
          password: 'password123'
        });
      });
    });

    it('should redirect to /dashboard after successful login', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      cy.url().should('include', dashboardUrl);
    });

    it('should display dashboard page after successful login', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      cy.get('[data-cy=dashboard-page]').should('be.visible');
    });

    it('should store authentication token in browser storage after login', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      cy.getAllLocalStorage().then((storage) => {
        const hasToken = Object.values(storage).some((s) =>
          JSON.stringify(s).includes('test-jwt-token-12345')
        );
        expect(hasToken).to.be.true;
      });
    });
  });

  // ============================================================
  // Scenario 3: Failed Login
  // ============================================================
  describe('Scenario 3: Failed login', () => {
    beforeEach(() => {
      cy.visit(loginUrl);
    });

    it('should display error message when login fails with invalid credentials', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 401,
        body: { error: 'Invalid credentials' }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('wrongpassword');
      cy.get('[data-cy=login-submit]').click();

      cy.get('[data-cy=login-error]').should('be.visible');
      cy.get('[data-cy=login-error]').should('contain', 'Invalid credentials');
    });

    it('should remain on login page after failed login', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 401,
        body: { error: 'Invalid credentials' }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('wrongpassword');
      cy.get('[data-cy=login-submit]').click();

      cy.url().should('include', loginUrl);
    });

    it('should not store token in browser storage after failed login', () => {
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 401,
        body: { error: 'Invalid credentials' }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('wrongpassword');
      cy.get('[data-cy=login-submit]').click();

      cy.getAllLocalStorage().then((storage) => {
        const hasToken = Object.values(storage).some((s) =>
          JSON.stringify(s).includes('token')
        );
        expect(hasToken).to.be.false;
      });
    });
  });

  // ============================================================
  // Scenario 4: Session Persistence
  // ============================================================
  describe('Scenario 4: Session persistence', () => {
    it('should remain on dashboard after page reload when authenticated', () => {
      // First, set up a logged-in session
      cy.visit(loginUrl);
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      });

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      // Verify we're on dashboard
      cy.url().should('include', dashboardUrl);
      cy.get('[data-cy=dashboard-page]').should('be.visible');

      // Reload the page
      cy.reload();

      // Should still be on dashboard
      cy.url().should('include', dashboardUrl);
      cy.get('[data-cy=dashboard-page]').should('be.visible');
    });

    it('should not trigger additional login request after page reload when session is active', () => {
      // First login
      cy.visit(loginUrl);
      cy.intercept('POST', apiLoginEndpoint, {
        statusCode: 200,
        body: {
          token: 'test-jwt-token-12345',
          user: { id: 1, email: 'user@example.com' }
        }
      }).as('firstLogin');

      cy.get('[data-cy=login-email]').type('user@example.com');
      cy.get('[data-cy=login-password]').type('password123');
      cy.get('[data-cy=login-submit]').click();

      cy.get('@firstLogin').should('have.been.calledOnce');

      // Reload and ensure no new login request is made
      cy.intercept('POST', apiLoginEndpoint, () => {
        throw new Error('Should not make additional login request');
      });

      cy.reload();

      // Small delay to ensure no request is made
      cy.wait(500);

      cy.url().should('include', dashboardUrl);
    });

    it('should access dashboard directly when session token exists in storage', () => {
      // Simulate having a valid token in storage
      cy.window().then((win) => {
        win.localStorage.setItem(
          'authToken',
          JSON.stringify({ token: 'test-jwt-token-12345' })
        );
      });

      cy.visit(dashboardUrl);

      // Should remain on dashboard without redirect to login
      cy.url().should('include', dashboardUrl);
      cy.get('[data-cy=dashboard-page]').should('be.visible');
    });
  });

  // ============================================================
  // Helper function for login (optional abstraction)
  // ============================================================
  // This helper can be moved to cypress/support/commands.ts
  function loginWithCredentials(email: string, password: string) {
    cy.visit(loginUrl);
    cy.intercept('POST', apiLoginEndpoint, {
      statusCode: 200,
      body: {
        token: 'test-jwt-token-12345',
        user: { id: 1, email }
      }
    });

    cy.get('[data-cy=login-email]').type(email);
    cy.get('[data-cy=login-password]').type(password);
    cy.get('[data-cy=login-submit]').click();
  }
});
