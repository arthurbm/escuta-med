import React from "react";
import { SectionDisplayType } from "@/config/specialtyConfig";
import { TextSection } from "./types/text-section";
import { ComplexSectionFactory } from "./types/complex-section-factory";
import { type SectionRendererProps } from "./section-types";
import { SectionHeader } from "./section-header";
import { FieldsSection } from "./types/fields-section";

export function SectionRenderer({
  section,
  sectionData,
}: SectionRendererProps) {
  if (!sectionData) return null;

  return (
    <section key={section.id}>
      <SectionHeader section={section} />

      {section.displayType === SectionDisplayType.TEXT && (
        <TextSection text={sectionData as string} />
      )}

      {section.displayType === SectionDisplayType.FIELDS && section.fields && (
        <FieldsSection
          fields={section.fields}
          data={sectionData as Record<string, unknown>}
        />
      )}

      {section.displayType === SectionDisplayType.COMPLEX && (
        <ComplexSectionFactory sectionId={section.id} data={sectionData} />
      )}
    </section>
  );
}
