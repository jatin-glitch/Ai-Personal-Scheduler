# AI Personal Scheduler

A modern, production-ready SaaS dashboard UI for intelligent task scheduling and conflict resolution, built with Next.js, React, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Functionality
- **Dashboard**: Overview cards with animated stats and today's schedule
- **Task Management**: Advanced filtering, search, and table/card views
- **Scheduler View**: Timeline UI with drag-and-drop scheduling and conflict detection
- **AI Conflict Resolver**: Smart suggestions for resolving scheduling conflicts
- **Categories Management**: Color-coded organization system

### UI/UX Features
- **Dark Mode**: Full dark/light theme support with system preference detection
- **Keyboard Shortcuts**: Power-user navigation (press `Shift+?` to see all shortcuts)
- **Toast Notifications**: Non-intrusive feedback for user actions
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Design**: Mobile-friendly, desktop-first approach
- **Modern SaaS Design**: Inspired by Linear, Notion, and Stripe

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS with custom theme system
- **Animations**: Framer Motion (motion.dev)
- **Icons**: Lucide React
- **UI Components**: Custom component library with shadcn/ui patterns
- **State Management**: React hooks and context
- **TypeScript**: Full type safety

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎯 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Dashboard
│   ├── tasks/             # Task management
│   ├── scheduler/         # Timeline view
│   ├── conflicts/         # Conflict resolution
│   └── categories/        # Category management
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── dashboard/        # Dashboard-specific components
│   ├── tasks/            # Task management components
│   ├── scheduler/       # Scheduler components
│   ├── conflicts/        # Conflict resolution components
│   ├── categories/      # Category management components
│   └── layout/          # Layout components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API layer
├── types/               # TypeScript type definitions
└── components.json      # shadcn/ui configuration
```

## ⌨️ Keyboard Shortcuts

- `N` - Create new task
- `/` - Focus search
- `Shift+G` - Go to dashboard
- `T` - Go to tasks
- `S` - Go to scheduler
- `C` - Go to conflicts
- `K` - Open command palette
- `Shift+?` - Show all shortcuts

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Neutral grays
- **Accent**: Purple for highlights
- **Semantic**: Green (success), Red (error), Yellow (warning)

### Typography
- **Font**: Geist (system font stack)
- **Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### Spacing
- **Base**: 4px grid system
- **Components**: Consistent padding/margin using Tailwind classes

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for environment-specific configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### Theme Customization
Modify `src/app/globals.css` to customize the theme colors and design tokens.

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new).

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks

### Code Quality
- **ESLint**: Configured for Next.js and TypeScript
- **Prettier**: Code formatting (recommended)
- **TypeScript**: Strict mode enabled

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Icon library
- [shadcn/ui](https://ui.shadcn.com/) - Component library inspiration
