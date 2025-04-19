'use client'
import { Check } from 'lucide-react'

interface WeekdaySelectorProps {
  selectedDay: number
  onSelectDay: (day: number) => void
}

export default function WeekdaySelector({
  selectedDay,
  onSelectDay,
}: WeekdaySelectorProps) {
  const weekdays = [
    { id: 30, label: 'M' },
    { id: 1, label: 'T' },
    { id: 2, label: 'W' },
    { id: 3, label: 'T' },
    { id: 4, label: 'F' },
    { id: 5, label: 'S' },
    { id: 6, label: 'S' },
  ]

  return (
    <div className="grid grid-cols-7 gap-2 px-6 py-4">
      {weekdays.map((day) => (
        <button
          key={day.id}
          className={`flex flex-col items-center justify-center p-3 rounded-lg relative ${
            selectedDay === day.id
              ? 'bg-gray-800 text-white'
              : day.id < 3
              ? 'bg-green-50 text-green-500'
              : 'bg-gray-50 text-gray-500'
          }`}
          onClick={() => onSelectDay(day.id)}
        >
          <span className="text-xs">{day.label}</span>
          <span className="text-lg font-semibold">{day.id}</span>
          {day.id < 3 && day.id !== selectedDay && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
              <Check size={12} />
            </span>
          )}
        </button>
      ))}
    </div>
  )
}
