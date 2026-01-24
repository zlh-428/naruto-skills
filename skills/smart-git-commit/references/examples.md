# Commit Message Examples

## Good Individual Commit Messages

### Features (feat)
- ✨ feat: add user authentication system
- ✨ feat: implement file upload functionality
- ✨ feat: add dark mode support
- ✨ feat: create responsive navigation component

### Bug Fixes (fix)
- 🐛 fix: resolve memory leak in rendering process
- 🐛 fix: prevent null pointer exception in parser
- 🐛 fix: correct timezone handling in date formatter
- 🩹 fix: address minor styling inconsistency in header
- 🚑️ fix: patch critical security vulnerability in auth flow

### Documentation (docs)
- 📝 docs: update API documentation with new endpoints
- 📝 docs: add installation instructions for developers
- 📝 docs: clarify usage in README examples

### Styling (style)
- 💄 style: format code with prettier
- 💄 style: standardize indentation to 2 spaces
- 🎨 style: reorganize component structure for better readability

### Refactoring (refactor)
- ♻️ refactor: simplify error handling logic in parser
- ♻️ refactor: extract common utilities to shared module
- 🚚 refactor: move database models to dedicated directory
- ⚰️ refactor: remove unused legacy code

### Performance (perf)
- ⚡️ perf: optimize database query with proper indexing
- ⚡️ perf: implement lazy loading for images
- ⚡️ perf: reduce bundle size by tree-shaking

### Testing (test)
- ✅ test: add unit tests for user authentication
- ✅ test: increase test coverage for parser module
- 🧪 test: add failing test for known issue
- 📸 test: update snapshots for UI components

### Tooling/Configuration (chore)
- 🔧 chore: upgrade eslint to version 9
- 🔧 chore: configure husky for pre-commit hooks
- 🔧 chore: improve developer tooling setup process
- 🧑‍💻 chore: improve developer tooling setup process

### CI/CD (ci)
- 🚀 ci: add GitHub Actions workflow for automated testing
- 🚀 ci: configure automated deployment to staging
- 👷 ci: add or update CI build system

### Breaking Changes (feat)
- 💥 feat: introduce breaking changes to API contract
- 💥 feat: remove deprecated endpoints

## Example of Splitting Large Changes

### Scenario: New API Endpoint with Documentation and Tests

**Instead of one large commit:**
```
❌ Big commit: Add new user API endpoint
```

**Split into focused commits:**
```
✨ feat: add new user API endpoint with CRUD operations
📝 docs: update API documentation for user endpoint
✅ test: add unit tests for user API validation
🔧 chore: update Swagger schema with new user models
🚨 fix: resolve linting issues in new endpoint code
🔒️ fix: add input validation to prevent SQL injection
```

### Scenario: Dependency Update with Code Adjustments

**Split commits:**
```
➕ chore: upgrade React from 18 to 19
👽️ fix: update code to align with React 19 API changes
🔧 chore: update TypeScript types for new React version
🚨 fix: resolve deprecation warnings from React 19
```

### Scenario: Database Migration

**Split commits:**
```
🗃️ db: create new users table with email index
📝 docs: document database schema changes in README
🔧 chore: add migration script to update existing data
✅ test: add integration tests for new database queries
```

### Scenario: Performance Optimization

**Split commits:**
```
⚡️ perf: implement Redis caching for frequent queries
⚡️ perf: add database query optimization with indexes
🧪 test: verify cache invalidation logic
📝 docs: update documentation with caching strategy
```

## When NOT to Split

### Small related changes - keep together:
```
✨ feat: add user profile page with avatar upload
```
This includes the UI component, API endpoint, and file upload logic - all related to one feature.

### Documentation updates matching code changes:
```
🐛 fix: correct email validation regex
📝 docs: update email format documentation
```
These can be separate commits if the docs update is substantial, otherwise combine:
```
🐛 fix: correct email validation regex and update docs
```

## Commit Message Structure

```
<emoji> <type>: <description>

[optional detailed body explaining the what and why]

[optional footer with references to issues]
```

### Example with body:
```
✨ feat: add user authentication system

Implement JWT-based authentication with the following features:
- User registration with email verification
- Secure login with rate limiting
- Password reset via email
- Session management with refresh tokens

Closes #123
```

## Guidelines for Writing Descriptions

1. **Use present tense, imperative mood**: "add feature" not "added feature" or "adds feature"
2. **Keep first line under 72 characters**: Focus on what changed and why
3. **Capitalize the subject line**: "Add feature" not "add feature"
4. **Don't end with a period**: Subject line should be concise
5. **Use the body to explain what and why**: Not how
6. **Can reference issues**: Closes #123, Fixes #456

## Splitting Guidelines

Consider splitting commits based on:

1. **Different concerns**: Changes to unrelated parts of the codebase
2. **Different types**: Mixing features, fixes, refactoring, etc.
3. **File patterns**: Source code vs documentation vs tests
4. **Logical grouping**: Changes easier to review separately
5. **Size**: Very large changes clearer if broken down

### Example of when to split:
- Adding a feature AND fixing a bug → 2 commits
- Updating docs AND refactoring code → 2 commits
- Source code changes AND test updates → Can be 1 or 2 commits depending on size

### Example of when to keep together:
- Small feature + its tests → 1 commit
- Bug fix + related documentation → 1 commit
