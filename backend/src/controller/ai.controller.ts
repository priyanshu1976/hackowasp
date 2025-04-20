import ai from '../lib/gen_ai'
import { Request, Response } from 'express'

export const metadata = async (req: Request, res: Response) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: 'Explain how AI works in a few words',
    })
    res.json({ text: response.text })
  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
