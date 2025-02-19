import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";

interface AudioRecorderProps {
  onTranscriptionComplete: (text: string) => void;
}

interface TranscriptionResponse {
  text: string;
}

export function AudioRecorder({ onTranscriptionComplete }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert(
        "Error accessing microphone. Please ensure you have granted permission.",
      );
    }
  };

  const stopRecording = async () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (!mediaRecorder) return;

    return new Promise<void>((resolve) => {
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        await processAudio(audioBlob);
        resolve();
      };
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
    });
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Create a File object with the correct MIME type
      const file = new File([audioBlob], "recording.webm", {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", file);

      const response = await fetch("/api/transcribe-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = (await response.json()) as TranscriptionResponse;
      onTranscriptionComplete(data.text);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Error processing audio. Please try again.");
    } finally {
      setIsProcessing(false);
      setIsRecording(false);
    }
  };

  const handleToggleRecording = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleToggleRecording}
        disabled={isProcessing}
        variant={isRecording ? "destructive" : "default"}
        size="icon"
      >
        {isProcessing ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : isRecording ? (
          <Square className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
      </Button>
      <span className="text-sm text-muted-foreground">
        {isProcessing
          ? "Processando áudio..."
          : isRecording
            ? "Gravando... Clique para parar"
            : "Clique para gravar"}
      </span>
    </div>
  );
}
