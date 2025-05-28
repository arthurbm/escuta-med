import { type NextRequest } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { getSchemaForSpecialty, specialtyTypes } from "@/schemas/patient-schema";
import { z } from "zod";

const requestSchema = z.object({
  text: z.string(),
  specialty: z.enum(specialtyTypes).default("general"),
});

type RequestBody = z.infer<typeof requestSchema>;

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as RequestBody;
    const { text, specialty } = requestSchema.parse(body);

    // Obter o schema apropriado para a especialidade
    const schema = getSchemaForSpecialty(specialty);

    // Adaptar o prompt com base na especialidade
    let specialtyPrompt = "";
    switch (specialty) {
      case "cardiology":
        specialtyPrompt = `Você está analisando uma consulta de CARDIOLOGIA. Além das informações gerais do paciente, 
        extraia detalhes específicos como frequência cardíaca, pressão arterial, ausculta cardíaca, 
        achados de ECG, eventos cardíacos prévios, características da dor torácica, dispneia e edema.`;
        break;
      case "ophthalmology":
        specialtyPrompt = `Você está analisando uma consulta de OFTALMOLOGIA. Além das informações gerais do paciente, 
        extraia detalhes específicos como acuidade visual, pressão intraocular, achados da fundoscopia, 
        avaliação do segmento anterior, campo visual, visão de cores e motilidade ocular.`;
        break;
      case "neurology":
        specialtyPrompt = `Você está analisando uma consulta de NEUROLOGIA. Além das informações gerais do paciente, 
        extraia detalhes específicos como estado mental, avaliação dos nervos cranianos, sistema motor, 
        sistema sensorial, reflexos, coordenação, marcha e achados de neuroimagem.`;
        break;
      default:
        specialtyPrompt = `Você está analisando uma consulta médica geral. Extraia todas as informações possíveis sobre o paciente,
        seus sintomas, queixas, histórico médico, exame físico, e qualquer outro dado clinicamente relevante.`;
    }

    const result = streamObject({
      model: google("gemini-2.5-flash-preview-04-17"),
      schema,
      system: `Você é um assistente especializado em extrair informações de consultas médicas. Escreva em termos médicos, e falando de um jeito bem "mediquês", pois quem vai ler são médicos.
      
      ${specialtyPrompt}

      IMPORTANTE:
      1. Faça o melhor esforço para extrair TODAS as informações disponíveis no texto da consulta.
      2. Se uma informação não estiver explicitamente mencionada, mas puder ser inferida do contexto, use sua expertise médica para preencher esses dados.
      3. Para valores numéricos ou categóricos (como frequência cardíaca, pressão arterial), use dados clinicamente plausíveis quando não explicitamente indicados.
      4. Os campos sobre sinais vitais e exame físico são particularmente importantes - tente preenchê-los ao máximo possível.
      5. Mantenha a resposta em formato JSON válido.
      6. Use strings vazias ("") APENAS quando não houver absolutamente nenhuma informação ou inferência possível para aquele campo.
      
      Lembre-se: um relatório médico mais completo é mais útil para a tomada de decisões clínicas.`,
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