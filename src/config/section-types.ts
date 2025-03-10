import { type SectionConfig, type FieldConfig } from "@/config/specialtyConfig";

export interface SmokingData {
  is_smoker: boolean;
  details?: string;
}

export interface AlcoholData {
  drinks_alcohol: boolean;
  details?: string;
}

export interface DrugsData {
  uses_drugs: boolean;
  details?: string;
}

export interface LifestyleData {
  smoking?: SmokingData;
  alcohol?: AlcoholData;
  drugs?: DrugsData;
}

export interface SectionHeaderProps {
  section: SectionConfig;
}

export interface TextSectionProps {
  text: string;
}

export interface FieldsSectionProps {
  fields: FieldConfig[];
  data: Record<string, unknown>;
}

export interface LifestyleSectionProps {
  data: unknown;
}

export interface ComplexSectionFactoryProps {
  sectionId: string;
  data: unknown;
}

export interface SectionRendererProps {
  section: SectionConfig;
  sectionData: unknown;
} 