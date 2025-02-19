"use client";

import { useState, useRef } from "react";
import { experimental_useObject } from "ai/react";
import { patientSchema, type PatientInfo } from "@/schemas/patient-schema";
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

interface TranscriptionResponse {
  text: string;
}

export default function DashboardPage() {
  const [consultation, setConsultation] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    object: patientInfo,
    submit,
    isLoading,
  } = experimental_useObject<PatientInfo>({
    api: "/api/process-consultation",
    schema: patientSchema,
  });

  const processConsultation = async () => {
    const textToProcess = transcribedText || consultation;
    if (!textToProcess.trim()) return;

    try {
      submit({ text: textToProcess });
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

  // Helper function to render a list of items
  const renderList = (items: string[]) => {
    if (!items?.length)
      return <li className="text-gray-500">Nenhum registro</li>;
    return items.map((item, index) => (
      <li key={index} className="text-gray-700">
        {item}
      </li>
    ));
  };

  // Helper function to safely get array
  const safeArray = (items: (string | undefined)[] | undefined): string[] => {
    if (!items) return [];
    return items.filter((item): item is string => item !== undefined);
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

          {/* Results Section */}
          <div className="space-y-6">
            {patientInfo ? (
              <div className="space-y-6 rounded-lg bg-card p-6 shadow-sm">
                {/* Identificação */}
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    Identificação
                  </h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Nome
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.name}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Sexo
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.gender}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Idade
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.age} anos
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Escolaridade
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.education_level}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Cidade Natal
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.birth_city}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Cidade Atual
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.current_city}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Profissão
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.profession}
                      </div>
                    </div>
                    <div className="rounded-lg bg-secondary p-3">
                      <span className="text-sm font-medium text-muted-foreground">
                        Estado Civil
                      </span>
                      <div className="mt-1 text-foreground">
                        {patientInfo.marital_status}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Queixa Principal */}
                {patientInfo.main_complaint && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                      <div className="rounded-lg bg-red-100 p-2">
                        <FileText className="h-5 w-5 text-red-600" />
                      </div>
                      Queixa Principal
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Descrição
                        </span>
                        <div className="mt-1 text-foreground">
                          {patientInfo.main_complaint.description}
                        </div>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Duração
                        </span>
                        <div className="mt-1 text-foreground">
                          {patientInfo.main_complaint.duration}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* História da Doença Atual */}
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                    <div className="rounded-lg bg-orange-100 p-2">
                      <FileText className="h-5 w-5 text-orange-600" />
                    </div>
                    História da Doença Atual
                  </h2>
                  <div className="mt-4 rounded-lg bg-secondary p-4">
                    <p className="whitespace-pre-wrap text-foreground">
                      {patientInfo.current_disease_history}
                    </p>
                  </div>
                </section>

                {/* Antecedentes do Paciente */}
                {patientInfo.patient_history && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                      <div className="rounded-lg bg-emerald-100 p-2">
                        <FileText className="h-5 w-5 text-emerald-600" />
                      </div>
                      Antecedentes do Paciente
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Doenças de Base
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                          {renderList(
                            safeArray(
                              patientInfo.patient_history.base_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Alergias
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                          {renderList(
                            safeArray(patientInfo.patient_history.allergies),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Cirurgias
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                          {renderList(
                            safeArray(patientInfo.patient_history.surgeries),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Transfusão Sanguínea
                        </span>
                        <div className="mt-1 text-foreground">
                          {patientInfo.patient_history.blood_transfusions
                            ? "Sim"
                            : "Não"}
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Antecedentes Familiares */}
                {patientInfo.family_history && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                      <div className="rounded-lg bg-amber-100 p-2">
                        <FileText className="h-5 w-5 text-amber-600" />
                      </div>
                      Antecedentes Familiares
                    </h2>
                    <div className="mt-4 space-y-4">
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Doenças dos Pais
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                          {renderList(
                            safeArray(
                              patientInfo.family_history.parents_diseases,
                            ),
                          )}
                        </ul>
                      </div>
                      <div className="rounded-lg bg-secondary p-4">
                        <span className="text-sm font-medium text-muted-foreground">
                          Causa da Morte dos Pais
                        </span>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-foreground">
                          {renderList(
                            safeArray(
                              patientInfo.family_history.parents_cause_of_death,
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </section>
                )}

                {/* Hábitos de Vida */}
                {patientInfo.lifestyle?.smoking &&
                  patientInfo.lifestyle.alcohol &&
                  patientInfo.lifestyle.drugs && (
                    <section>
                      <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                        <div className="rounded-lg bg-indigo-100 p-2">
                          <FileText className="h-5 w-5 text-indigo-600" />
                        </div>
                        Hábitos de Vida
                      </h2>
                      <div className="mt-4 space-y-4">
                        <div className="rounded-lg bg-secondary p-4">
                          <span className="text-sm font-medium text-muted-foreground">
                            Tabagismo
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-foreground">
                              {patientInfo.lifestyle.smoking.is_smoker
                                ? "Fumante"
                                : "Não Fumante"}
                            </div>
                            {patientInfo.lifestyle.smoking.details && (
                              <div className="text-muted-foreground">
                                {patientInfo.lifestyle.smoking.details}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rounded-lg bg-secondary p-4">
                          <span className="text-sm font-medium text-muted-foreground">
                            Álcool
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-foreground">
                              {patientInfo.lifestyle.alcohol.drinks_alcohol
                                ? "Consome"
                                : "Não Consome"}
                            </div>
                            {patientInfo.lifestyle.alcohol.details && (
                              <div className="text-muted-foreground">
                                {patientInfo.lifestyle.alcohol.details}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="rounded-lg bg-secondary p-4">
                          <span className="text-sm font-medium text-muted-foreground">
                            Drogas
                          </span>
                          <div className="mt-2 space-y-2">
                            <div className="text-foreground">
                              {patientInfo.lifestyle.drugs.uses_drugs
                                ? "Usa"
                                : "Não Usa"}
                            </div>
                            {patientInfo.lifestyle.drugs.details && (
                              <div className="text-muted-foreground">
                                {patientInfo.lifestyle.drugs.details}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </section>
                  )}

                {/* Hipótese de Diagnóstico */}
                {patientInfo.diagnostic_hypothesis && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-card-foreground">
                      <div className="rounded-lg bg-teal-100 p-2">
                        <FileText className="h-5 w-5 text-teal-600" />
                      </div>
                      Hipótese de Diagnóstico
                    </h2>
                    <div className="mt-4 rounded-lg bg-secondary p-4">
                      <p className="whitespace-pre-wrap text-foreground">
                        {patientInfo.diagnostic_hypothesis}
                      </p>
                    </div>
                  </section>
                )}
              </div>
            ) : (
              <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/5 px-6 py-10 lg:min-h-[300px]">
                <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
                <h3 className="text-lg font-semibold text-muted-foreground">
                  Nenhuma consulta processada
                </h3>
                <p className="mt-2 text-center text-sm text-muted-foreground/80">
                  Grave, envie ou digite o texto da consulta para gerar o
                  relatório estruturado.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
