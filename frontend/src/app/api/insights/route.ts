import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { insights: "Groq is not configured. Add GROQ_API_KEY to the server environment." },
        { status: 503 }
      );
    }

    const body = await request.json() as { analytics?: unknown };
    if (!body.analytics || typeof body.analytics !== "object") {
      return NextResponse.json(
        { insights: "No analytics data was received. Upload a CSV and try again." },
        { status: 400 }
      );
    }

    const analyticsText = JSON.stringify(body.analytics);
    if (analyticsText.length > 30000) {
      return NextResponse.json(
        { insights: "The analytics summary is too large to analyze." },
        { status: 413 }
      );
    }

    const groq = new Groq({ apiKey });

    const prompt = `
Analyze this uploaded sales dataset summary and give exactly 5 useful insights:
${analyticsText}

Rules:
- Use the supplied figures and category breakdowns as the source of truth.
- Do not say the dataset is empty when totalRows is greater than zero.
- Do not invent trends over time unless date-based trend data is present.
- Mention that a detail is unavailable when the summary does not contain it.
- Include a short data quality observation and actionable sales recommendations where supported.
- Return exactly 5 concise bullet points, with no markdown headings.
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0.2,
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
    console.error("Groq insights request failed.", error);

    return NextResponse.json(
      {
        insights: "Groq couldn't generate insights right now. Check the server API key or try again shortly.",
      },
      {
        status: 500,
      }
    );
  }
}
