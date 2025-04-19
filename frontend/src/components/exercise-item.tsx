import { ChevronRight, MoreHorizontal } from 'lucide-react'
import type { Exercise } from '@/types/exercise'

interface ExerciseItemProps {
  exercise: Exercise
}

export default function ExerciseItem({ exercise }: ExerciseItemProps) {
  const getIconColor = (color: string) => {
    switch (color) {
      case 'orange':
        return 'bg-orange-100'
      case 'purple':
        return 'bg-purple-100'
      case 'yellow':
        return 'bg-yellow-100'
      default:
        return 'bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Strength':
        return 'text-orange-500'
      case 'Hypertrophy':
        return 'text-purple-500'
      case 'Endurance':
        return 'text-yellow-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center p-4">
        <div className="flex items-center">
          <div
            className={`w-12 h-12 ${getIconColor(
              exercise.color
            )} rounded-full flex items-center justify-center mr-4`}
          >
            <span className="text-2xl">💪</span>
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{exercise.name}</h3>
            <div className="flex items-center gap-2">
              <span className={`${getTypeColor(exercise.type)} font-medium`}>
                {exercise.type}
              </span>
              <span className="text-gray-400">
                {exercise.sets} x {exercise.reps} reps
              </span>
            </div>
          </div>
        </div>
        <div className="ml-auto">
          <button className="text-gray-400">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>

      {exercise.currentPR && (
        <div className="px-4 py-2 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-gray-600">
            <span>Current PR: </span>
            <span className="font-bold ml-1">{exercise.currentPR}kg</span>
            <ChevronRight size={16} className="text-gray-400 ml-1" />
          </div>
          {exercise.increase && (
            <div className="flex items-center text-green-500">
              <span className="font-bold">▲ {exercise.increase}</span>
              <span className="text-sm ml-1">
                ({exercise.increasePercentage}%)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
