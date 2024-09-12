'use client'

import { useState, useEffect, useRef } from 'react'
import Button from './components/ui/Button';
import  ScrollArea  from "./components/ui/ScrollArea"

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10)
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    setLaps(prevLaps => [...prevLaps, time])
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6">Stopwatch</h1>
        <div className="text-6xl font-mono text-center mb-8" aria-live="polite">
          {formatTime(time)}
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          <Button onClick={handleStartPause} variant={isRunning ? "destructive" : "default"}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button onClick={handleLap} disabled={!isRunning}>Lap</Button>
          <Button onClick={handleReset} variant="outline">Reset</Button>
        </div>
        <ScrollArea className="h-48 rounded border p-4">
          <h2 className="font-semibold mb-2">Lap Times:</h2>
          {laps.length === 0 ? (
            <p className="text-gray-500 text-center">No laps recorded</p>
          ) : (
            <ol className="space-y-1">
              {laps.map((lapTime, index) => (
                <li key={index} className="flex justify-between">
                  <span>Lap {index + 1}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                </li>
              ))}
            </ol>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}