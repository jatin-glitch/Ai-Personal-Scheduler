# AI Personal Scheduler - Backend

A Java-based backend service for intelligent task scheduling and conflict resolution.

## 🚀 Features

### Core Functionality
- **Task Management**: CRUD operations for tasks with categories and priorities
- **Scheduling**: Time slot management with conflict detection
- **Conflict Resolution**: AI-powered suggestions for resolving scheduling conflicts
- **Data Persistence**: CSV-based storage for tasks and categories

### Architecture
- **Models**: Task, Category, TimeSlot entities
- **Services**: TaskManager, Scheduler, ConflictResolver
- **Controllers**: REST API endpoints for frontend integration
- **Utils**: DateTime utilities for formatting and parsing

## 🛠️ Tech Stack

- **Java 17**: Modern Java with latest features
- **Spring Boot 3.2**: REST API framework
- **Maven**: Dependency management and build tool
- **H2 Database**: In-memory database for development
- **Jackson**: JSON serialization/deserialization

## 📦 Setup & Installation

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Installation

1. Clone the repository
2. Navigate to the backend directory:
```bash
cd backend
```

3. Install dependencies:
```bash
mvn clean install
```

4. Run the application:
```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## 🎯 Project Structure

```
backend/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── scheduler/
│                   ├── controllers/     # REST API endpoints
│                   ├── models/          # Entity classes
│                   ├── service/         # Business logic
│                   ├── utils/           # Utility classes
│                   ├── SchedulerApplication.java  # Main class
│                   └── Main.java         # Console application
├── pom.xml                    # Maven configuration
└── README.md                  # This file
```

## 🔗 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `PUT /api/categories/{id}` - Update a category
- `DELETE /api/categories/{id}` - Delete a category

### Scheduling
- `GET /api/schedule` - Get scheduled tasks
- `POST /api/schedule` - Schedule a task
- `GET /api/conflicts` - Get detected conflicts
- `POST /api/resolve-conflict` - Resolve a conflict

## 📊 Data Models

### Task
```java
public class Task {
    private String title;
    private String description;
    private LocalDateTime deadline;
    private int priority; // 1-5
    private Category category;
    private boolean completed;
}
```

### Category
```java
public class Category {
    private String name;
}
```

### TimeSlot
```java
public class TimeSlot {
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Task task;
}
```

## 🔧 Configuration

### Application Properties
Create `src/main/resources/application.properties`:

```properties
server.port=8080
spring.application.name=ai-scheduler
spring.h2.console.enabled=true
spring.datasource.url=jdbc:h2:mem:scheduler
spring.jpa.hibernate.ddl-auto=create-drop
```

### Environment Variables
- `SERVER_PORT` - Server port (default: 8080)
- `DATABASE_URL` - Database connection string

## 🧪 Development

### Running Tests
```bash
mvn test
```

### Building for Production
```bash
mvn clean package
java -jar target/ai-personal-scheduler-1.0.0.jar
```

### Console Application
For testing without Spring Boot:
```bash
java -cp target/classes com.scheduler.Main
```

## 🔄 Integration with Frontend

The backend is designed to work seamlessly with the Next.js frontend:

1. **CORS Configuration**: Enabled for `http://localhost:3000`
2. **JSON Serialization**: Automatic conversion between Java objects and JSON
3. **Error Handling**: Standard HTTP status codes and error messages
4. **Data Validation**: Input validation for all API endpoints

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process using port 8080
   lsof -ti:8080 | xargs kill -9
   ```

2. **Maven Dependencies Issues**
   ```bash
   mvn clean install -U
   ```

3. **Java Version Mismatch**
   ```bash
   # Check Java version
   java -version
   # Set JAVA_HOME if needed
   export JAVA_HOME=/path/to/java17
   ```

## 🚀 Deployment

### Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/ai-personal-scheduler-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### Build and Run
```bash
docker build -t ai-scheduler .
docker run -p 8080:8080 ai-scheduler
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- H2 Database for the lightweight database solution
- Maven for dependency management
