# Contributing to AI Personal Scheduler

Thank you for your interest in contributing! This document provides guidelines for contributing to the AI Personal Scheduler project.

## 🏗️ Project Structure

```
Ai-Personal-Scheduler/
├── frontend/          # Next.js React application
├── backend/           # Spring Boot Java API
└── README.md         # Main project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ for frontend
- Java 17+ for backend
- Maven 3.6+ for backend

### Setup
1. Clone the repository
2. Set up frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Set up backend:
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```

## 📋 Development Guidelines

### Frontend (Next.js)
- Use TypeScript for all new code
- Follow existing component patterns
- Use Tailwind CSS for styling
- Add proper error handling and loading states
- Write meaningful commit messages

### Backend (Spring Boot)
- Follow Java naming conventions
- Use proper REST API patterns
- Add appropriate error handling
- Write unit tests for new features
- Document API endpoints

## 🎯 Code Style

### Frontend
- Use functional components with hooks
- Prefer composition over inheritance
- Use descriptive variable names
- Add JSDoc comments for complex functions

### Backend
- Use camelCase for variables
- Use PascalCase for classes
- Add JavaDoc for public methods
- Follow Spring Boot best practices

## 🧪 Testing

### Frontend
- Test components with React Testing Library
- Test user interactions
- Test error states
- Test responsive design

### Backend
- Write unit tests with JUnit
- Test REST endpoints
- Test error scenarios
- Use Mockito for mocking

## 📝 Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Bug Reports

When reporting bugs, please include:
- Description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, versions)
- Screenshots if applicable

## 💡 Feature Requests

For new features:
- Describe the use case
- Explain why it's valuable
- Suggest implementation approach
- Consider edge cases

## 📞 Communication

- Be respectful and constructive
- Ask questions if unsure
- Provide helpful feedback
- Follow the code of conduct

## 🏆 Recognition

Contributors will be acknowledged in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to AI Personal Scheduler! 🎉
