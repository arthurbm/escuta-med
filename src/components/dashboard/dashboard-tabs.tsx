import { Mic, FileText, FileEdit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AudioRecorder } from "@/components/audio-recorder";
import { AudioUploader } from "./audio-uploader";
import { TranscriptionEditor } from "./transcription-editor";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface DashboardTabsProps {
  transcribedText: string;
  setTranscribedText: (text: string) => void;
  consultation: string;
  setConsultation: (text: string) => void;
  onProcess: () => void;
  isLoading: boolean;
}

export function DashboardTabs({
  transcribedText,
  setTranscribedText,
  consultation,
  setConsultation,
  onProcess,
  isLoading,
}: DashboardTabsProps) {
  return (
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
                Grave o áudio da sua consulta e deixe nossa IA transcrever para
                você
              </p>
            </div>
            <AudioRecorder onTranscriptionComplete={setTranscribedText} />
          </div>
          <TranscriptionEditor
            transcribedText={transcribedText}
            setTranscribedText={setTranscribedText}
            onProcess={onProcess}
            isLoading={isLoading}
          />
        </div>
      </TabsContent>

      <TabsContent value="upload" className="space-y-4">
        <div className="rounded-lg bg-card p-6 shadow-sm">
          <AudioUploader onTranscriptionComplete={setTranscribedText} />
          <TranscriptionEditor
            transcribedText={transcribedText}
            setTranscribedText={setTranscribedText}
            onProcess={onProcess}
            isLoading={isLoading}
          />
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
            onClick={onProcess}
            disabled={!consultation.trim() || isLoading}
            className="mt-4 w-full"
          >
            {isLoading ? "Processando..." : "Processar Consulta"}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
