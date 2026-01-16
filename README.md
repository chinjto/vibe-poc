# Vibe POC

> A Proof of Concept project to enhance vibe coding skills and explore **BDD (Behavior-Driven Development)** with AI-generated e2e tests.

## About This Project

This POC serves as a learning playground to:
- 🎯 Improve coding practices and architectural decisions
- 🤖 Experiment with AI-assisted test generation for e2e scenarios
- 📋 Implement BDD principles using Cypress
- 🔄 Iterate quickly on feature development with automated test coverage

## Tech Stack

- **Framework**: Angular 20+ with standalone components
- **Styling**: SCSS
- **Testing**: Cypress for e2e and component testing
- **Package Manager**: npm
- **Routing**: Angular Router

## Quick Start

### Prerequisites
- Node.js (v20+)
- npm

### Installation

```bash
npm install
```

### Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/`

### Running E2E Tests

```bash
ng e2e
```

Or open Cypress UI:

```bash
npx cypress open
```

### Building for Production

```bash
ng build
```

Output will be in `dist/` directory.

## Commit Convention

This project follows [Conventional Commits](COMMIT_CONVENTIONS.md). All commits are validated via commitlint hooks.

Example:
```bash
git commit -m "feat(auth): add login functionality"
```

Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

## Project Structure

```
src/
├── app/           # Application components & services
├── index.html     # Main HTML
└── styles.scss    # Global styles

cypress/
├── e2e/          # End-to-end test specifications
├── fixtures/     # Test data
└── support/      # Test utilities & commands
```

## Resources

- [Angular Documentation](https://angular.dev)
- [Cypress Documentation](https://docs.cypress.io)
- [Conventional Commits](https://www.conventionalcommits.org)
