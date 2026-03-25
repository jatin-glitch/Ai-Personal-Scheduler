"use client"

import { useState, useEffect } from "react"
import { Conflict } from "@/types"
import { api } from "@/lib/api"

export function useConflicts() {
  const [conflicts, setConflicts] = useState<Conflict[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchConflicts = async () => {
      try {
        setLoading(true)
        const data = await api.getConflicts()
        setConflicts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch conflicts")
      } finally {
        setLoading(false)
      }
    }

    fetchConflicts()
  }, [])

  const resolveConflict = async (conflictId: string, resolution: { taskId: string; newTime: Date }) => {
    try {
      await api.resolveConflict(conflictId, resolution)
      setConflicts(prev => prev.filter(conflict => conflict.id !== conflictId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to resolve conflict")
      throw err
    }
  }

  return {
    conflicts,
    loading,
    error,
    resolveConflict,
    refetch: () => {
      setLoading(true)
      setError(null)
      api.getConflicts().then(setConflicts).catch(err => {
        setError(err instanceof Error ? err.message : "Failed to fetch conflicts")
      }).finally(() => setLoading(false))
    }
  }
}
