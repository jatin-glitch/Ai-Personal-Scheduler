# 🤖 AI Personal Scheduler

> **Intelligent scheduling that works around your life, not against it**

A modern, full-stack AI-powered personal scheduling application that automatically detects and resolves scheduling conflicts using intelligent algorithms. Built with Next.js 15 and Spring Boot 3.2, it combines a beautiful SaaS-inspired interface with smart conflict resolution to help you manage your time more effectively.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)](https://spring.io/projects/spring-boot)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)

## ✨ Why This Matters

Traditional calendar apps force you to manually resolve conflicts. **AI Personal Scheduler** automatically:
- 🧠 **Detects conflicts** across your schedule in real-time
- 💡 **Suggests optimal solutions** based on your priorities
- 🔄 **Adapts to your patterns** for smarter scheduling over time
- 📱 **Provides a seamless experience** across desktop and mobile

Perfect for busy professionals, students, and anyone juggling multiple commitments.

## � Demo & Screenshots

### 🌐 Live Demo
> **Coming Soon!** The application is currently in active development.

### 📸 Key Features in Action

#### Dashboard Overview
*![Dashboard showing today's schedule and animated stats](docs/screenshots/dashboard.png)*

#### AI Conflict Resolution
*![AI-powered conflict detection and resolution suggestions](docs/screenshots/conflict-resolution.png)*

#### Task Management
*![Advanced filtering and search interface](docs/screenshots/task-management.png)*

#### Timeline Scheduler
*![Drag-and-drop scheduling interface](docs/screenshots/scheduler-timeline.png)*

> **Note:** Screenshots will be added as the UI components are finalized. The application features a modern, dark-mode-first design inspired by Linear and Notion.

## �🏗️ Project Structure

```
Ai-Personal-Scheduler/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   ├── components/       # React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utilities and API layer
│   │   └── types/           # TypeScript definitions
│   ├── package.json
│   └── README.md
├── backend/                  # Spring Boot Java API
│   ├── src/
│   │   └── main/
│   │       └── java/
│   │           └── com/
│   │               └── scheduler/
│   │                   ├── controllers/  # REST API endpoints
│   │                   ├── models/       # Entity classes
│   │                   ├── service/      # Business logic
│   │                   └── utils/        # Utility classes
│   ├── pom.xml
│   └── README.md
├── old-java-src/            # Original Java console application
└── README.md               # This file
```

## 🚀 Getting Started

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Visit: http://localhost:3000

### Backend (Spring Boot)
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
API runs on: http://localhost:8080

## ✨ Features

### Frontend
- **Dashboard**: Overview with animated stats and today's schedule
- **Task Management**: Advanced filtering, search, and table views
- **Scheduler View**: Timeline UI with drag-and-drop scheduling
- **AI Conflict Resolver**: Smart suggestions for resolving conflicts
- **Categories Management**: Color-coded organization system
- **Dark Mode**: Full theme support with system preference
- **Keyboard Shortcuts**: Power-user navigation
- **Responsive Design**: Mobile-friendly, desktop-first

### Backend
- **REST API**: Full CRUD operations for tasks and categories
- **Conflict Detection**: AI-powered scheduling conflict resolution
- **Data Persistence**: H2 in-memory database
- **CORS Support**: Configured for frontend integration

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** with App Router
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons

### Backend
- **Java 17** with Spring Boot 3.2
- **Maven** for dependency management
- **H2 Database** for development
- **Jackson** for JSON processing

## 📱 UI Features

- Modern SaaS design inspired by Linear, Notion, and Stripe
- Smooth micro-interactions and transitions
- Skeleton loaders for loading states
- Toast notifications for user feedback
- Empty states with helpful illustrations

## ⌨️ Keyboard Shortcuts

- `N` - Create new task
- `/` - Focus search
- `Shift+G` - Go to dashboard
- `T` - Go to tasks
- `S` - Go to scheduler
- `C` - Go to conflicts
- `K` - Open command palette
- `Shift+?` - Show all shortcuts

## 🔗 API Endpoints

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/{id}` - Update task
- `DELETE /api/tasks/{id}` - Delete task

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

## 🎯 Development

### Frontend Development
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint          # Run ESLint
```

### Backend Development
```bash
cd backend
mvn spring-boot:run  # Start development server
mvn test             # Run tests
mvn clean package    # Build for production
```

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the excellent framework
- Spring Boot for robust backend development
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
