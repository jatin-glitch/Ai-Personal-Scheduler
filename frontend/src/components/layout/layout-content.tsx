"use client"

import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Sidebar } from "@/components/layout/sidebar"
import { Toaster } from "@/components/ui/sonner"

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const router = useRouter()

  const shortcuts = [
    {
      key: 'n',
      action: () => {
        toast.info('New task feature coming soon!')
      },
      description: 'Create new task'
    },
    {
      key: '/',
      action: () => {
        toast.info('Search feature coming soon!')
      },
      description: 'Focus search'
    },
    {
      key: 'g',
      shiftKey: true,
      action: () => {
        router.push('/')
      },
      description: 'Go to dashboard'
    },
    {
      key: 't',
      action: () => {
        router.push('/tasks')
      },
      description: 'Go to tasks'
    },
    {
      key: 's',
      action: () => {
        router.push('/scheduler')
      },
      description: 'Go to scheduler'
    },
    {
      key: 'c',
      action: () => {
        router.push('/conflicts')
      },
      description: 'Go to conflicts'
    },
    {
      key: 'k',
      action: () => {
        toast.info('Command palette coming soon!')
      },
      description: 'Open command palette'
    },
    {
      key: '?',
      shiftKey: true,
      action: () => {
        toast.info('Keyboard Shortcuts:\nN - New task\n/ - Search\nShift+G - Dashboard\nT - Tasks\nS - Scheduler\nC - Conflicts\nK - Command palette\nShift+? - Show shortcuts', {
          duration: 5000
        })
      },
      description: 'Show keyboard shortcuts'
    }
  ]

  useKeyboardShortcuts(shortcuts)

  return (
    <>
      <Sidebar />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <Toaster />
    </>
  )
}
