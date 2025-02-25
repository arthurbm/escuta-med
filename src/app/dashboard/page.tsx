"use client";

import { useState, useRef } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  patientSchema,
  type PatientInfo,
  type SpecialtyType,
} from "@/schemas/patient-schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Stethoscope,
  FileText,
  ArrowLeft,
  Mic,
  FileEdit,
  Loader2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { AudioRecorder } from "@/components/audio-recorder";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResultSection } from "@/components/dashboard/result-section";

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

export default function DashboardPage() {
  const [consultation, setConsultation] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [specialty, setSpecialty] = useState<SpecialtyType>("general");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    object: patientInfo,
    submit,
    isLoading,
  } = useObject<PatientInfo>({
    api: "/api/process-consultation",
    schema: patientSchema,
  });

  const processConsultation = async () => {
    const textToProcess = transcribedText || consultation;
    if (!textToProcess.trim()) return;

    try {
      submit({
        text: textToProcess,
        specialty: specialty,
      });
    } catch (error) {
      console.error("Error processing consultation:", error);
    }
  };

  const handleTranscriptionComplete = (text: string) => {
    setTranscribedText(text);
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

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
      setTranscribedText(data.text);
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

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.dataTransfer.files?.[0];
    if (!file) return;

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
      setTranscribedText(data.text);
    } catch (error) {
      console.error("Error processing audio:", error);
      alert("Erro ao processar o áudio. Por favor, tente novamente.");
      setUploadedFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">EscutaMed</span>
          </div>
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar para home
            </Button>
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Processar Consulta
          </h1>
          <p className="mt-2 text-muted-foreground">
            Grave o áudio da consulta ou digite o texto para gerar um relatório
            estruturado.
          </p>
        </div>

        {/* Mobile: flex-col, Desktop: grid with 2 columns */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr,1.5fr] lg:items-start">
          {/* Input Section */}
          <div className="space-y-4">
            {/* Seletor de Especialidade */}
            <div className="rounded-lg bg-card p-4 shadow-sm">
              <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                <Stethoscope className="h-5 w-5 text-primary" />
                Especialidade Médica
              </div>
              <div className="mt-2">
                <Select
                  value={specialty}
                  onValueChange={(value) =>
                    setSpecialty(value as SpecialtyType)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">Geral</SelectItem>
                    <SelectItem value="cardiology">Cardiologia</SelectItem>
                    <SelectItem value="ophthalmology">Oftalmologia</SelectItem>
                    <SelectItem value="neurology">Neurologia</SelectItem>
                  </SelectContent>
                </Select>
                <p className="mt-2 text-sm text-muted-foreground">
                  Selecione a especialidade médica para obter um relatório mais
                  específico.
                </p>
              </div>
            </div>

            <Tabs defaultValue="record" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="record" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  Gravar Áudio
                </TabsTrigger>
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Enviar Áudio
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" />
                  Digitar Texto
                </TabsTrigger>
              </TabsList>

              <TabsContent value="record" className="space-y-4">
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-6 text-center">
                      <h3 className="text-xl font-semibold text-foreground">
                        Grave sua consulta
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Grave o áudio da sua consulta e deixe nossa IA
                        transcrever para você
                      </p>
                    </div>
                    <AudioRecorder
                      onTranscriptionComplete={handleTranscriptionComplete}
                    />
                  </div>
                  {transcribedText && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                        <FileText className="h-5 w-5 text-primary" />
                        Transcrição
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                          Revise e edite a transcrição se necessário:
                        </p>
                        <Textarea
                          value={transcribedText}
                          onChange={(e) => setTranscribedText(e.target.value)}
                          className="mt-2 min-h-[200px] resize-none bg-background"
                          placeholder="A transcrição aparecerá aqui..."
                        />
                      </div>
                      <Button
                        size="lg"
                        onClick={processConsultation}
                        disabled={!transcribedText.trim() || isLoading}
                        className="w-full"
                      >
                        {isLoading ? "Processando..." : "Processar Consulta"}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="rounded-lg bg-card p-6 shadow-sm">
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
                        onClick={() =>
                          !isProcessing && fileInputRef.current?.click()
                        }
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
                                <Button
                                  variant="link"
                                  className="h-auto p-0 text-primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click();
                                  }}
                                >
                                  clique para selecionar
                                </Button>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              MP3, WAV, M4A, AAC, OGG e outros formatos de áudio
                              até 50MB
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  {transcribedText && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                        <FileText className="h-5 w-5 text-primary" />
                        Transcrição
                      </div>
                      <div className="rounded-lg border bg-muted/50 p-4">
                        <p className="text-sm text-muted-foreground">
                          Revise e edite a transcrição se necessário:
                        </p>
                        <Textarea
                          value={transcribedText}
                          onChange={(e) => setTranscribedText(e.target.value)}
                          className="mt-2 min-h-[200px] resize-none bg-background"
                          placeholder="A transcrição aparecerá aqui..."
                        />
                      </div>
                      <Button
                        size="lg"
                        onClick={processConsultation}
                        disabled={!transcribedText.trim() || isLoading}
                        className="w-full"
                      >
                        {isLoading ? "Processando..." : "Processar Consulta"}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="text">
                <div className="rounded-lg bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
                    <FileText className="h-5 w-5 text-primary" />
                    Texto da Consulta
                  </div>
                  <Textarea
                    value={consultation}
                    onChange={(e) => setConsultation(e.target.value)}
                    placeholder="Digite ou cole o texto da consulta aqui..."
                    className="mt-4 min-h-[300px] resize-none"
                  />
                  <Button
                    size="lg"
                    onClick={processConsultation}
                    disabled={!consultation.trim() || isLoading}
                    className="mt-4 w-full"
                  >
                    {isLoading ? "Processando..." : "Processar Consulta"}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <ResultSection
            patientInfo={patientInfo as PatientInfo}
            specialty={specialty}
          />
        </div>
      </div>
    </main>
  );
}
