import { z } from "zod";

// --- Schemas para Seções Específicas ---

const generalVitalsSchema = z.object({
  temperature: z.string().optional().describe("Temperatura corporal"),
  heart_rate: z.string().optional().describe("Frequência cardíaca (bpm)"),
  blood_pressure: z.string().optional().describe("Pressão arterial (mmHg)"),
  respiratory_rate: z.string().optional().describe("Frequência respiratória (rpm)"),
  oxygen_saturation: z.string().optional().describe("Saturação de oxigênio (%)"),
}).optional().describe("Sinais vitais gerais");

const generalPhysicalExamSchema = z.object({
  general_appearance: z.string().optional().describe("Aparência geral do paciente"),
  skin: z.string().optional().describe("Exame da pele e mucosas"),
  head_neck: z.string().optional().describe("Exame da cabeça e pescoço"),
  respiratory: z.string().optional().describe("Exame do sistema respiratório"),
  cardiovascular: z.string().optional().describe("Exame do sistema cardiovascular"),
  abdomen: z.string().optional().describe("Exame do abdômen"),
  extremities: z.string().optional().describe("Exame das extremidades"),
  neurological: z.string().optional().describe("Exame neurológico básico"),
}).optional().describe("Exame físico geral");

const cardiologySpecificSchema = z.object({
    heart_rate: z.string().optional().describe("Frequência cardíaca"),
    blood_pressure: z.string().optional().describe("Pressão arterial"),
    heart_sounds: z.string().optional().describe("Ausculta cardíaca"),
    ecg_findings: z.string().optional().describe("Achados do ECG"),
    previous_cardiac_events: z.array(z.string()).optional().describe("Eventos cardíacos prévios"),
    chest_pain_characteristics: z.string().optional().describe("Características da dor torácica"),
    dyspnea: z.string().optional().describe("Presença e características da dispneia"),
    edema: z.string().optional().describe("Presença e localização de edema"),
}).optional().describe("Informações específicas de cardiologia");

const ophthalmologySpecificSchema = z.object({
    visual_acuity_right: z.string().optional().describe("Acuidade visual - olho direito"),
    visual_acuity_left: z.string().optional().describe("Acuidade visual - olho esquerdo"),
    intraocular_pressure_right: z.string().optional().describe("Pressão intraocular - olho direito"),
    intraocular_pressure_left: z.string().optional().describe("Pressão intraocular - olho esquerdo"),
    fundoscopy: z.string().optional().describe("Achados da fundoscopia"),
    anterior_segment: z.string().optional().describe("Avaliação do segmento anterior"),
    visual_field: z.string().optional().describe("Avaliação do campo visual"),
    color_vision: z.string().optional().describe("Visão de cores"),
    ocular_motility: z.string().optional().describe("Motilidade ocular"),
}).optional().describe("Informações específicas de oftalmologia");

const neurologySpecificSchema = z.object({
    mental_status: z.string().optional().describe("Estado mental"),
    cranial_nerves: z.string().optional().describe("Avaliação dos nervos cranianos"),
    motor_system: z.string().optional().describe("Sistema motor"),
    sensory_system: z.string().optional().describe("Sistema sensorial"),
    reflexes: z.string().optional().describe("Reflexos"),
    coordination: z.string().optional().describe("Coordenação"),
    gait: z.string().optional().describe("Marcha"),
    imaging_findings: z.string().optional().describe("Achados de neuroimagem"),
}).optional().describe("Informações específicas de neurologia");

// --- Schema Base Unificado ---

export const basePatientSchema = z.object({
  // Identificação (campos movidos para cá, mantendo a estrutura)
  name: z.string().optional().describe("Nome completo do paciente"),
  gender: z.string().optional().describe("Sexo do paciente"),
  age: z.string().optional().describe("Idade do paciente (formato string)"),
  education_level: z.string().optional().describe("Nível de escolaridade"),
  birth_city: z.string().optional().describe("Cidade natal"),
  current_city: z.string().optional().describe("Cidade atual"),
  profession: z.string().optional().describe("Profissão"),
  marital_status: z.string().optional().describe("Estado civil"),

  // Queixa Principal
  main_complaint: z.object({
    description: z.string().optional().describe("Descrição da queixa principal"),
    duration: z.string().optional().describe("Duração do sintoma principal"),
  }).optional().describe("Queixa principal e duração"),

  // História da Doença Atual
  current_disease_history: z.string().optional().describe(
    "História da doença atual"
  ),

  // Hipótese de Diagnóstico
  diagnostic_hypothesis: z.string().optional().describe("Hipótese de diagnóstico"),

  // Antecedentes do Paciente
  patient_history: z.object({
    base_diseases: z.array(z.string()).optional().describe("Doenças de base"),
    allergies: z.array(z.string()).optional().describe("Alergias"),
    surgeries: z.array(z.string()).optional().describe("Cirurgias"),
    blood_transfusions: z.boolean().optional().describe("Transfusões sanguíneas"),
  }).optional().describe("Antecedentes do paciente"),

  // Antecedentes Familiares
  family_history: z.object({
    parents_diseases: z.array(z.string()).optional().describe("Doenças dos pais"),
    parents_cause_of_death: z.array(z.string()).optional().describe("Causa da morte dos pais"),
  }).optional().describe("Antecedentes familiares"),

  // Hábitos de Vida
  lifestyle: z.object({
    smoking: z.object({
      is_smoker: z.boolean().optional().describe("É fumante?"),
      details: z.string().optional().describe("Detalhes sobre fumo"),
    }).optional(),
    alcohol: z.object({
      drinks_alcohol: z.boolean().optional().describe("Consome álcool?"),
      details: z.string().optional().describe("Detalhes sobre álcool"),
    }).optional(),
    drugs: z.object({
      uses_drugs: z.boolean().optional().describe("Usa drogas?"),
      details: z.string().optional().describe("Detalhes sobre drogas"),
    }).optional(),
    // Adicionar outros hábitos conforme necessário (physical_activity, diet, etc.)
  }).optional().describe("Hábitos de vida"),

  // --- Campos Opcionais Específicos ---
  general_vitals: generalVitalsSchema,
  general_physical_exam: generalPhysicalExamSchema,
  cardiology_specific: cardiologySpecificSchema,
  ophthalmology_specific: ophthalmologySpecificSchema,
  neurology_specific: neurologySpecificSchema,
});

// Schemas específicos por especialidade que incluem apenas os campos relevantes
const generalSchema = z.object({
  // Identificação
  name: z.string().optional().describe("Nome completo do paciente"),
  gender: z.string().optional().describe("Sexo do paciente"),
  age: z.string().optional().describe("Idade do paciente (formato string)"),
  education_level: z.string().optional().describe("Nível de escolaridade"),
  birth_city: z.string().optional().describe("Cidade natal"),
  current_city: z.string().optional().describe("Cidade atual"),
  profession: z.string().optional().describe("Profissão"),
  marital_status: z.string().optional().describe("Estado civil"),

  // Queixa Principal
  main_complaint: z.object({
    description: z.string().optional().describe("Descrição da queixa principal"),
    duration: z.string().optional().describe("Duração do sintoma principal"),
  }).optional().describe("Queixa principal e duração"),

  // História da Doença Atual
  current_disease_history: z.string().optional().describe("História da doença atual"),

  // Hipótese de Diagnóstico
  diagnostic_hypothesis: z.string().optional().describe("Hipótese de diagnóstico"),

  // Antecedentes do Paciente
  patient_history: z.object({
    base_diseases: z.array(z.string()).optional().describe("Doenças de base"),
    allergies: z.array(z.string()).optional().describe("Alergias"),
    surgeries: z.array(z.string()).optional().describe("Cirurgias"),
    blood_transfusions: z.boolean().optional().describe("Transfusões sanguíneas"),
  }).optional().describe("Antecedentes do paciente"),

  // Antecedentes Familiares
  family_history: z.object({
    parents_diseases: z.array(z.string()).optional().describe("Doenças dos pais"),
    parents_cause_of_death: z.array(z.string()).optional().describe("Causa da morte dos pais"),
  }).optional().describe("Antecedentes familiares"),

  // Hábitos de Vida
  lifestyle: z.object({
    smoking: z.object({
      is_smoker: z.boolean().optional().describe("É fumante?"),
      details: z.string().optional().describe("Detalhes sobre fumo"),
    }).optional(),
    alcohol: z.object({
      drinks_alcohol: z.boolean().optional().describe("Consome álcool?"),
      details: z.string().optional().describe("Detalhes sobre álcool"),
    }).optional(),
    drugs: z.object({
      uses_drugs: z.boolean().optional().describe("Usa drogas?"),
      details: z.string().optional().describe("Detalhes sobre drogas"),
    }).optional(),
  }).optional().describe("Hábitos de vida"),

  // Campos gerais
  general_vitals: generalVitalsSchema,
  general_physical_exam: generalPhysicalExamSchema,
});

const cardiologySchema = generalSchema.extend({
  cardiology_specific: cardiologySpecificSchema,
});

const ophthalmologySchema = generalSchema.extend({
  ophthalmology_specific: ophthalmologySpecificSchema,
});

const neurologySchema = generalSchema.extend({
  neurology_specific: neurologySpecificSchema,
});

// Tipo de especialidade médica
export const specialtyTypes = [
  "general",
  "cardiology",
  "ophthalmology",
  "neurology",
] as const;

export type SpecialtyType = typeof specialtyTypes[number];

// Agora só precisamos de um tipo inferido principal
export type PatientInfo = z.infer<typeof basePatientSchema>;

// A função getSchemaForSpecialty retorna o schema específico para cada especialidade
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
      return generalSchema;
  }
}

// Exporta o schema unificado como o schema principal para a AI
export const patientSchema = basePatientSchema;
