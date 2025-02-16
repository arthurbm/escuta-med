import { type NextRequest } from "next/server";
import { streamObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { google } from "@ai-sdk/google";
import { patientSchema } from "@/schemas/patient-schema";
import { z } from "zod";

const requestSchema = z.object({
  text: z.string(),
});

type RequestBody = z.infer<typeof requestSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const { text } = requestSchema.parse(body);

    const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      schema: patientSchema,
      system: `Você é um assistente especializado em extrair informações de consultas médicas. Escreva em termos médicos, quem vai ler são médicos.
      A partir do texto fornecido, extraia as seguintes informações do paciente:

      1. Identificação:
      - nome (string): nome completo
      - gender (string): sexo
      - age (number): idade em anos
      - education_level (string): nível de escolaridade
      - birth_city (string): cidade onde nasceu
      - current_city (string): cidade onde mora atualmente
      - profession (string): profissão atual
      - marital_status (string): estado civil

      2. Queixa Principal:
      - main_complaint.description (string): descrição da queixa principal
      - main_complaint.duration (string): duração do sintoma

      3. História da Doença Atual:
      - current_disease_history (string): história detalhada em linguagem técnica médica. DEVE SER COMPLETA

      4. Antecedentes do Paciente:
      - patient_history.base_diseases (array de strings): lista de doenças de base
      - patient_history.allergies (array de strings): lista de alergias
      - patient_history.surgeries (array de strings): lista de cirurgias
      - patient_history.blood_transfusions (boolean): se já fez transfusão

      5. Antecedentes Familiares:
      - family_history.parents_diseases (array de strings): doenças dos pais
      - family_history.parents_cause_of_death (array de strings): causa da morte dos pais, se aplicável

      6. Hábitos de Vida:
      - lifestyle.smoking.is_smoker (boolean): se é fumante
      - lifestyle.smoking.details (string, opcional): detalhes sobre tabagismo
      - lifestyle.alcohol.drinks_alcohol (boolean): se bebe
      - lifestyle.alcohol.details (string, opcional): detalhes sobre consumo de álcool
      - lifestyle.drugs.uses_drugs (boolean): se usa drogas
      - lifestyle.drugs.details (string, opcional): detalhes sobre uso de drogas

      7. Hipótese de Diagnóstico:
      - diagnostic_hypothesis (string): hipótese de diagnóstico

      Se alguma informação não estiver disponível no texto, use valores vazios apropriados (string vazia para textos, arrays vazios para listas, false para booleanos).
      Mantenha a resposta em formato JSON válido.`,
      prompt: text,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify({ error: error.errors }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 