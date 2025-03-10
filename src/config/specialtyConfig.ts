import { z } from "zod";
import { type SpecialtyType } from "@/schemas/patient-schema";

// Field type definition
export const fieldTypeSchema = z.enum([
  "text",
  "boolean",
  "list",
  "longText",
]);

export type FieldType = z.infer<typeof fieldTypeSchema>;

// Field configuration
export const fieldConfigSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: fieldTypeSchema,
  required: z.boolean().default(false),
  colSpan: z.number().min(1).max(2).default(1),
  condition: z.string().optional(),
});

export type FieldConfig = z.infer<typeof fieldConfigSchema>;

// Section display types
export enum SectionDisplayType {
  FIELDS = "fields",
  TEXT = "text",
  COMPLEX = "complex",
}

// Unified section configuration
export interface SectionConfig {
  id: string;
  title: string;
  icon: string;
  color: string;
  colorLight: string;
  displayType: SectionDisplayType;
  dataPath: string; // Path to data within patientInfo object (e.g., 'main_complaint', or empty for root)
  fields?: FieldConfig[];
}

// Specialty configuration
export interface SpecialtyConfig {
  id: string;
  name: string;
  sections: SectionConfig[];
}

// Common sections that are displayed for all specialties
export const commonSections: SectionConfig[] = [
  {
    id: "identification",
    title: "Identificação",
    icon: "user",
    color: "blue-600",
    colorLight: "blue-100",
    displayType: SectionDisplayType.FIELDS,
    dataPath: "",
    fields: [
      { id: "name", label: "Nome", type: "text", required: true, colSpan: 1 },
      { id: "gender", label: "Sexo", type: "text", required: true, colSpan: 1 },
      { id: "age", label: "Idade", type: "text", required: true, colSpan: 1 },
      { id: "education_level", label: "Escolaridade", type: "text", required: false, colSpan: 1 },
      { id: "birth_city", label: "Cidade Natal", type: "text", required: false, colSpan: 1 },
      { id: "current_city", label: "Cidade Atual", type: "text", required: false, colSpan: 1 },
      { id: "profession", label: "Profissão", type: "text", required: false, colSpan: 1 },
      { id: "marital_status", label: "Estado Civil", type: "text", required: false, colSpan: 1 },
    ],
  },
  {
    id: "main_complaint",
    title: "Queixa Principal",
    icon: "alert-circle",
    color: "red-600",
    colorLight: "red-100",
    displayType: SectionDisplayType.FIELDS,
    dataPath: "main_complaint",
    fields: [
      { id: "description", label: "Descrição", type: "longText", required: true, colSpan: 2 },
      { id: "duration", label: "Duração", type: "text", required: true, colSpan: 2 },
    ],
  },
  {
    id: "current_disease_history",
    title: "História da Doença Atual",
    icon: "file-text",
    color: "orange-600",
    colorLight: "orange-100",
    displayType: SectionDisplayType.TEXT,
    dataPath: "current_disease_history",
  },
  {
    id: "patient_history",
    title: "Antecedentes do Paciente",
    icon: "clipboard-list",
    color: "emerald-600",
    colorLight: "emerald-100",
    displayType: SectionDisplayType.FIELDS,
    dataPath: "patient_history",
    fields: [
      { id: "base_diseases", label: "Doenças de Base", type: "list", required: false, colSpan: 2 },
      { id: "allergies", label: "Alergias", type: "list", required: false, colSpan: 2 },
      { id: "surgeries", label: "Cirurgias", type: "list", required: false, colSpan: 2 },
      { id: "blood_transfusions", label: "Transfusão Sanguínea", type: "boolean", required: false, colSpan: 2 },
    ],
  },
  {
    id: "family_history",
    title: "Antecedentes Familiares",
    icon: "file-text",
    color: "amber-600",
    colorLight: "amber-100",
    displayType: SectionDisplayType.FIELDS,
    dataPath: "family_history",
    fields: [
      { id: "parents_diseases", label: "Doenças dos Pais", type: "list", required: false, colSpan: 2 },
      { id: "parents_cause_of_death", label: "Causa da Morte dos Pais", type: "list", required: false, colSpan: 2 },
    ],
  },
  {
    id: "lifestyle",
    title: "Hábitos de Vida",
    icon: "file-text",
    color: "indigo-600",
    colorLight: "indigo-100",
    displayType: SectionDisplayType.COMPLEX,
    dataPath: "lifestyle",
  },
  {
    id: "diagnostic_hypothesis",
    title: "Hipótese de Diagnóstico",
    icon: "file-text",
    color: "teal-600",
    colorLight: "teal-100",
    displayType: SectionDisplayType.TEXT,
    dataPath: "diagnostic_hypothesis",
  },
];

// Specialty-specific sections
export const specialtiesConfig: Record<SpecialtyType, SpecialtyConfig> = {
  general: {
    id: "general",
    name: "Geral",
    sections: [
      {
        id: "general_vitals",
        title: "Sinais Vitais",
        icon: "activity",
        color: "blue-600",
        colorLight: "blue-100",
        displayType: SectionDisplayType.FIELDS,
        dataPath: "general_vitals",
        fields: [
          {
            id: "temperature",
            label: "Temperatura",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "heart_rate",
            label: "Frequência Cardíaca",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "blood_pressure",
            label: "Pressão Arterial",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "respiratory_rate",
            label: "Frequência Respiratória",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "oxygen_saturation",
            label: "Saturação de Oxigênio",
            type: "text",
            required: false,
            colSpan: 1,
          },
        ],
      },
      {
        id: "general_physical_exam",
        title: "Exame Físico Geral",
        icon: "stethoscope",
        color: "green-600",
        colorLight: "green-100",
        displayType: SectionDisplayType.FIELDS,
        dataPath: "general_physical_exam",
        fields: [
          {
            id: "general_appearance",
            label: "Aparência Geral",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "skin",
            label: "Pele e Mucosas",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "head_neck",
            label: "Cabeça e Pescoço",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "respiratory",
            label: "Sistema Respiratório",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "cardiovascular",
            label: "Sistema Cardiovascular",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "abdomen",
            label: "Abdômen",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "extremities",
            label: "Extremidades",
            type: "text",
            required: false,
            colSpan: 2,
          },
          {
            id: "neurological",
            label: "Exame Neurológico",
            type: "text",
            required: false,
            colSpan: 2,
          },
        ],
      },
    ],
  },
  cardiology: {
    id: "cardiology",
    name: "Cardiologia",
    sections: [
      {
        id: "cardiology_specific",
        title: "Informações Cardiológicas",
        icon: "heart",
        color: "red-600",
        colorLight: "red-100",
        displayType: SectionDisplayType.FIELDS,
        dataPath: "cardiology_specific",
        fields: [
          {
            id: "heart_rate",
            label: "Frequência Cardíaca",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "blood_pressure",
            label: "Pressão Arterial",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "heart_sounds",
            label: "Ausculta Cardíaca",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "ecg_findings",
            label: "Achados do ECG",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "previous_cardiac_events",
            label: "Eventos Cardíacos Prévios",
            type: "list",
            required: false,
            colSpan: 2,
          },
          {
            id: "chest_pain_characteristics",
            label: "Características da Dor Torácica",
            type: "longText",
            required: false,
            colSpan: 2,
          },
          {
            id: "dyspnea",
            label: "Dispneia",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "edema",
            label: "Edema",
            type: "text",
            required: false,
            colSpan: 1,
          },
        ],
      },
    ],
  },
  ophthalmology: {
    id: "ophthalmology",
    name: "Oftalmologia",
    sections: [
      {
        id: "ophthalmology_specific",
        title: "Informações Oftalmológicas",
        icon: "eye",
        color: "blue-600",
        colorLight: "blue-100",
        displayType: SectionDisplayType.FIELDS,
        dataPath: "ophthalmology_specific",
        fields: [
          {
            id: "visual_acuity_right",
            label: "Acuidade Visual (OD)",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "visual_acuity_left",
            label: "Acuidade Visual (OE)",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "intraocular_pressure_right",
            label: "Pressão Intraocular (OD)",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "intraocular_pressure_left",
            label: "Pressão Intraocular (OE)",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "fundoscopy",
            label: "Fundoscopia",
            type: "text",
            required: true,
            colSpan: 2,
          },
          {
            id: "anterior_segment",
            label: "Segmento Anterior",
            type: "text",
            required: true,
            colSpan: 2,
          },
          {
            id: "visual_field",
            label: "Campo Visual",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "color_vision",
            label: "Visão de Cores",
            type: "text",
            required: false,
            colSpan: 1,
          },
          {
            id: "ocular_motility",
            label: "Motilidade Ocular",
            type: "text",
            required: false,
            colSpan: 2,
          },
        ],
      },
    ],
  },
  neurology: {
    id: "neurology",
    name: "Neurologia",
    sections: [
      {
        id: "neurology_specific",
        title: "Informações Neurológicas",
        icon: "brain",
        color: "purple-600",
        colorLight: "purple-100",
        displayType: SectionDisplayType.FIELDS,
        dataPath: "neurology_specific",
        fields: [
          {
            id: "mental_status",
            label: "Estado Mental",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "cranial_nerves",
            label: "Nervos Cranianos",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "motor_system",
            label: "Sistema Motor",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "sensory_system",
            label: "Sistema Sensorial",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "reflexes",
            label: "Reflexos",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "coordination",
            label: "Coordenação",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "gait",
            label: "Marcha",
            type: "text",
            required: true,
            colSpan: 1,
          },
          {
            id: "imaging_findings",
            label: "Achados de Neuroimagem",
            type: "text",
            required: false,
            colSpan: 1,
          },
        ],
      },
    ],
  },
};

// Get specialty configuration
export function getSpecialtyConfig(specialty: SpecialtyType): SpecialtyConfig {
  return specialtiesConfig[specialty] ?? specialtiesConfig.general;
}

// Get all sections for a specialty (common + specialty-specific)
export function getAllSections(specialty: SpecialtyType): SectionConfig[] {
  const specialtyConfig = getSpecialtyConfig(specialty);
  return [...commonSections, ...specialtyConfig.sections];
}

// Get specialty options for dropdown
export function getSpecialtyOptions() {
  return Object.entries(specialtiesConfig).map(([id, config]) => ({
    value: id,
    label: config.name,
  }));
} 