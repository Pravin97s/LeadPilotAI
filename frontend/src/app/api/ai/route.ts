import Groq from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log("API KEY EXISTS:", !!process.env.GROQ_API_KEY);
    console.log("API KEY START:", process.env.GROQ_API_KEY?.substring(0, 10));

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const { prompt } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      text: completion.choices[0].message.content,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error: err.message,
      },
      {
        status: 500,
      }
    );
  }
}