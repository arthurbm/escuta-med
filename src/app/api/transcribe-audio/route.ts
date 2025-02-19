import { type NextRequest } from "next/server";
import { Groq } from "groq-sdk";

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

    const client = new Groq();

    const transcription = await client.audio.transcriptions.create({
      file: audioFile,
      model: "whisper-large-v3-turbo",
      language: "pt", // Portuguese
    });

    return new Response(JSON.stringify({ text: transcription.text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Transcription error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to transcribe audio" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 