"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"
import { Task } from "@/types"
import { formatTime } from "@/lib/utils"

interface TodayScheduleProps {
  tasks: Task[]
  className?: string
}

export function TodaySchedule({ tasks, className }: TodayScheduleProps) {
  const todayTasks = tasks.filter(task => {
    const today = new Date()
    const taskDate = new Date(task.deadline)
    return taskDate.toDateString() === today.toDateString()
  })

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

  const getStatusColor = (status: string) => {
    const colors = {
      scheduled: "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-800",
      conflict: "bg-red-100 text-red-800",
      completed: "bg-green-100 text-green-800"
    }
    return colors[status as keyof typeof colors] || colors.pending
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={className}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayTasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No tasks scheduled for today</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {task.scheduledTime ? formatTime(task.scheduledTime) : "Not scheduled"}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{task.duration}min</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={getPriorityColor(task.priority)}
                    >
                      P{task.priority}
                    </Badge>
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(task.status)}
                    >
                      {task.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
