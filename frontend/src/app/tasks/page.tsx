"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { TaskTable } from "@/components/tasks/task-table"
import { TaskFilters } from "@/components/tasks/task-filters"
import { Button } from "@/components/ui/button"
import { useTasks } from "@/hooks/use-tasks"
import { useCategories } from "@/hooks/use-categories"
import { Task } from "@/types"
import { Plus, Search } from "lucide-react"

export default function TasksPage() {
  const { tasks, loading, deleteTask } = useTasks()
  const { categories } = useCategories()
  const [filters, setFilters] = useState({
    search: "",
    category: null as string | null,
    priority: null as string | null,
    status: null as string | null
  })

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Search filter
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase()) &&
          !task.description?.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }

      // Category filter
      if (filters.category && task.category.id !== filters.category) {
        return false
      }

      // Priority filter
      if (filters.priority && task.priority !== parseInt(filters.priority)) {
        return false
      }

      // Status filter
      if (filters.status && task.status !== filters.status) {
        return false
      }

      return true
    })
  }, [tasks, filters])

  const handleDeleteTask = async (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        console.error("Failed to delete task:", error)
      }
    }
  }

  const handleEditTask = (task: Task) => {
    // TODO: Open edit modal
    console.log("Edit task:", task)
  }

  return (
    <div className="flex-1 p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground mt-2">
            Manage and organize all your tasks
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </motion.div>

      {/* Filters */}
      <TaskFilters 
        categories={categories}
        onFilterChange={setFilters}
      />

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="flex justify-between items-center"
      >
        <p className="text-sm text-muted-foreground">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>
        {loading && (
          <p className="text-sm text-muted-foreground">Loading...</p>
        )}
      </motion.div>

      {/* Task Table */}
      <TaskTable
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  )
}
