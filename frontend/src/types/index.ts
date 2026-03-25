export interface Task {
  id: string
  title: string
  description?: string
  category: Category
  priority: 1 | 2 | 3 | 4 | 5
  deadline: Date
  status: 'scheduled' | 'pending' | 'conflict' | 'completed'
  duration: number // in minutes
  scheduledTime?: Date
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  color: string
  icon?: string
}

export interface ScheduleSlot {
  id: string
  startTime: Date
  endTime: Date
  task?: Task
  isAvailable: boolean
}

export interface Conflict {
  id: string
  tasks: Task[]
  suggestedSlots: ScheduleSlot[]
  detectedAt: Date
}

export interface DashboardStats {
  totalTasks: number
  scheduledTasks: number
  pendingTasks: number
  conflictsDetected: number
}
