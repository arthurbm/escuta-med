import React from "react";
import { Copy, Stethoscope } from "lucide-react";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";
import { getAllSections } from "@/config/specialtyConfig";
import { SectionRenderer } from "@/app/(dashboard)/components/sections/section-renderer";
import { resolveDataPath } from "@/lib/data-path-resolver";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface ResultsSectionProps {
  patientInfo: PatientInfo | null;
  specialty: SpecialtyType;
}

export function ResultSection({ patientInfo, specialty }: ResultsSectionProps) {
  if (!patientInfo) {
    return (
      <div className="space-y-6">
        <div className="flex h-[500px] items-center justify-center rounded-lg bg-card p-6 shadow-sm">
          <div className="text-center text-muted-foreground">
            <Stethoscope className="mx-auto mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium">Nenhum resultado ainda</h3>
            <p className="mt-2">
              Grave ou digite o texto da consulta e clique em processar para
              gerar o relatório.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Get all sections for this specialty
  const sections = getAllSections(specialty);

  // Function to copy all content to clipboard
  const copyAllContent = () => {
    try {
      // Create a formatted string with all patient information
      let allContent = "";

      sections.forEach((section) => {
        const sectionData = resolveDataPath(patientInfo, section.dataPath);
        if (!sectionData) return;

        // Add section title
        allContent += `${section.title}\n`;
        allContent += "".padEnd(section.title.length, "-") + "\n\n";

        // Add section content based on type
        if (typeof sectionData === "string") {
          allContent += `${sectionData}\n\n`;
        } else if (typeof sectionData === "object") {
          // For objects, iterate through fields if available
          if (section.fields) {
            section.fields.forEach((field) => {
              const fieldData = sectionData as Record<string, unknown>;
              const fieldValue = fieldData[field.id];

              if (fieldValue !== undefined && fieldValue !== null) {
                let formattedValue = "";

                if (Array.isArray(fieldValue)) {
                  formattedValue = fieldValue.join("\n- ");
                  if (formattedValue) formattedValue = "- " + formattedValue;
                } else if (typeof fieldValue === "boolean") {
                  formattedValue = fieldValue ? "Sim" : "Não";
                } else if (typeof fieldValue === "string") {
                  formattedValue = fieldValue;
                } else if (typeof fieldValue === "number") {
                  formattedValue = fieldValue.toString();
                } else {
                  // For objects or other complex types
                  formattedValue = "[Dados complexos]";
                }

                allContent += `${field.label}: ${formattedValue}\n`;
              }
            });
          }
        }

        allContent += "\n";
      });

      // Copy to clipboard and handle the promise
      void navigator.clipboard
        .writeText(allContent)
        .then(() => {
          toast.success(
            "Relatório completo copiado para a área de transferência",
          );
        })
        .catch((error) => {
          console.error("Erro ao copiar todo o conteúdo:", error);
          toast.error("Erro ao copiar o relatório completo");
        });
    } catch (error) {
      console.error("Erro ao copiar todo o conteúdo:", error);
      toast.error("Erro ao copiar o relatório completo");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Resultado</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={copyAllContent}
          className="flex items-center gap-2"
        >
          <Copy className="h-4 w-4" />
          Copiar tudo
        </Button>
      </div>
      <p className="text-xs italic text-muted-foreground">
        Passe o mouse sobre as seções para copiar conteúdo individualmente
      </p>
      <div className="space-y-6 rounded-lg bg-card p-6 shadow-sm">
        {sections.map((section) => {
          // Get data for this section
          const sectionData = resolveDataPath(patientInfo, section.dataPath);

          // Skip rendering if data is not available
          if (!sectionData) return null;

          return (
            <SectionRenderer
              key={section.id}
              section={section}
              sectionData={sectionData}
            />
          );
        })}
      </div>
    </div>
  );
}
