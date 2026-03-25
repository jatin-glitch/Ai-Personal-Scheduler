"use client"

import { motion } from "framer-motion"
import { StatsCard } from "@/components/dashboard/stats-card"
import { TodaySchedule } from "@/components/dashboard/today-schedule"
import { useTasks } from "@/hooks/use-tasks"
import { useDashboardStats } from "@/hooks/use-dashboard-stats"
import { 
  CheckSquare, 
  Calendar, 
  Clock, 
  AlertTriangle,
  TrendingUp
} from "lucide-react"

export default function Dashboard() {
  const { tasks, loading: tasksLoading } = useTasks()
  const { stats, loading: statsLoading } = useDashboardStats()

  return (
    <div className="flex-1 p-8 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your schedule.
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={statsLoading ? "..." : stats.totalTasks}
          icon={CheckSquare}
          trend={{ value: 12, isPositive: true }}
          delay={0}
        />
        <StatsCard
          title="Scheduled Tasks"
          value={statsLoading ? "..." : stats.scheduledTasks}
          icon={Calendar}
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <StatsCard
          title="Pending Tasks"
          value={statsLoading ? "..." : stats.pendingTasks}
          icon={Clock}
          trend={{ value: 5, isPositive: false }}
          delay={0.2}
        />
        <StatsCard
          title="Conflicts Detected"
          value={statsLoading ? "..." : stats.conflictsDetected}
          icon={AlertTriangle}
          delay={0.3}
        />
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TodaySchedule tasks={tasks} />
        
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="bg-card rounded-2xl border p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Productivity Insights
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="text-sm font-medium">87%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: "87%" }} />
              </div>
              
              <div className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground">
                  ⚡ Peak productivity: 9 AM - 12 PM
                </p>
                <p className="text-xs text-muted-foreground">
                  📊 Most productive category: Work
                </p>
                <p className="text-xs text-muted-foreground">
                  🎯 Focus areas: High priority tasks
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
