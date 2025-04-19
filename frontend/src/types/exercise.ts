export interface Exercise {
  id: number
  name: string
  type: string
  sets: number
  reps: number
  currentPR: number | null
  increase: number | null
  increasePercentage: number | null
  color: string
}
