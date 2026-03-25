"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Conflict, Task, ScheduleSlot } from "@/types"
import { formatTime, formatDate } from "@/lib/utils"
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle,
  ArrowRight
} from "lucide-react"

interface ConflictModalProps {
  conflict: Conflict | null
  isOpen: boolean
  onClose: () => void
  onResolveConflict: (conflictId: string, resolution: { taskId: string; newTime: Date }) => void
  className?: string
}

export function ConflictModal({ 
  conflict, 
  isOpen, 
  onClose, 
  onResolveConflict,
  className 
}: ConflictModalProps) {
  const [selectedResolution, setSelectedResolution] = useState<{
    taskId: string
    slotId: string
  } | null>(null)

  const handleResolve = () => {
    if (!conflict || !selectedResolution) return

    const selectedSlot = conflict.suggestedSlots.find(
      slot => slot.id === selectedResolution.slotId
    )

    if (selectedSlot) {
      onResolveConflict(conflict.id, {
        taskId: selectedResolution.taskId,
        newTime: selectedSlot.startTime
      })
      onClose()
    }
  }

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

  if (!conflict) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-background rounded-2xl border max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="h-5 w-5" />
                  Schedule Conflict Detected
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {conflict.tasks.length} tasks are scheduled for the same time slot
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Conflicting Tasks */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Conflicting Tasks
                  </h3>
                  
                  <div className="space-y-3">
                    {conflict.tasks.map((task, index) => (
                      <motion.div
                        key={task.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="p-4 border rounded-lg bg-red-50/50 border-red-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium">{task.title}</h4>
                            {task.description && (
                              <p className="text-sm text-muted-foreground mt-1">
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full"
                                  style={{ backgroundColor: task.category.color }}
                                />
                                <span className="text-sm">{task.category.name}</span>
                              </div>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(task.priority)}
                              >
                                P{task.priority}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {task.duration}min
                              </span>
                            </div>
                          </div>
                          
                          {task.scheduledTime && (
                            <div className="text-right">
                              <div className="text-sm font-medium">
                                {formatTime(task.scheduledTime)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(task.scheduledTime)}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Suggestions */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    AI-Recommended Solutions
                  </h3>
                  
                  <div className="space-y-3">
                    {conflict.suggestedSlots.map((slot, slotIndex) => (
                      <motion.div
                        key={slot.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: slotIndex * 0.1 }}
                        className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {formatDate(slot.startTime)}
                            </span>
                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                            <span className="text-primary font-medium">
                              {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                            </span>
                          </div>
                          <Badge variant="secondary">
                            Available
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          {conflict.tasks.map((task) => (
                            <Button
                              key={task.id}
                              variant="outline"
                              size="sm"
                              className={`w-full justify-start h-auto p-3 ${
                                selectedResolution?.taskId === task.id && 
                                selectedResolution?.slotId === slot.id
                                  ? 'border-primary bg-primary/5'
                                  : ''
                              }`}
                              onClick={() => setSelectedResolution({
                                taskId: task.id,
                                slotId: slot.id
                              })}
                            >
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: task.category.color }}
                                  />
                                  <span className="text-sm">{task.title}</span>
                                  <Badge 
                                    variant="outline" 
                                    className={getPriorityColor(task.priority)}
                                  >
                                    P{task.priority}
                                  </Badge>
                                </div>
                                <span className="text-xs text-muted-foreground">
                                  {task.duration}min
                                </span>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t">
                  <Button variant="ghost" onClick={onClose}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  
                  <Button
                    onClick={handleResolve}
                    disabled={!selectedResolution}
                    className="gap-2"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Apply Resolution
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
