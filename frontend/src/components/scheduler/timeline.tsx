"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Task, ScheduleSlot } from "@/types"
import { formatTime, formatDate } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Clock, Calendar } from "lucide-react"

interface TimelineProps {
  tasks: Task[]
  selectedDate: Date
  onDateChange: (date: Date) => void
  onTaskClick?: (task: Task) => void
  className?: string
}

export function Timeline({ 
  tasks, 
  selectedDate, 
  onDateChange, 
  onTaskClick,
  className 
}: TimelineProps) {
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day')

  // Generate hourly slots for the selected date
  const timeSlots = useMemo(() => {
    const slots: ScheduleSlot[] = []
    const startOfDay = new Date(selectedDate)
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
  }, [selectedDate])

  // Get tasks scheduled for the selected date
  const scheduledTasks = useMemo(() => {
    return tasks.filter(task => {
      if (!task.scheduledTime) return false
      const taskDate = new Date(task.scheduledTime)
      return taskDate.toDateString() === selectedDate.toDateString()
    })
  }, [tasks, selectedDate])

  // Check for conflicts
  const conflicts = useMemo(() => {
    const taskGroups: { [key: string]: Task[] } = {}
    
    scheduledTasks.forEach(task => {
      if (task.scheduledTime) {
        const hourKey = formatTime(task.scheduledTime)
        if (!taskGroups[hourKey]) {
          taskGroups[hourKey] = []
        }
        taskGroups[hourKey].push(task)
      }
    })
    
    return Object.entries(taskGroups)
      .filter(([_, tasks]) => tasks.length > 1)
      .map(([time, tasks]) => ({ time, tasks }))
  }, [scheduledTasks])

  const getPriorityColor = (priority: number) => {
    const colors = {
      1: "bg-green-100 text-green-800 border-green-200",
      2: "bg-blue-100 text-blue-800 border-blue-200", 
      3: "bg-yellow-100 text-yellow-800 border-yellow-200",
      4: "bg-orange-100 text-orange-800 border-orange-200",
      5: "bg-red-100 text-red-800 border-red-200"
    }
    return colors[priority as keyof typeof colors] || colors[3]
  }

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1))
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7))
    }
    onDateChange(newDate)
  }

  const goToToday = () => {
    onDateChange(new Date())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Timeline
            </CardTitle>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
                <Button
                  variant={viewMode === 'day' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                >
                  Day
                </Button>
                <Button
                  variant={viewMode === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                >
                  Week
                </Button>
              </div>
              
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateDate('prev')}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={goToToday}
                >
                  Today
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigateDate('next')}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="text-sm text-muted-foreground">
            {formatDate(selectedDate)}
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-2">
            {timeSlots.map((slot, index) => {
              const slotTasks = scheduledTasks.filter(task => {
                if (!task.scheduledTime) return false
                const taskHour = new Date(task.scheduledTime).getHours()
                return taskHour === index
              })

              const hasConflict = slotTasks.length > 1
              const isCurrentHour = new Date().getHours() === index && 
                                 new Date().toDateString() === selectedDate.toDateString()

              return (
                <motion.div
                  key={slot.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className={`
                    flex gap-4 p-3 rounded-lg border transition-all
                    ${hasConflict ? 'border-red-200 bg-red-50/50' : 'border-border'}
                    ${isCurrentHour ? 'bg-primary/5 border-primary/20' : ''}
                    hover:bg-accent/50
                  `}
                >
                  <div className="w-16 text-sm font-medium text-muted-foreground">
                    {formatTime(slot.startTime)}
                  </div>
                  
                  <div className="flex-1 min-h-[60px]">
                    {slotTasks.length === 0 ? (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                        <Clock className="h-4 w-4 mr-2" />
                        Available
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {slotTasks.map((task, taskIndex) => (
                          <motion.div
                            key={task.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: taskIndex * 0.1 }}
                            className={`
                              p-2 rounded-lg border cursor-pointer transition-all
                              ${hasConflict ? 'border-red-200 bg-red-100' : 'border-border bg-card'}
                              hover:shadow-md hover:scale-[1.02]
                            `}
                            onClick={() => onTaskClick?.(task)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{task.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: task.category.color }}
                                  />
                                  <span className="text-xs text-muted-foreground">
                                    {task.category.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {task.duration}min
                                  </span>
                                </div>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(task.priority)}
                              >
                                P{task.priority}
                              </Badge>
                            </div>
                          </motion.div>
                        ))}
                        
                        {hasConflict && (
                          <div className="text-xs text-red-600 font-medium">
                            ⚠️ Conflict: {slotTasks.length} tasks scheduled
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
