import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'
import ai from './lib/gen_ai'

dotenv.config()

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
)

// Utility function to extract JSON from markdown-style response
function extractValidJson(message: string): any {
  const match = message.match(/```json\s*([\s\S]*?)\s*```/)
  const jsonString = match?.[1] || message // Fallback if no code block
  try {
    return JSON.parse(jsonString)
  } catch (error) {
    throw new Error('Failed to parse JSON from AI response.')
  }
}

const prompt = `You are a fitness and nutrition assistant. Provide your response strictly in JSON format, using only key-value pairs with no additional explanation. Here's the user input:

{
  "user_id": 3,
  "start_date": "2025-04-19",
  "age": 21,
  "weight_kg": 65,
  "height_cm": 175,
  "gender": "Male",
  "activity_level": "Moderate",
  "goal": "Bulk",
  "duration_weeks": 8
}
Respond with only valid JSON. Do not include any markdown, code fencing, or text explanation.
`

app.get('/gemini', async (req: Request, res: Response) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text || ''
    const validJson = extractValidJson(rawText)

    res.json(validJson)
  } catch (error) {
    console.error('AI Error:', error)
    res
      .status(500)
      .json({ error: 'AI request failed or returned invalid JSON.' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})

export const metadata = async (req: Request, res: Response) => {
  try {
    const prompt = `You are a fitness and nutrition assistant. Return a complete 8-week bulking workout and diet plan strictly in valid JSON format. Only include a JSON object with the following structure:
- "workout_plans": array of one object (plan_id, user_id, plan_name, goal, duration_weeks, created_at)
- "workout_sessions": array of 7 objects (one for each day of the week)
- "exercises": array of 15–20 exercise objects (exercise_id, name, type, muscle_group, equipment_needed)
- "session_exercises": array of exercise mappings to workout sessions (id, session_id, exercise_id, sets, reps, rest_time, weight)
- "diets": array with one diet object (diet_id, user_id, diet_type, calories, protein, carbs, fats, created_at)
- "diet_meals": array of 6–8 meals (meal_id, diet_id, meal_time, food_items, calories, protein, carbs, fats)

Input:
{
  "user_id": 3,
  "start_date": "2025-04-19",
  "age": 21,
  "weight_kg": 65,
  "height_cm": 175,
  "gender": "Male",
  "activity_level": "Moderate",
  "goal": "Bulk",
  "duration_weeks": 8
}

Respond only with valid JSON. Do not include any text, markdown, explanation, or function wrappers.`

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    })

    let textOutput =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from AI.'

    // Remove markdown triple backticks and language tag (like ```json)
    textOutput = textOutput.replace(/```json|```/g, '').trim()

    let jsonOutput
    try {
      jsonOutput = JSON.parse(textOutput)
    } catch (parseErr) {
      console.error('JSON Parse Error:', parseErr)
      return res.status(500).json({
        error: 'Failed to parse AI response as JSON.',
        raw: textOutput,
      })
    }

    res.json(jsonOutput)
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
