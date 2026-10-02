import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(request: Request) {
  try {
    const { analytics } = await request.json();

    const prompt = `
You are an expert business data analyst.

Analyze the following dashboard analytics and provide exactly 5 concise business insights.

Analytics:
${JSON.stringify(analytics, null, 2)}

Rules:
- Return only bullet points.
- Exactly 5 bullet points.
- Maximum 20 words per point.
- Focus on trends, anomalies, opportunities, and business recommendations.
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are an expert business intelligence and analytics assistant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const insights =
      completion.choices[0]?.message?.content ??
      "Unable to generate AI insights.";

    return NextResponse.json({
      insights,
    });
  } catch (error) {
    console.error("Groq Error:", error);

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