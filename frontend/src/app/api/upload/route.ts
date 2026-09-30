import { NextResponse } from "next/server";

export async function POST(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Upload API is working.",
  });
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Upload API is available.",
  });
}