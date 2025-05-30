import { useRef, useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// Validate file type
const validTypes = [
  "audio/mpeg",
  "audio/wav",
  "audio/x-m4a",
  "audio/mp3",
  "audio/aac",
  "audio/ogg",
  "audio/webm",
  "audio/x-wav",
  "audio/mp4",
  "video/mp4",
  "audio/x-m4a",
  "audio/m4a",
  "audio/x-aac",
  "audio/vnd.wav",
  "audio/wave",
  "audio/x-pn-wav",
  "audio/vorbis",
  "audio/x-ms-wma",
  "audio/basic",
  "audio/x-mpeg",
  "audio/3gpp",
  "audio/3gpp2",
  "application/ogg",
];

interface TranscriptionResponse {
  text: string;
}

interface AudioUploaderProps {
  onTranscriptionComplete: (text: string) => void;
}

export function AudioUploader({ onTranscriptionComplete }: AudioUploaderProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAudioFile = async (file: File) => {
    // Aceitar qualquer tipo que comece com 'audio/'
    if (!(file.type.startsWith("audio/") || validTypes.includes(file.type))) {
      alert(
        "Por favor, selecione um arquivo de áudio válido (MP3, WAV, M4A, AAC, OGG, etc)",
      );
      return;
    }

    // Validate file size (50MB = 50 * 1024 * 1024 bytes)
    if (file.size > 50 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 50MB");
      return;
    }

    setUploadedFile(file);
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
      alert("Erro ao processar o áudio. Por favor, tente novamente.");
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processAudioFile(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    await processAudioFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mb-6 text-center">
        <h3 className="text-xl font-semibold text-foreground">
          Envie o áudio da consulta
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Faça upload do arquivo de áudio da sua consulta
        </p>
      </div>
      <div className="w-full">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept=".mp3,.wav,.m4a,.aac,.ogg,.webm,.mp4,audio/*"
          className="hidden"
        />
        <div
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-10 transition-colors",
            isProcessing
              ? "cursor-not-allowed opacity-50"
              : "hover:border-primary/50",
          )}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !isProcessing && fileInputRef.current?.click()}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-primary" />
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Processando arquivo...
                </p>
              </div>
            </>
          ) : (
            <>
              <FileText className="mb-4 h-8 w-8 text-muted-foreground" />
              <div className="mb-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {uploadedFile
                    ? `Arquivo selecionado: ${uploadedFile.name}`
                    : "Arraste e solte o arquivo de áudio aqui, ou"}
                </p>
                {!uploadedFile && (
                  <button
                    className="text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    clique para selecionar
                  </button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                MP3, WAV, M4A, AAC, OGG e outros formatos de áudio até 50MB
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
