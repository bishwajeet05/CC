import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = document.documentElement.classList.contains('dark')
      setDarkMode(isDark)
    }
  }, [])

  const toggleTheme = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  )
} 