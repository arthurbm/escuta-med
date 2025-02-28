import { z } from "zod";
import { type SpecialtyType } from "@/schemas/patient-schema";

// Definição do schema para os tipos de campo
export const fieldTypeSchema = z.enum([
  "text",
  "boolean",
  "list",
  "longText",
]);

export type FieldType = z.infer<typeof fieldTypeSchema>;

// Definição do schema para a configuração de um campo
export const fieldConfigSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: fieldTypeSchema,
  required: z.boolean().default(false),
  colSpan: z.number().min(1).max(2).default(1),
  condition: z.string().optional(),
});

export type FieldConfig = z.infer<typeof fieldConfigSchema>;

// Definição do schema para a configuração de uma seção
export const sectionConfigSchema = z.object({
  id: z.string(),
  title: z.string(),
  icon: z.string(),
  color: z.string(),
  colorLight: z.string(),
  fields: z.array(fieldConfigSchema),
});

export type SectionConfig = z.infer<typeof sectionConfigSchema>;

// Definição do schema para a configuração de uma especialidade
export const specialtyConfigSchema = z.object({
  id: z.string(),
  name: z.string(),
  sections: z.array(sectionConfigSchema),
});

export type SpecialtyConfig = z.infer<typeof specialtyConfigSchema>;

// Configuração das especialidades
export const specialtiesConfig: Record<SpecialtyType, SpecialtyConfig> = {
  general: {
    id: "general",
    name: "Geral",
    sections: [],
  },
  cardiology: {
    id: "cardiology",
    name: "Cardiologia",
    sections: [
      {
        id: "cardiology_specific",
        title: "Informações Cardiológicas",
        icon: "fileText",
        color: "red-600",
        colorLight: "red-100",
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
        icon: "fileText",
        color: "blue-600",
        colorLight: "blue-100",
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
        icon: "fileText",
        color: "purple-600",
        colorLight: "purple-100",
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

// Função para obter a configuração de uma especialidade
export function getSpecialtyConfig(specialty: SpecialtyType): SpecialtyConfig {
  return specialtiesConfig[specialty] || specialtiesConfig.general;
}

// Função para obter todas as opções de especialidades disponíveis
export function getSpecialtyOptions() {
  return Object.entries(specialtiesConfig).map(([id, config]) => ({
    value: id,
    label: config.name,
  }));
} 