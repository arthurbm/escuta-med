import { type NextRequest } from "next/server";
import { Groq } from "groq-sdk";

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY environment variable");
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const audioFile = formData.get("audio") as File;

    if (!audioFile) {
      return new Response(JSON.stringify({ error: "No audio file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    try {
      const transcription = await client.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-large-v3-turbo",
        language: "pt", // Portuguese
      });

      return new Response(JSON.stringify({ text: transcription.text }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (transcriptionError) {
      console.error("Transcription error:", transcriptionError);
      return new Response(
        JSON.stringify({
          error: "Failed to transcribe audio",
          details: transcriptionError instanceof Error ? transcriptionError.message : "Unknown error",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 