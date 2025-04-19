import React, { useState } from 'react'
import { Pause, Check } from 'lucide-react'
import WeekdaySelector from './weekday-selector'
import ExerciseItem from './exercise-item'
import type { Exercise } from '../types/exercise'

export default function WorkoutTracker() {
  const [selectedDay, setSelectedDay] = useState(3)

  const exercises: Exercise[] = [
    {
      id: 1,
      name: 'Flat Bench Press',
      type: 'Strength',
      sets: 5,
      reps: 5,
      currentPR: 65,
      increase: 10,
      increasePercentage: 15.4,
      color: 'orange',
    },
    {
      id: 2,
      name: 'Incline Bench Press',
      type: 'Hypertrophy',
      sets: 4,
      reps: 12,
      currentPR: 40,
      increase: 5,
      increasePercentage: 12.5,
      color: 'purple',
    },
    {
      id: 3,
      name: 'Incline Dumbbell Flyes',
      type: 'Endurance',
      sets: 4,
      reps: 20,
      currentPR: 10,
      increase: 1,
      increasePercentage: 10,
      color: 'yellow',
    },
    {
      id: 4,
      name: 'Close Grip Incline Dumbbell Press',
      type: 'Hypertrophy',
      sets: 4,
      reps: 12,
      currentPR: null,
      increase: null,
      increasePercentage: null,
      color: 'purple',
    },
    {
      id: 5,
      name: 'Pec Deck',
      type: 'Hypertrophy',
      sets: 4,
      reps: 12,
      currentPR: null,
      increase: null,
      increasePercentage: null,
      color: 'purple',
    },
  ]

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-green-500">GymRat+</div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 bg-gray-100 text-gray-800 px-4 py-2 rounded-full font-medium">
            <span className="font-bold">🏋️‍♂️</span> My exercises
          </button>
          <button className="flex items-center gap-2 text-gray-400 px-4 py-2 rounded-full font-medium">
            <span>👥</span> Community
          </button>
          <div className="w-8 h-8 rounded-full bg-orange-200 overflow-hidden">
            <img
              src="/placeholder.svg"
              alt="Profile"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* Week selector */}
      <WeekdaySelector selectedDay={selectedDay} onSelectDay={setSelectedDay} />

      {/* Workout title */}
      <div className="px-6 mt-6 mb-4">
        <h1 className="text-xl font-medium text-gray-600">Push - Upper Body</h1>
      </div>

      {/* New exercises button */}
      <div className="flex justify-end px-6 mb-4">
        <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-full font-medium shadow-sm">
          <span className="font-bold">+</span> New exercises
        </button>
      </div>

      {/* Exercise list */}
      <div className="space-y-4 px-4">
        {exercises.map((exercise) => (
          <ExerciseItem key={exercise.id} exercise={exercise} />
        ))}
      </div>

      {/* Record prompt */}
      <div className="px-6 mt-6 text-gray-500 flex items-center">
        <span>Record your PR to track progress every session.</span>
        <button className="ml-2 text-green-500 font-medium">Add record</button>
      </div>

      {/* Timer */}
      <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-md flex items-center gap-2">
        <span className="text-gray-600">Thu, Oct 3 - 1:08:45</span>
        <button className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500">
          <Check size={18} />
        </button>
        <button className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-700">
          <Pause size={18} />
        </button>
      </div>
    </div>
  )
}
