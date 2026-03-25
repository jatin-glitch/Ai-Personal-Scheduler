"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useTheme } from "@/components/theme-provider"
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  AlertTriangle, 
  Tags,
  Plus,
  Moon,
  Sun
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Tasks", href: "/tasks", icon: CheckSquare },
  { name: "Scheduler", href: "/scheduler", icon: Calendar },
  { name: "Conflicts", href: "/conflicts", icon: AlertTriangle },
  { name: "Categories", href: "/categories", icon: Tags },
]

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isDarkMode = resolvedTheme === "dark"

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <motion.div 
      className={cn(
        "w-64 bg-card border-r border-border p-6 flex flex-col",
        className
      )}
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-foreground">AI Scheduler</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleDarkMode}
          className="h-8 w-8"
        >
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <Link key={item.name} href={item.href}>
              <motion.div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-xl transition-all",
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      <Button className="w-full gap-2">
        <Plus className="h-4 w-4" />
        Quick Add Task
      </Button>
    </motion.div>
  )
}
