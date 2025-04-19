import express = require("express");
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
import { Request, Response } from "express";
const app = express();

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY as string,
  });

app.get("/api/metadata", async (req : Request, res : Response) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: "Explain how AI works in a few words",
      });
      res.json({ text: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });