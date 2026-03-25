"use client"

import { useState, useEffect } from "react"
import { Task } from "@/types"
import { api } from "@/lib/api"

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true)
        const data = await api.getTasks()
        setTasks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks")
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [])

  const createTask = async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    try {
      const newTask = await api.createTask(taskData)
      setTasks(prev => [...prev, newTask])
      return newTask
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task")
      throw err
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const updatedTask = await api.updateTask(id, updates)
      setTasks(prev => prev.map(task => task.id === id ? updatedTask : task))
      return updatedTask
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task")
      throw err
    }
  }

  const deleteTask = async (id: string) => {
    try {
      await api.deleteTask(id)
      setTasks(prev => prev.filter(task => task.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task")
      throw err
    }
  }

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: () => {
      setLoading(true)
      setError(null)
      api.getTasks().then(setTasks).catch(err => {
        setError(err instanceof Error ? err.message : "Failed to fetch tasks")
      }).finally(() => setLoading(false))
    }
  }
}
