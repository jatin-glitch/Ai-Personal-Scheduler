"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CategoryCard } from "@/components/categories/category-card"
import { CategoryForm } from "@/components/categories/category-form"
import { Button } from "@/components/ui/button"
import { useCategories } from "@/hooks/use-categories"
import { useTasks } from "@/hooks/use-tasks"
import { Category } from "@/types"
import { Tag, Plus } from "lucide-react"

export default function CategoriesPage() {
  const { categories, loading, createCategory } = useCategories()
  const { tasks } = useTasks()
  const [isCreating, setIsCreating] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  // Count tasks per category
  const categoryTaskCounts = categories.reduce((acc, category) => {
    acc[category.id] = tasks.filter(task => task.category.id === category.id).length
    return acc
  }, {} as Record<string, number>)

  const handleCreateCategory = async (categoryData: Omit<Category, "id">) => {
    try {
      await createCategory(categoryData)
      setIsCreating(false)
    } catch (error) {
      console.error("Failed to create category:", error)
    }
  }

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category)
  }

  const handleDeleteCategory = async (categoryId: string) => {
    // TODO: Implement delete functionality
    console.log("Delete category:", categoryId)
  }

  const handleUpdateCategory = async (categoryData: Omit<Category, "id">) => {
    // TODO: Implement update functionality
    console.log("Update category:", editingCategory?.id, categoryData)
    setEditingCategory(null)
  }

  if (isCreating || editingCategory) {
    return (
      <div className="flex-1 p-8">
        <CategoryForm
          category={editingCategory || undefined}
          onSubmit={editingCategory ? handleUpdateCategory : handleCreateCategory}
          onCancel={() => {
            setIsCreating(false)
            setEditingCategory(null)
          }}
        />
      </div>
    )
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
          <h1 className="text-3xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Organize your tasks with custom categories
          </p>
        </div>
        <Button 
          onClick={() => setIsCreating(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{categories.length}</h3>
                <p className="text-sm text-muted-foreground">Total Categories</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <Plus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {categories.filter(cat => categoryTaskCounts[cat.id] > 0).length}
                </h3>
                <p className="text-sm text-muted-foreground">Active Categories</p>
              </div>
            </div>
          </div>
          
          <div className="bg-card rounded-2xl border p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <Tag className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">
                  {Math.round(categories.length > 0 
                    ? tasks.length / categories.length 
                    : 0)}
                </h3>
                <p className="text-sm text-muted-foreground">Avg. Tasks per Category</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Categories Grid */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Loading categories...</p>
          </div>
        ) : categories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <Tag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Categories Yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first category to start organizing your tasks.
            </p>
            <Button onClick={() => setIsCreating(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Create Category
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                category={category}
                taskCount={categoryTaskCounts[category.id]}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
