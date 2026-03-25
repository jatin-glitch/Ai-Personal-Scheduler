"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Category } from "@/types"
import { Edit, Trash2, Tag } from "lucide-react"

interface CategoryCardProps {
  category: Category
  taskCount?: number
  onEdit?: (category: Category) => void
  onDelete?: (categoryId: string) => void
  className?: string
}

export function CategoryCard({ 
  category, 
  taskCount = 0, 
  onEdit, 
  onDelete, 
  className 
}: CategoryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete the "${category.name}" category?`)) {
      onDelete?.(category.id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={className}
    >
      <Card className={`relative overflow-hidden transition-all ${
        isHovered ? 'shadow-lg' : 'shadow-sm'
      }`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${category.color}20` }}
              >
                <div 
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className={`flex gap-1 transition-opacity ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit?.(category)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-4">
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ 
                borderColor: category.color,
                color: category.color 
              }}
            >
              {category.color}
            </Badge>
          </div>
        </CardContent>
        
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}
