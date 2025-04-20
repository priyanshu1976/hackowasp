import express, { Request, Response } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

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

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY as string })

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
    res.status(500).json({ error: 'AI request failed or returned invalid JSON.' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
})
