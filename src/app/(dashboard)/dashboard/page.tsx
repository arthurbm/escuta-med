"use client";

import { useState } from "react";
import { experimental_useObject as useObject } from "@ai-sdk/react";
import {
  patientSchema,
  type PatientInfo,
  type SpecialtyType,
} from "@/schemas/patient-schema";
import { DashboardTabs } from "@/app/(dashboard)/components/ui/dashboard-tabs";
import { ResultSection } from "@/app/(dashboard)/components/features/result-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Stethoscope } from "lucide-react";
import { getSpecialtyOptions } from "@/config/specialtyConfig";
import { saveConsultation } from "@/app/actions";
import { toast } from "sonner";

export default function DashboardPage() {
  const [consultation, setConsultation] = useState("");
  const [transcribedText, setTranscribedText] = useState("");
  const [specialty, setSpecialty] = useState<SpecialtyType>("general");
  const specialtyOptions = getSpecialtyOptions();
  const {
    object: patientInfo,
    submit,
    isLoading,
  } = useObject<PatientInfo>({
    api: "/api/process-consultation",
    schema: patientSchema,
    async onFinish(event) {
      try {
        // Verificamos se o objeto existe antes de salvar
        if (event.object) {
          // Salva a consulta usando Server Action quando a análise for concluída
          const textToProcess = transcribedText || consultation;
          await saveConsultation(textToProcess, specialty, event.object);
          toast.success("Consulta salva com sucesso!");
        } else if (event.error) {
          console.error("Erro ao processar consulta:", event.error);
          toast.error("Erro ao processar consulta");
        }
      } catch (error) {
        console.error("Erro ao salvar consulta:", error);
        toast.error("Erro ao salvar consulta");
      }
    },
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

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
          Processar Consulta
        </h1>
        <p className="mt-2 text-muted-foreground">
          Grave o áudio da consulta ou digite o texto para gerar um relatório
          estruturado.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1fr,1.5fr] lg:items-start">
        <div className="space-y-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-2 text-lg font-semibold text-card-foreground">
              <Stethoscope className="h-5 w-5 text-primary" />
              Especialidade Médica
            </div>
            <div className="mt-2">
              <Select
                value={specialty}
                onValueChange={(value) => setSpecialty(value as SpecialtyType)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione a especialidade" />
                </SelectTrigger>
                <SelectContent>
                  {specialtyOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 text-sm text-muted-foreground">
                Selecione a especialidade médica para obter um relatório mais
                específico.
              </p>
            </div>
          </div>

          <section className="rounded-lg border bg-card p-4 shadow-sm">
            <DashboardTabs
              transcribedText={transcribedText}
              setTranscribedText={setTranscribedText}
              consultation={consultation}
              setConsultation={setConsultation}
              onProcess={processConsultation}
              isLoading={isLoading}
            />
          </section>
        </div>

        <section className="rounded-lg border bg-card p-4 shadow-sm">
          <ResultSection
            patientInfo={patientInfo as PatientInfo}
            specialty={specialty}
          />
        </section>
      </div>
    </div>
  );
}
