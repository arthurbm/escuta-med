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

/**
 * Componente que exibe o resultado da análise da AI.
 *
 * IMPORTANTE: Este componente recebe um objeto `patientInfo` diretamente da AI,
 * que tem uma estrutura diferente do que será armazenado no banco de dados.
 * O objeto da AI possui chaves como "main_complaint", "lifestyle", etc.,
 * enquanto o banco de dados armazena essas informações em tabelas separadas.
 *
 * Por isso, o objeto `patientInfo` aqui é do tipo definido em `patient-schema.ts`,
 * não do tipo de um registro do banco de dados com relações.
 */
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

  // Obtém todas as seções para essa especialidade
  const sections = getAllSections(specialty);

  const mapDataPathToPatientInfoKey = (dataPath: string): string => {
    // O dataPath nos configs está em camelCase (para o banco de dados relacional)
    // mas o objeto patientInfo usa snake_case como retornado pela AI
    const mappings: Record<string, string> = {
      patientIdentification: "", // campos básicos estão na raiz do objeto
      mainComplaint: "main_complaint",
      currentDiseaseHistory: "current_disease_history",
      patientHistory: "patient_history",
      familyHistory: "family_history",
      lifestyle: "lifestyle",
      diagnosticHypothesis: "diagnostic_hypothesis",
      generalVitals: "general_vitals",
      generalPhysicalExam: "general_physical_exam",
      cardiologySpecifics: "cardiology_specific",
      ophthalmologySpecifics: "ophthalmology_specific",
      neurologySpecifics: "neurology_specific",
    };

    return mappings[dataPath] ?? dataPath;
  };

  // Função para copiar todo o conteúdo para a área de transferência
  const copyAllContent = () => {
    try {
      // Cria uma string formatada com todas as informações do paciente
      let allContent = "";

      sections.forEach((section) => {
        // Mapeia o dataPath para acessar os dados corretamente no objeto patientInfo
        const patientInfoKey = mapDataPathToPatientInfoKey(section.dataPath);
        const sectionData = resolveDataPath(patientInfo, patientInfoKey);

        if (!sectionData) return;

        // Adiciona o título da seção
        allContent += `${section.title}\n`;
        allContent += "".padEnd(section.title.length, "-") + "\n\n";

        // Adiciona o conteúdo da seção conforme o tipo
        if (typeof sectionData === "string") {
          allContent += `${sectionData}\n\n`;
        } else if (typeof sectionData === "object") {
          // Para objetos, itera pelos campos se disponíveis
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
                  formattedValue = "[Dados complexos]";
                }

                allContent += `${field.label}: ${formattedValue}\n`;
              }
            });
          }
        }

        allContent += "\n";
      });

      // Copia para a área de transferência e trata a promise
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
      <div className="flex flex-col gap-1">
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
        <p className="text-sm italic text-muted-foreground">
          Passe o mouse sobre as seções para copiar conteúdo individualmente
        </p>
      </div>
      <div className="space-y-6 rounded-lg bg-card p-6 shadow-sm">
        {sections.map((section) => {
          // Mapeia o dataPath para acessar os dados corretamente no objeto patientInfo
          const patientInfoKey = mapDataPathToPatientInfoKey(section.dataPath);

          // Obtém os dados para esta seção
          const sectionData = resolveDataPath(patientInfo, patientInfoKey);

          // Pula a renderização se os dados não estiverem disponíveis
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
