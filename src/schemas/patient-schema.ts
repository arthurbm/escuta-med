import { z } from "zod";

// Schema base que contém campos comuns a todas as especialidades
export const basePatientSchema = z.object({
  // Identificação
  name: z.string().min(1).describe("Nome completo do paciente"),
  gender: z.string().min(1).describe("Sexo do paciente"),
  age: z.number().min(0).max(150).describe("Idade do paciente"),
  education_level: z.string().min(1).describe("Nível de escolaridade do paciente"),
  birth_city: z.string().min(1).describe("Cidade em que nasceu"),
  current_city: z.string().min(1).describe("Cidade em que mora atualmente"),
  profession: z.string().min(1).describe("Profissão atual"),
  marital_status: z.string().min(1).describe("Estado civil"),

  // Queixa Principal
  main_complaint: z.object({
    description: z.string().min(1).describe("Descrição da queixa principal"),
    duration: z.string().min(1).describe("Duração do sintoma principal"),
  }).describe("Queixa principal e duração"),

  // História da Doença Atual
  current_disease_history: z.string().min(1).describe(
    "História da doença atual em linguagem técnica médica. DEVE SER COMPLETA"
  ),

  // Hipótese de Diagnóstico
  diagnostic_hypothesis: z.string().min(1).describe("Hipótese de diagnóstico"),

  // Antecedentes do Paciente
  patient_history: z.object({
    base_diseases: z.array(z.string()).describe("Doenças de base (ex: diabetes, hipertensão)"),
    allergies: z.array(z.string()).describe("Alergias conhecidas"),
    surgeries: z.array(z.string()).describe("Cirurgias realizadas"),
    blood_transfusions: z.boolean().describe("Histórico de transfusões sanguíneas"),
  }).describe("Antecedentes do paciente"),

  // Antecedentes Familiares
  family_history: z.object({
    parents_diseases: z.array(z.string()).describe("Doenças dos pais"),
    parents_cause_of_death: z.array(z.string()).describe("Causa da morte dos pais (se aplicável)"),
  }).describe("Antecedentes familiares"),

  // Hábitos de Vida
  lifestyle: z.object({
    smoking: z.object({
      is_smoker: z.boolean().describe("Se é fumante"),
      details: z.string().optional().describe("Detalhes sobre o hábito de fumar"),
    }),
    alcohol: z.object({
      drinks_alcohol: z.boolean().describe("Se consome bebidas alcoólicas"),
      details: z.string().optional().describe("Detalhes sobre o consumo de álcool"),
    }),
    drugs: z.object({
      uses_drugs: z.boolean().describe("Se usa drogas"),
      details: z.string().optional().describe("Detalhes sobre o uso de drogas"),
    }),
  }).describe("Hábitos de vida"),
});

// Schema específico para Cardiologia
export const cardiologySchema = basePatientSchema.extend({
  cardiology_specific: z.object({
    heart_rate: z.string().min(1).describe("Frequência cardíaca"),
    blood_pressure: z.string().min(1).describe("Pressão arterial"),
    heart_sounds: z.string().min(1).describe("Ausculta cardíaca"),
    ecg_findings: z.string().optional().describe("Achados do ECG"),
    previous_cardiac_events: z.array(z.string()).describe("Eventos cardíacos prévios"),
    chest_pain_characteristics: z.string().optional().describe("Características da dor torácica"),
    dyspnea: z.string().optional().describe("Presença e características da dispneia"),
    edema: z.string().optional().describe("Presença e localização de edema"),
  }).describe("Informações específicas de cardiologia"),
});

// Schema específico para Oftalmologia
export const ophthalmologySchema = basePatientSchema.extend({
  ophthalmology_specific: z.object({
    visual_acuity_right: z.string().min(1).describe("Acuidade visual - olho direito"),
    visual_acuity_left: z.string().min(1).describe("Acuidade visual - olho esquerdo"),
    intraocular_pressure_right: z.string().min(1).describe("Pressão intraocular - olho direito"),
    intraocular_pressure_left: z.string().min(1).describe("Pressão intraocular - olho esquerdo"),
    fundoscopy: z.string().min(1).describe("Achados da fundoscopia"),
    anterior_segment: z.string().min(1).describe("Avaliação do segmento anterior"),
    visual_field: z.string().optional().describe("Avaliação do campo visual"),
    color_vision: z.string().optional().describe("Visão de cores"),
    ocular_motility: z.string().optional().describe("Motilidade ocular"),
  }).describe("Informações específicas de oftalmologia"),
});

// Schema específico para Neurologia
export const neurologySchema = basePatientSchema.extend({
  neurology_specific: z.object({
    mental_status: z.string().min(1).describe("Estado mental"),
    cranial_nerves: z.string().min(1).describe("Avaliação dos nervos cranianos"),
    motor_system: z.string().min(1).describe("Sistema motor"),
    sensory_system: z.string().min(1).describe("Sistema sensorial"),
    reflexes: z.string().min(1).describe("Reflexos"),
    coordination: z.string().min(1).describe("Coordenação"),
    gait: z.string().min(1).describe("Marcha"),
    imaging_findings: z.string().optional().describe("Achados de neuroimagem"),
  }).describe("Informações específicas de neurologia"),
});

// Tipo de especialidade médica
export const specialtyTypes = [
  "general",
  "cardiology",
  "ophthalmology",
  "neurology",
] as const;

export type SpecialtyType = typeof specialtyTypes[number];

// Função para obter o schema apropriado com base na especialidade
export function getSchemaForSpecialty(specialty: SpecialtyType) {
  switch (specialty) {
    case "cardiology":
      return cardiologySchema;
    case "ophthalmology":
      return ophthalmologySchema;
    case "neurology":
      return neurologySchema;
    case "general":
    default:
      return basePatientSchema;
  }
}

// Exportando o schema geral para compatibilidade com código existente
export const patientSchema = basePatientSchema;

// Tipos para cada especialidade
export type BasePatientInfo = z.infer<typeof basePatientSchema>;
export type CardiologyPatientInfo = z.infer<typeof cardiologySchema>;
export type OphthalmologyPatientInfo = z.infer<typeof ophthalmologySchema>;
export type NeurologyPatientInfo = z.infer<typeof neurologySchema>;

// Tipo genérico que pode ser qualquer um dos tipos específicos
export type PatientInfo = 
  | BasePatientInfo 
  | CardiologyPatientInfo 
  | OphthalmologyPatientInfo 
  | NeurologyPatientInfo;
