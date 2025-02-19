import { useState, useRef } from "react";
import { Mic, Square, Loader2, Activity, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // List of accepted MIME types
    const acceptedTypes = [
      "audio/mp3",
      "audio/mpeg",
      "audio/wav",
      "audio/m4a",
      "audio/webm",
      "audio/ogg",
      "audio/flac",
      "video/mp4", // Adding MP4 support
    ];

    // Check if file type is accepted
    if (!acceptedTypes.includes(file.type)) {
      alert(
        "Por favor, selecione um arquivo de áudio válido (MP3, WAV, M4A, MP4, etc).",
      );
      return;
    }

    // Check file size (25MB limit)
    if (file.size > 25 * 1024 * 1024) {
      alert("O arquivo deve ter menos de 25MB.");
      return;
    }

    setIsProcessing(true);
    try {
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
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center gap-8">
        {/* Recording Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleToggleRecording}
            disabled={isProcessing}
            className={cn(
              "group relative flex h-48 w-48 items-center justify-center rounded-full border-2 transition-all duration-500",
              isProcessing
                ? "cursor-not-allowed border-muted bg-muted"
                : isRecording
                  ? "border-destructive/50 bg-destructive/5"
                  : "border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10",
            )}
          >
            {/* Outer Ring Animation */}
            <div
              className={cn(
                "absolute inset-0 rounded-full transition-transform duration-700",
                isRecording && [
                  "animate-[ping_3s_ease-in-out_infinite]",
                  "border-2",
                  "border-destructive/20",
                  "opacity-40",
                ],
              )}
            />

            {/* Inner Content */}
            <div className="flex flex-col items-center gap-2">
              {isProcessing ? (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Processando...
                  </span>
                </>
              ) : isRecording ? (
                <>
                  <Square className="h-12 w-12 text-destructive/70" />
                  <span className="text-sm font-medium text-destructive/70">
                    Gravando...
                  </span>
                  <Activity className="h-6 w-6 animate-[pulse_2s_ease-in-out_infinite] text-destructive/70" />
                </>
              ) : (
                <>
                  <Mic className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Clique para gravar
                  </span>
                </>
              )}
            </div>
          </button>

          {/* Recording Status Text */}
          <p className="text-center text-sm text-muted-foreground">
            {isProcessing
              ? "Convertendo áudio em texto..."
              : isRecording
                ? "Clique para finalizar a gravação"
                : "Clique no microfone para iniciar a gravação"}
          </p>
        </div>

        {/* Divider */}
        <div className="flex flex-col items-center gap-4">
          <div className="h-48 w-px bg-border" />
          <span className="text-sm font-medium text-muted-foreground">ou</span>
        </div>

        {/* Upload Button */}
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isProcessing}
            className={cn(
              "group relative flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed transition-all duration-500",
              isProcessing
                ? "cursor-not-allowed border-muted bg-muted"
                : "border-primary/20 bg-primary/5 hover:border-primary hover:bg-primary/10",
            )}
          >
            <div className="flex flex-col items-center gap-2">
              <Upload className="h-12 w-12 text-primary transition-transform duration-300 group-hover:scale-110" />
              <span className="text-sm font-medium text-muted-foreground">
                Enviar arquivo
              </span>
              <span className="text-xs text-muted-foreground">
                MP3, WAV, M4A, etc.
              </span>
            </div>
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Clique para selecionar um arquivo de áudio
          </p>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp3,.wav,.m4a,.mp4,.webm,.ogg,.flac,audio/*,video/mp4"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
