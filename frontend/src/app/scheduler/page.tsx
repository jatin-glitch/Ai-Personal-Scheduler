"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Timeline } from "@/components/scheduler/timeline"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTasks } from "@/hooks/use-tasks"
import { Task } from "@/types"
import { Plus, CalendarDays } from "lucide-react"

export default function SchedulerPage() {
  const { tasks } = useTasks()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task)
    // TODO: Open task details modal
    console.log("Task clicked:", task)
  }

  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
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
          <h1 className="text-3xl font-bold text-foreground">Scheduler</h1>
          <p className="text-muted-foreground mt-2">
            Visualize and manage your daily schedule
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Schedule Task
        </Button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Timeline */}
        <div className="lg:col-span-3">
          <Timeline
            tasks={tasks}
            selectedDate={selectedDate}
            onDateChange={handleDateChange}
            onTaskClick={handleTaskClick}
          />
        </div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Today's Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Scheduled</span>
                <span className="font-medium">
                  {tasks.filter(t => t.status === 'scheduled' && 
                    t.scheduledTime && 
                    new Date(t.scheduledTime).toDateString() === selectedDate.toDateString()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="font-medium">
                  {tasks.filter(t => t.status === 'pending').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Conflicts</span>
                <span className="font-medium text-red-600">
                  {tasks.filter(t => t.status === 'conflict').length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Task Details */}
          {selectedTask && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Task Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedTask.title}</h4>
                  {selectedTask.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedTask.description}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: selectedTask.category.color }}
                      />
                      <span className="text-sm">{selectedTask.category.name}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Priority</span>
                    <span className="text-sm font-medium">P{selectedTask.priority}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <span className="text-sm font-medium">{selectedTask.duration}min</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span className="text-sm font-medium capitalize">{selectedTask.status}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}
