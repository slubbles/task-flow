# Contributing to TaskFlow 🤝

First off, thank you for considering contributing to TaskFlow! It's people like you that make TaskFlow such a great tool.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to provide a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
   ```bash
   git clone https://github.com/YOUR-USERNAME/task-flow.git
   cd task-flow
   ```
3. **Create a branch** for your changes
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Install dependencies** (see main README.md)
5. **Make your changes**
6. **Test your changes**
7. **Commit and push** your changes
8. **Create a Pull Request**

## 💻 Development Workflow

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm run dev
```

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### Database Changes
```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

## 📤 Submitting Changes

1. **Update your fork** with the latest changes from main
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create a Pull Request** with a clear title and description

3. **Reference any related issues** in your PR description

4. **Wait for review** - maintainers will review your PR and may request changes

## 📏 Coding Standards

### JavaScript/TypeScript
- Use meaningful variable and function names
- Write comments for complex logic
- Follow existing code style
- Use TypeScript types when applicable

### React/Next.js
- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow React best practices

### API/Backend
- Follow RESTful conventions
- Validate all inputs
- Handle errors properly
- Document API endpoints

## 📝 Commit Messages

Use clear and meaningful commit messages:

```
feat: Add user profile page
fix: Resolve login redirect issue
docs: Update API documentation
style: Format code with prettier
refactor: Simplify task filtering logic
test: Add tests for project creation
```

**Format:** `type: description`

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style/formatting
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Maintenance tasks

## 🐛 Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details

## 💡 Suggesting Features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) and include:
- Clear description of the feature
- Why it's needed
- How it should work
- Examples or mockups

## ❓ Questions?

Feel free to:
- Open an issue with your question
- Check existing issues for answers
- Review the documentation

## 🙏 Thank You!

Your contributions make TaskFlow better for everyone. We appreciate your time and effort! ⭐

---

**Happy Coding!** 🚀
