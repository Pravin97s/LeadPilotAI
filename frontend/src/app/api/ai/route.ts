import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const response = await ai.models.generateContent({
  model: "gemini-3.1-pro-preview",
  contents: prompt,
});

    return NextResponse.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("FULL ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: String(error),
      },
      { status: 500 }
    );
  }
}