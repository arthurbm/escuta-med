import { type NextRequest } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { getSchemaForSpecialty, specialtyTypes, type SpecialtyType } from "@/schemas/patient-schema";
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
        specialtyPrompt = "Você está analisando uma consulta médica geral.";
    }

    const result = streamObject({
      model: google("gemini-2.0-flash-001"),
      schema,
      system: `Você é um assistente especializado em extrair informações de consultas médicas. Escreva em termos médicos, quem vai ler são médicos.
      
      ${specialtyPrompt}

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