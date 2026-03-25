"use client"

import { useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"

interface KeyboardShortcut {
  key: string
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
  action: () => void
  description: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const router = useRouter()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const pressedKey = event.key.toLowerCase()
    
    for (const shortcut of shortcuts) {
      const keyMatches = shortcut.key.toLowerCase() === pressedKey
      const ctrlMatches = !!shortcut.ctrlKey === event.ctrlKey
      const metaMatches = !!shortcut.metaKey === event.metaKey
      const shiftMatches = !!shortcut.shiftKey === event.shiftKey
      const altMatches = !!shortcut.altKey === event.altKey

      if (keyMatches && ctrlMatches && metaMatches && shiftMatches && altMatches) {
        event.preventDefault()
        shortcut.action()
        break
      }
    }
  }, [shortcuts])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])
}

// Default shortcuts for the app
export const defaultShortcuts = [
  {
    key: 'n',
    action: () => console.log('New task'),
    description: 'Create new task'
  },
  {
    key: '/',
    action: () => console.log('Search'),
    description: 'Focus search'
  },
  {
    key: 'g',
    shiftKey: true,
    action: () => console.log('Go to dashboard'),
    description: 'Go to dashboard'
  },
  {
    key: 't',
    action: () => console.log('Go to tasks'),
    description: 'Go to tasks'
  },
  {
    key: 's',
    action: () => console.log('Go to scheduler'),
    description: 'Go to scheduler'
  },
  {
    key: 'c',
    action: () => console.log('Go to conflicts'),
    description: 'Go to conflicts'
  },
  {
    key: 'k',
    action: () => console.log('Command palette'),
    description: 'Open command palette'
  },
  {
    key: '?',
    shiftKey: true,
    action: () => console.log('Show shortcuts'),
    description: 'Show keyboard shortcuts'
  }
]
