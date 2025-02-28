"use client";

import React from "react";
import { DynamicSection } from "./DynamicSection";
import { getSpecialtyConfig } from "@/config/specialtyConfig";
import { type SpecialtyType } from "@/schemas/patient-schema";

interface SpecialtyViewProps {
  specialty: SpecialtyType;
  data: Record<string, unknown>;
}

export function SpecialtyView({ specialty, data }: SpecialtyViewProps) {
  const config = getSpecialtyConfig(specialty);

  if (!config?.sections || config.sections.length === 0) {
    return null;
  }

  return (
    <>
      {config.sections.map((sectionConfig) => (
        <DynamicSection
          key={sectionConfig.id}
          sectionConfig={sectionConfig}
          data={data}
        />
      ))}
    </>
  );
}
