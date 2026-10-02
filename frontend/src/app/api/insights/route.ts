import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { analytics } = await request.json();

    const prompt = `
You are a business data analyst.

Analyze this dashboard analytics and provide exactly 5 concise business insights.

Analytics:
${JSON.stringify(analytics, null, 2)}

Rules:
- Return only bullet points.
- One insight per line.
- Keep each point under 20 words.
`;

    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      insights: result.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        insights: "Unable to generate AI insights.",
      },
      {
        status: 500,
      }
    );
  }
}