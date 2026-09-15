# Contributing to Dating App

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Follow the project structure and coding standards
4. Write meaningful commit messages
5. Push to your fork: `git push origin feature/your-feature`
6. Open a Pull Request

## Development Setup

### Using Docker (Recommended)

```bash
git clone https://github.com/yourusername/dating-app.git
cd dating-app
docker-compose up
```

### Manual Setup

```bash
# Backend
cd backend
composer install
cp .env.example .env

# Frontend
cd ../frontend
npm install
npm start

# Chat Server
cd ../chat-server
npm install
npm start
```

## Coding Standards

### PHP
- Follow PSR-12 coding standard
- Use meaningful variable and function names
- Add documentation comments for functions

### JavaScript/React
- Use ES6+ features
- Follow Airbnb JavaScript style guide
- Add PropTypes for component validation
- Use functional components with hooks

### CSS
- Use BEM (Block Element Modifier) naming convention
- Organize styles by component
- Use Bootstrap 5 utilities

## Commit Messages

Use clear and descriptive commit messages:

```
Add user profile page
Fix: Resolve chat message timestamp issue
Refactor: Simplify authentication logic
Docs: Update deployment guide
```

## Pull Request Process

1. Update documentation as needed
2. Add tests for new features
3. Ensure all tests pass
4. Request review from maintainers
5. Address feedback and make updates
6. Squash commits if needed
7. Merge once approved

## Testing

```bash
# Backend tests
cd backend
phpunit

# Frontend tests
cd ../frontend
npm test

# Chat server tests
cd ../chat-server
npm test
```

## Reporting Issues

When reporting a bug, include:
- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots/logs if applicable

## Feature Requests

Include:
- Clear description of the feature
- Use case and motivation
- Suggested implementation (if any)
- Any alternative approaches

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Dating App! 🎉
