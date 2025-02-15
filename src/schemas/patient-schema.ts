import { z } from "zod";

export const patientSchema = z.object({
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
  current_disease_history: z.string().min(1).describe("História da doença atual em linguagem técnica médica"),

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

export type PatientInfo = z.infer<typeof patientSchema>; 