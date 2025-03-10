import React from "react";
import { Stethoscope } from "lucide-react";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";
import { getAllSections } from "@/config/specialtyConfig";
import { SectionRenderer } from "./section-renderer";
import { resolveDataPath } from "@/lib/data-path-resolver";

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

  return (
    <div className="space-y-6">
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
