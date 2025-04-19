import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import { GoogleGenerativeAI, GenerateContentRequest, GenerateContentResponse } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GENAI_API_KEY;
if (!API_KEY) {
    throw new Error("Missing GOOGLE_GENAI_API_KEY environment variable. Please set it.");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const app = express();
app.use(express.json()); // Middleware to parse JSON request bodies

async function generateContent(prompt: string, modelName: string = "gemini-pro"): Promise<GenerateContentResponse | null> {
    try {
        const model = genAI.getModel({ model: modelName });
        const request: GenerateContentRequest = {
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        };
        const response: GenerateContentResponse = await model.generateContent(request);
        return response;
    } catch (error: any) {
        console.error("Error generating content:", error);
        return null;
    }
}

// Define the /ai_generator route
app.post("/metadata", async (req: Request, res: Response) => {
    const { prompt, modelName } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Prompt is required." });
    }

    const response = await generateContent(prompt, modelName || "gemini-pro");

    if (response) {
        const responseText = response.text() ?? "No text response.";
        return res.json({ response: responseText });
    } else {
        return res.status(500).json({ error: "Failed to generate content." });
    }
});

