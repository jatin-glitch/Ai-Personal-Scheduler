"use client"

import { useState, useEffect } from "react"
import { DashboardStats } from "@/types"
import { api } from "@/lib/api"

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalTasks: 0,
    scheduledTasks: 0,
    pendingTasks: 0,
    conflictsDetected: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await api.getDashboardStats()
        setStats(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard stats")
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return {
    stats,
    loading,
    error,
    refetch: () => {
      setLoading(true)
      setError(null)
      api.getDashboardStats().then(setStats).catch(err => {
        setError(err instanceof Error ? err.message : "Failed to fetch dashboard stats")
      }).finally(() => setLoading(false))
    }
  }
}
