# Commit Message Convention

This project follows **Conventional Commits** specification.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (formatting, semicolons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, or other non-code changes
- **ci**: Changes to CI/CD configuration
- **revert**: Reverts a previous commit

## Scope

Optional. The scope specifies what is affected by the change (e.g., `auth`, `api`, `ui`, `core`).

## Subject

- Use imperative mood ("add" not "added")
- Don't capitalize first letter
- No period (.) at the end
- Limit to 50 characters

## Body

Optional. Explain what and why, not how. Each line should be no longer than 72 characters.

## Footer

Optional. Reference issues and breaking changes:
- `Closes #123`
- `BREAKING CHANGE: description`

## Examples

```
feat(auth): add login functionality

Implement JWT-based authentication system for user login.
Add token validation and refresh mechanisms.

Closes #42

fix(button): correct hover state color

The button hover state was using wrong color value.
Changed from #FF0000 to #FF5733 for better visibility.

docs: update README with setup instructions

refactor(api): simplify request handler

BREAKING CHANGE: removed deprecated /v1/api endpoint
```
