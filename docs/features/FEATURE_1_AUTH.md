# Feature 1: Access & Security (Authentication & Login)

## Overview

This feature implements user authentication with login/logout functionality and protected routes. It ensures only authenticated users can access the dashboard.

## Functional Requirements

### Objective
Guarantee that only authenticated users can access the application, with clear and testable user behavior.

### Functional Context
- Application has two main pages:
  - `/login` - Login page
  - `/dashboard` - Home page after authentication
- Authentication via HTTP `POST /api/auth/login`
- Token-based session persistence using browser storage

## User Scenarios (BDD)

### Scenario 1: Protected Access
**Given** an unauthenticated user  
**When** they access `/dashboard` directly  
**Then** they are automatically redirected to `/login`

### Scenario 2: Successful Login
**Given** a user on the login page  
**When** they enter valid credentials and submit  
**Then**
- `POST /api/auth/login` is called
- User is redirected to `/dashboard`
- An active session indicator is stored in browser storage

### Scenario 3: Failed Login
**Given** a user on the login page  
**When** they enter invalid credentials  
**Then**
- An error message is displayed
- User remains on `/login`
- No session token is stored

### Scenario 4: Session Persistence
**Given** an authenticated user  
**When** they reload the `/dashboard` page  
**Then**
- They remain on `/dashboard`
- No additional login call is triggered

## E2E Test Specifications

### Test Constraints
- ✅ Use only `data-cy` selectors
- ✅ Mock HTTP calls with `cy.intercept`
- ✅ No arbitrary `cy.wait` calls
- ✅ Tests must be independent
- ✅ Only Cypress tests (no Angular implementation)

### Expected UI Selectors (Minimal Contract)
- `data-cy=login-email` - Email input field
- `data-cy=login-password` - Password input field
- `data-cy=login-submit` - Submit button
- `data-cy=login-error` - Error message container
- `data-cy=dashboard-page` - Dashboard page container

## Test Location
`cypress/e2e/auth.login.cy.ts`

## Custom Cypress Commands

### `cy.login(email, password)`
Performs a complete login flow with mocked successful response.

```typescript
cy.login('user@example.com', 'password123');
```

### `cy.loginWithMock(email, password, options)`
Login with custom mock response options.

```typescript
cy.loginWithMock('user@example.com', 'password123', {
  statusCode: 401,
  error: 'Invalid credentials'
});
```

See `cypress/support/commands.ts` for implementation.

## Implementation Checklist

Once tests are passing (failing at first), implement:

- [ ] Create `/login` component with email/password form
- [ ] Create `/dashboard` component
- [ ] Create Auth Service with login method
- [ ] Implement Auth Guard for protected routes
- [ ] Set up route guards for `/dashboard`
- [ ] Implement localStorage for token persistence
- [ ] Add error handling and messages
- [ ] Implement session validation on app initialization

## Running Tests

```bash
# Run e2e tests in headless mode
ng e2e

# Open Cypress UI
npx cypress open

# Run specific test file
npx cypress run --spec cypress/e2e/auth.login.cy.ts
```

## Status
- ✅ Tests Created (Red)
- ⏳ Implementation Pending (Make tests Green)

## Notes
- All tests use mocked HTTP responses for independence and speed
- Tests follow BDD (Given-When-Then) structure
- Each test is self-contained and doesn't depend on execution order
