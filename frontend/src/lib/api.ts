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
    try {
      const response = await fetch('http://localhost:8080/api/tasks')
      if (!response.ok) throw new Error('Failed to fetch tasks')
      return await response.json()
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return []
    }
  },

  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt">): Promise<Task> => {
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      })
      if (!response.ok) throw new Error('Failed to create task')
      return await response.json()
    } catch (error) {
      console.error('Error creating task:', error)
      throw error
    }
  },

  updateTask: async (id: string, updates: Partial<Task>): Promise<Task> => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      })
      if (!response.ok) throw new Error('Failed to update task')
      return await response.json()
    } catch (error) {
      console.error('Error updating task:', error)
      throw error
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete task')
    } catch (error) {
      console.error('Error deleting task:', error)
      throw error
    }
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
