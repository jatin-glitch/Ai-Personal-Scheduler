"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Category } from "@/types"
import { Search, Filter, X } from "lucide-react"

interface TaskFiltersProps {
  categories: Category[]
  onFilterChange: (filters: {
    search: string
    category: string | null
    priority: string | null
    status: string | null
  }) => void
  className?: string
}

export function TaskFilters({ categories, onFilterChange, className }: TaskFiltersProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const priorities = ["1", "2", "3", "4", "5"]
  const statuses = ["scheduled", "pending", "conflict", "completed"]

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({
      search: value,
      category: selectedCategory,
      priority: selectedPriority,
      status: selectedStatus
    })
  }

  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId)
    onFilterChange({
      search,
      category: categoryId,
      priority: selectedPriority,
      status: selectedStatus
    })
  }

  const handlePriorityChange = (priority: string | null) => {
    setSelectedPriority(priority)
    onFilterChange({
      search,
      category: selectedCategory,
      priority,
      status: selectedStatus
    })
  }

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status)
    onFilterChange({
      search,
      category: selectedCategory,
      priority: selectedPriority,
      status
    })
  }

  const clearAllFilters = () => {
    setSearch("")
    setSelectedCategory(null)
    setSelectedPriority(null)
    setSelectedStatus(null)
    onFilterChange({
      search: "",
      category: null,
      priority: null,
      status: null
    })
  }

  const hasActiveFilters = search || selectedCategory || selectedPriority || selectedStatus

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <div className="bg-card rounded-2xl border p-6 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Filter Options */}
        <div className="flex flex-wrap gap-4">
          {/* Categories */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handleCategoryChange(
                    selectedCategory === category.id ? null : category.id
                  )}
                >
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: category.color }}
                  />
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Priorities */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Priority</p>
            <div className="flex gap-2">
              {priorities.map((priority) => (
                <Badge
                  key={priority}
                  variant={selectedPriority === priority ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => handlePriorityChange(
                    selectedPriority === priority ? null : priority
                  )}
                >
                  P{priority}
                </Badge>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Status</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  variant={selectedStatus === status ? "default" : "outline"}
                  className="cursor-pointer hover:bg-accent capitalize"
                  onClick={() => handleStatusChange(
                    selectedStatus === status ? null : status
                  )}
                >
                  {status}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4 mr-2" />
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}
