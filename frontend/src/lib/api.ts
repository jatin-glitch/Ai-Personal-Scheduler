import { Task, Category, Conflict, DashboardStats, ScheduleSlot } from "@/types"

// Mock data
const mockCategories: Category[] = [
  { id: "1", name: "Work", color: "#3B82F6", icon: "briefcase" },
  { id: "2", name: "Personal", color: "#10B981", icon: "user" },
  { id: "3", name: "Health", color: "#F59E0B", icon: "heart" },
  { id: "4", name: "Learning", color: "#8B5CF6", icon: "book" },
  { id: "5", name: "Finance", color: "#EF4444", icon: "dollar-sign" }
]

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Team Standup Meeting",
    description: "Daily sync with the development team",
    category: mockCategories[0],
    priority: 4,
    deadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    status: "scheduled",
    duration: 30,
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "2", 
    title: "Code Review",
    description: "Review pull requests from team members",
    category: mockCategories[0],
    priority: 3,
    deadline: new Date(Date.now() + 4 * 60 * 60 * 1000),
    status: "pending",
    duration: 45,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
  },
  {
    id: "3",
    title: "Gym Workout",
    description: "Upper body strength training",
    category: mockCategories[2],
    priority: 2,
    deadline: new Date(Date.now() + 6 * 60 * 60 * 1000),
    status: "scheduled",
    duration: 60,
    scheduledTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: "4",
    title: "Project Planning",
    description: "Plan next sprint tasks and milestones",
    category: mockCategories[0],
    priority: 5,
    deadline: new Date(Date.now() + 8 * 60 * 60 * 1000),
    status: "conflict",
    duration: 90,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: "5",
    title: "Online Course - React Patterns",
    description: "Complete module 3 of advanced React course",
    category: mockCategories[3],
    priority: 3,
    deadline: new Date(Date.now() + 24 * 60 * 60 * 1000),
    status: "pending",
    duration: 120,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  }
]

const mockConflicts: Conflict[] = [
  {
    id: "1",
    tasks: [mockTasks[3], mockTasks[1]],
    suggestedSlots: [
      {
        id: "s1",
        startTime: new Date(Date.now() + 10 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 11.5 * 60 * 60 * 1000),
        isAvailable: true
      },
      {
        id: "s2", 
        startTime: new Date(Date.now() + 14 * 60 * 60 * 1000),
        endTime: new Date(Date.now() + 15.5 * 60 * 60 * 1000),
        isAvailable: true
      }
    ],
    detectedAt: new Date()
  }
]

// API functions
export const api = {
  // Tasks
  getTasks: async (): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return mockTasks
  },

  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    mockTasks.push(newTask)
    return newTask
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const taskIndex = mockTasks.findIndex(t => t.id === id)
    if (taskIndex === -1) throw new Error("Task not found")
    
    mockTasks[taskIndex] = {
      ...mockTasks[taskIndex],
      ...updates,
      updatedAt: new Date()
    }
    return mockTasks[taskIndex]
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const taskIndex = mockTasks.findIndex(t => t.id === id)
    if (taskIndex === -1) throw new Error("Task not found")
    mockTasks.splice(taskIndex, 1)
  },

  // Categories
  getCategories: async (): Promise<Category[]> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    return mockCategories
  },

  createCategory: async (category: Omit<Category, "id">): Promise<Category> => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const newCategory: Category = {
      ...category,
      id: Math.random().toString(36).substr(2, 9)
    }
    mockCategories.push(newCategory)
    return newCategory
  },

  // Conflicts
  getConflicts: async (): Promise<Conflict[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    return mockConflicts
  },

  resolveConflict: async (conflictId: string, resolution: { taskId: string; newTime: Date }): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500))
    // In a real app, this would update the task schedule
    console.log("Resolving conflict:", conflictId, resolution)
  },

  // Dashboard Stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      totalTasks: mockTasks.length,
      scheduledTasks: mockTasks.filter(t => t.status === "scheduled").length,
      pendingTasks: mockTasks.filter(t => t.status === "pending").length,
      conflictsDetected: mockConflicts.length
    }
  },

  // Schedule
  getSchedule: async (date: Date): Promise<ScheduleSlot[]> => {
    await new Promise(resolve => setTimeout(resolve, 400))
    // Generate hourly slots for the given date
    const slots: ScheduleSlot[] = []
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    
    for (let i = 0; i < 24; i++) {
      const startTime = new Date(startOfDay.getTime() + i * 60 * 60 * 1000)
      const endTime = new Date(startOfDay.getTime() + (i + 1) * 60 * 60 * 1000)
      
      slots.push({
        id: `slot-${i}`,
        startTime,
        endTime,
        isAvailable: true
      })
    }
    
    return slots
  }
}
