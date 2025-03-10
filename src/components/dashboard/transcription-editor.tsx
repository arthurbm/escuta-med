import { FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface TranscriptionEditorProps {
  transcribedText: string;
  setTranscribedText: (text: string) => void;
  onProcess: () => void;
  isLoading: boolean;
}

export function TranscriptionEditor({
  transcribedText,
  setTranscribedText,
  onProcess,
  isLoading,
}: TranscriptionEditorProps) {
  if (!transcribedText) return null;

  return (
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
        onClick={onProcess}
        disabled={!transcribedText.trim() || isLoading}
        className="w-full"
      >
        {isLoading ? "Processando..." : "Processar Consulta"}
      </Button>
    </div>
  );
}
