import ai from '../lib/gen_ai'
import { Request, Response } from 'express'

export const metadata = async (req: Request, res: Response) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })

    let textOutput = response.candidates?.[0]?.content?.parts?.[0]?.text || ''

    // Remove markdown formatting if present

    let jsonOutput
    jsonOutput = JSON.parse(textOutput)

    res.json(jsonOutput)
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({
      error: 'Internal Server Error',
    })
  }
}
const prompt = `You are a fitness coach and nutritionist assistant. Based on the following input parameters, generate a complete personalized workout and diet plan for the user. Return the output in JSON format, where each key is the table name and the value is an array of rows.

Input:
- Age: 21
- Weight: 65kg
- Height: 175cm
- Gender: Male
- Activity Level: Moderate
- Goal: Bulk
- Duration: 8 weeks
- User ID: 3
- Start Date: 2025-04-19

Output JSON format:
{
  "workout_plans": [
    {
      "plan_id": 1,
      "user_id": 3,
      "plan_name": "8-Week Bulking Plan",
      "goal": "Bulk",
      "duration_weeks": 8,
      "created_at": "2025-04-19"
    }
  ],
  "workout_sessions": [
    {
      "session_id": 1,
      "plan_id": 1,
      "day_of_week": "Monday",
      "workout_type": "Push",
      "notes": "Focus on chest, shoulders, triceps"
    },
    ...
  ],
  "exercises": [
    {
      "exercise_id": 1,
      "name": "Bench Press",
      "type": "Strength",
      "muscle_group": "Chest",
      "equipment_needed": "Barbell"
    },
    ...
  ],
  "session_exercises": [
    {
      "id": 1,
      "session_id": 1,
      "exercise_id": 1,
      "sets": 4,
      "reps": 10,
      "rest_time": "90s",
      "weight": "60kg"
    },
    ...
  ],
  "diets": [
    {
      "diet_id": 1,
      "user_id": 3,
      "diet_type": "Bulking",
      "calories": 3000,
      "protein": 180,
      "carbs": 350,
      "fats": 90,
      "created_at": "2025-04-19"
    }
  ],
  "diet_meals": [
    {
      "meal_id": 1,
      "diet_id": 1,
      "meal_time": "Breakfast",
      "food_items": "Oats, Eggs, Banana, Peanut Butter",
      "calories": 700,
      "protein": 35,
      "carbs": 80,
      "fats": 25
    },
    ...
  ]
}`
