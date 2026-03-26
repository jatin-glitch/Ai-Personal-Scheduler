# Contributing to AI Personal Scheduler

Thank you for your interest in contributing! This document provides comprehensive guidelines for contributing to the AI Personal Scheduler project. We welcome contributions of all kinds - code, documentation, bug reports, and feature suggestions.

## 🎯 Our Mission

We're building an intelligent scheduling assistant that helps people manage their time more effectively. Our focus is on:
- **User experience**: Beautiful, intuitive interfaces
- **AI intelligence**: Smart conflict detection and resolution
- **Performance**: Fast, responsive applications
- **Accessibility**: Inclusive design for all users

## 🏗️ Project Architecture

```
Ai-Personal-Scheduler/
├── frontend/                 # Next.js React application (TypeScript)
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API layer
│   │   └── types/           # TypeScript type definitions
│   └── package.json
├── backend/                  # Spring Boot Java API
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── scheduler/
│   │                   ├── controllers/  # REST API endpoints
│   │                   ├── models/       # JPA entities
│   │                   ├── service/      # Business logic
│   │                   ├── dto/          # Data transfer objects
│   │                   └── utils/        # Utility classes
│   └── pom.xml
├── docs/                     # Documentation and screenshots
└── README.md               # Main project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+** and npm for frontend development
- **Java 17+** and **Maven 3.6+** for backend development
- **Git** for version control
- **VS Code** (recommended) with relevant extensions

### Initial Setup
1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR-USERNAME/Ai-Personal-Scheduler.git
   cd Ai-Personal-Scheduler
   ```

2. **Set up Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev          # Starts on http://localhost:3000
   ```

3. **Set up Backend**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run  # Starts on http://localhost:8080
   ```

4. **Verify Setup**
   - Frontend: Visit http://localhost:3000
   - Backend API: Visit http://localhost:8080/api/tasks
   - Both should load without errors

## 📋 Development Workflow

### 1. Create an Issue
- Check existing issues first
- Use appropriate labels (bug, enhancement, documentation)
- Provide clear description and reproduction steps for bugs

### 2. Branch Naming Convention
```bash
feature/description          # New features
bugfix/description           # Bug fixes
docs/update-contributing     # Documentation changes
refactor/component-name      # Code refactoring
```

### 3. Development Guidelines

#### Frontend (Next.js + TypeScript)
- **Component Structure**: Follow the existing component patterns in `/frontend/src/components`
- **Type Safety**: Use TypeScript for all new code - no `any` types
- **Styling**: Use Tailwind CSS classes, avoid inline styles
- **State Management**: Use React hooks (useState, useEffect, custom hooks)
- **Error Handling**: Implement proper error boundaries and loading states
- **API Calls**: Use the API layer in `/frontend/src/lib/api`
- **Testing**: Write tests for new components using React Testing Library

#### Backend (Spring Boot + Java)
- **Layer Architecture**: Follow Controller → Service → Repository pattern
- **REST Standards**: Use proper HTTP methods and status codes
- **Error Handling**: Implement `@ControllerAdvice` for global exception handling
- **Data Validation**: Use `@Valid` and Bean Validation annotations
- **Documentation**: Add OpenAPI/Swagger annotations for endpoints
- **Testing**: Write unit tests with JUnit 5 and integration tests
- **Security**: Sanitize inputs and implement proper authentication

### 4. Code Style & Standards

#### Frontend Code Style
```typescript
// ✅ Good: Proper typing and hooks
const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTaskComplete = useCallback(async (taskId: string) => {
    setIsLoading(true);
    try {
      await updateTask(taskId, { completed: true });
      onTaskUpdate?.();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      setIsLoading(false);
    }
  }, [onTaskUpdate]);
  
  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onComplete={handleTaskComplete} />
      ))}
    </div>
  );
};
```

#### Backend Code Style
```java
// ✅ Good: Proper layering and validation
@RestController
@RequestMapping("/api/tasks")
@Validated
public class TaskController {
    
    private final TaskService taskService;
    
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    
    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }
    
    @PostMapping
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody CreateTaskRequest request) {
        TaskDto created = taskService.createTask(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}
```

## 🧪 Testing Strategy

### Frontend Testing
```bash
cd frontend
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**What to test:**
- Component rendering with different props
- User interactions (clicks, form submissions)
- API integration (mock responses)
- Error states and loading states
- Responsive design behavior

### Backend Testing
```bash
cd backend
mvn test                   # Run all tests
mvn test -Dtest=TaskServiceTest  # Specific test class
mvn jacoco:report         # Coverage report
```

**What to test:**
- Service layer business logic
- REST endpoint responses
- Error handling scenarios
- Database operations
- Input validation

## 📝 Commit Guidelines

### Commit Message Format
```bash
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no functional changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(scheduler): add drag-and-drop task rescheduling
fix(api): handle null values in task creation
docs(readme): update installation instructions
test(components): add unit tests for TaskList component
```

## 🚀 Submitting Changes

### 1. Prepare Your Pull Request
```bash
# Ensure your branch is up to date
git checkout main
git pull upstream main
git checkout feature/your-feature
git rebase main

# Run tests and linting
npm run test    # Frontend
mvn test        # Backend
npm run lint    # Frontend linting
```

### 2. Create Pull Request
1. Push your branch: `git push origin feature/your-feature`
2. Open a Pull Request on GitHub
3. Fill out the PR template completely
4. Link any related issues
5. Request review from maintainers

### 3. PR Review Process
- **Automated checks**: Tests, linting, build status
- **Code review**: At least one maintainer approval
- **Integration testing**: Verify frontend and backend work together
- **Documentation**: Update relevant docs if needed

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
Clear, concise description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Environment
- OS: [e.g. macOS 13.0]
- Browser: [e.g. Chrome 108]
- Frontend: [e.g. Next.js 15]
- Backend: [e.g. Spring Boot 3.2]

## Additional Context
Screenshots, logs, or other relevant information
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear description of the proposed feature

## Problem Statement
What problem does this solve?

## Proposed Solution
How should this work from a user perspective?

## Implementation Ideas
Technical considerations or implementation approach

## Acceptance Criteria
- [ ] Criteria 1
- [ ] Criteria 2
- [ ] Criteria 3

## Priority
[ ] High - Critical for core functionality
[ ] Medium - Important improvement
[ ] Low - Nice to have
```

## 📞 Community & Communication

### Getting Help
- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and ideas
- **Code Review**: Participate in reviewing other PRs

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow professional communication standards

### Recognition & Contributions
Contributors will be acknowledged in:
- **README.md**: Contributors section with links
- **Release Notes**: Mentioned in relevant releases
- **Project Documentation**: Credit in feature documentation
- **GitHub Contributors**: Automatic recognition through GitHub

## 🏆 Recognition

We deeply value all contributions! Here's how we recognize our contributors:

### Contributor Tiers
- **🌟 Core Contributors**: Regular, high-quality contributions
- **💎 Feature Contributors**: Significant feature implementations
- **🐛 Bug Hunters**: Important bug discoveries and fixes
- **📚 Documentation Heroes**: Improving project documentation

### Perks
- Early access to new features
- Invitations to project planning discussions
- Mentorship opportunities
- Contributor badge on GitHub

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Guides](https://spring.io/guides)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

Thank you for contributing to AI Personal Scheduler! 🎉

---

**Every contribution, no matter how small, helps make this project better for everyone.**
