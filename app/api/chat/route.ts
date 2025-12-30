import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const cleanMessages = messages
      .filter((m: any) => m?.content && m.content.trim() !== "")
      .map((m: any) => ({
        role: m.role,
        content: m.content,
      }));

    const response = await mistral.chat.complete({
      model: "mistral-small-latest",
      messages: cleanMessages,
    });

    return NextResponse.json({
      message: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("Mistral error:", err);
    return NextResponse.json(
      { message: "Erreur Mistral" },
      { status: 500 }
    );
  }
}