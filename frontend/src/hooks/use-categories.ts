"use client"

import { useState, useEffect } from "react"
import { Category } from "@/types"
import { api } from "@/lib/api"

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const data = await api.getCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch categories")
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const createCategory = async (categoryData: Omit<Category, "id">) => {
    try {
      const newCategory = await api.createCategory(categoryData)
      setCategories(prev => [...prev, newCategory])
      return newCategory
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create category")
      throw err
    }
  }

  return {
    categories,
    loading,
    error,
    createCategory,
    refetch: () => {
      setLoading(true)
      setError(null)
      api.getCategories().then(setCategories).catch(err => {
        setError(err instanceof Error ? err.message : "Failed to fetch categories")
      }).finally(() => setLoading(false))
    }
  }
}
