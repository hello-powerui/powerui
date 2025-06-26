"use client"

import React, { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

// Define the different theme states we'll animate between
const themeStates = [
  {
    name: "Corporate Blue",
    dataColors: [
      "#0078D4",
      "#40E0D0",
      "#FF6B35",
      "#FFC107"
    ],
    background: "#FFFFFF",
    foreground: "#212121",
    tableAccent: "#0078D4"
  },
  {
    name: "Dark Mode Pro",
    dataColors: [
      "#00D9FF",
      "#00FF88",
      "#FF6B6B",
      "#FFE66D"
    ],
    background: "#1A1A1A",
    foreground: "#FFFFFF",
    tableAccent: "#00D9FF",
    visualStyles: {
      "*": {
        "*": {
          border: { show: false }
        }
      }
    }
  },
  {
    name: "Minimal Light",
    dataColors: [
      "#5B9BD5",
      "#70AD47",
      "#FFC000",
      "#ED7D31"
    ],
    background: "#FAFAFA",
    foreground: "#333333"
  }
]

// Syntax highlighting function
const syntaxHighlight = (json: string) => {
  // Replace special characters for HTML
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = 'text-gray-300' // default (including brackets)
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'text-blue-400' // key
        } else {
          cls = 'text-green-400' // string value
        }
      } else if (/true|false/.test(match)) {
        cls = 'text-purple-400' // boolean
      } else if (/null/.test(match)) {
        cls = 'text-red-400' // null
      } else {
        cls = 'text-orange-400' // number
      }
      return `<span class="${cls}">${match}</span>`
    }
  )
}

export function JsonPreview() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % themeStates.length)
      setProgress(0)
    }, 4000)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2.5, 100))
    }, 100)

    return () => {
      clearInterval(interval)
      clearInterval(progressInterval)
    }
  }, [])

  const currentTheme = themeStates[currentIndex]
  const formattedJson = JSON.stringify(currentTheme, null, 2)

  return (
    <div className="relative w-full h-full bg-gray-900 rounded-xl overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      {/* Code container */}
      <div className="relative h-full overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-10 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-10">
          <span className="text-gray-400 text-xs font-mono">theme.json</span>
          <div className="flex items-center gap-1">
            <button className="w-7 h-5 hover:bg-gray-700 flex items-center justify-center rounded">
              <div className="w-3 h-0.5 bg-gray-400" />
            </button>
            <button className="w-7 h-5 hover:bg-gray-700 flex items-center justify-center rounded">
              <div className="w-3 h-3 border border-gray-400" />
            </button>
            <button className="w-7 h-5 hover:bg-red-600 flex items-center justify-center rounded group">
              <svg className="w-3 h-3 text-gray-400 group-hover:text-white" viewBox="0 0 12 12" fill="none">
                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="pt-12 pb-4 px-4 h-full overflow-hidden relative">
          {/* Multiple theme displays with opacity transitions */}
          {themeStates.map((theme, index) => (
            <div
              key={index}
              className={cn(
                "font-mono text-xs leading-relaxed absolute inset-0 pt-12 px-4 transition-opacity duration-500 text-gray-300",
                index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
              )}
            >
              <pre className="whitespace-pre">
                <code dangerouslySetInnerHTML={{ __html: syntaxHighlight(JSON.stringify(theme, null, 2)) }} />
              </pre>
            </div>
          ))}
        </div>

        {/* Theme name indicator */}
        <div className="absolute bottom-4 right-4">
          {themeStates.map((theme, index) => (
            <div
              key={index}
              className={cn(
                "bg-gray-800 px-3 py-1 rounded-full absolute transition-all duration-300",
                index === currentIndex 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-4 pointer-events-none'
              )}
            >
              <span className="text-xs text-gray-300 font-medium">
                {theme.name}
              </span>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}

export default JsonPreview