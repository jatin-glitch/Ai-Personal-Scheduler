"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ConflictModal } from "@/components/conflicts/conflict-modal"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useConflicts } from "@/hooks/use-conflicts"
import { Conflict } from "@/types"
import { formatDate, formatTime } from "@/lib/utils"
import { 
  AlertTriangle, 
  Clock, 
  Calendar, 
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function ConflictsPage() {
  const { conflicts, loading, resolveConflict } = useConflicts()
  const [selectedConflict, setSelectedConflict] = useState<Conflict | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleResolveConflict = async (conflictId: string, resolution: { taskId: string; newTime: Date }) => {
    try {
      await resolveConflict(conflictId, resolution)
      setIsModalOpen(false)
      setSelectedConflict(null)
    } catch (error) {
      console.error("Failed to resolve conflict:", error)
    }
  }

  const openConflictModal = (conflict: Conflict) => {
    setSelectedConflict(conflict)
    setIsModalOpen(true)
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

  return (
    <div className="flex-1 p-8 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Conflict Resolution</h1>
          <p className="text-muted-foreground mt-2">
            AI-powered scheduling conflict detection and resolution
          </p>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-xl">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{conflicts.length}</h3>
                  <p className="text-sm text-muted-foreground">Active Conflicts</p>
                </div>
              </div>
              
              <div className="flex-1 h-12 bg-muted rounded-lg overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-sm font-medium"
                  style={{ width: conflicts.length > 0 ? '100%' : '0%' }}
                >
                  {conflicts.length > 0 ? 'Resolution Required' : 'All Clear'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Conflicts List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>Scanning for conflicts...</p>
          </div>
        ) : conflicts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No Conflicts Detected</h3>
            <p className="text-muted-foreground">
              Your schedule is conflict-free! All tasks are properly scheduled.
            </p>
          </motion.div>
        ) : (
          conflicts.map((conflict, index) => (
            <motion.div
              key={conflict.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="border-red-200 bg-red-50/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Schedule Conflict
                    </CardTitle>
                    <Badge variant="destructive">
                      {conflict.tasks.length} Tasks
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detected on {formatDate(conflict.detectedAt)}
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Conflicting Tasks */}
                  <div className="space-y-3">
                    {conflict.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: task.category.color }}
                          />
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-muted-foreground">
                                {task.category.name}
                              </span>
                              <span className="text-xs text-muted-foreground">•</span>
                              <Badge 
                                variant="outline" 
                                className={getPriorityColor(task.priority)}
                              >
                                P{task.priority}
                              </Badge>
                              <span className="text-xs text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">
                                {task.duration}min
                              </span>
                            </div>
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
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {conflict.suggestedSlots.length} AI suggestions available
                    </div>
                    
                    <Button
                      onClick={() => openConflictModal(conflict)}
                      className="gap-2"
                    >
                      <ArrowRight className="h-4 w-4" />
                      Resolve Conflict
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Conflict Resolution Modal */}
      <ConflictModal
        conflict={selectedConflict}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedConflict(null)
        }}
        onResolveConflict={handleResolveConflict}
      />
    </div>
  )
}
