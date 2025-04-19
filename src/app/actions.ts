'use server';

import { type Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllSections } from "@/config/specialtyConfig"; // Precisamos do config para mapear


// Função auxiliar para criar dados de seção conectando a uma consulta
async function createSectionData(tx: Prisma.TransactionClient, consultationId: string, modelName: string, data: Record<string, unknown> | undefined | null) {
  if (!data || Object.keys(data).length === 0) return;

  // @ts-expect-error - Prisma não tem um tipo genérico fácil para tx[modelName]
  await tx[modelName].create({
    data: {
      ...data,
      consultationId: consultationId,
    },
  });
}

export async function saveConsultation(
  text: string,
  specialty: SpecialtyType,
  patientInfo: PatientInfo // O objeto completo vindo da AI
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Não autorizado");
  }

  const userId = session.user.id;

  // Usamos uma transação para garantir a atomicidade
  return await db.$transaction(async (tx) => {
    // 1. Criar a consulta principal
    const consultation = await tx.consultation.create({
      data: {
        userId,
        specialty,
        text: text, // Ou `patientInfo.raw_text` se existir?
        rawTranscription: text, // Assumindo que `text` é a transcrição
      },
    });

    // 2. Mapear e criar dados das seções relacionais
    const sections = getAllSections(specialty);

    for (const section of sections) {
      let dataToSave: Record<string, unknown> | undefined | null = null;
      let modelName: string | null = null;

      // Mapeia dataPath para nome do modelo (simplificado)
      switch (section.dataPath) {
        case "": // Identificação (raiz)
          modelName = 'patientIdentification';
          dataToSave = section.fields?.reduce((acc, field) => {
            const key = field.id as keyof PatientInfo;
            if (patientInfo[key] !== undefined && 
                !['main_complaint', 'patient_history', 'family_history', 'lifestyle', 
                 'general_vitals', 'general_physical_exam', 'cardiology_specific', 
                 'ophthalmology_specific', 'neurology_specific'].includes(key)) {
              // Acessando dinamicamente, assumindo que a chave existe e o valor é compatível
              acc[field.id] = patientInfo[key] as any; // Usamos 'as any' aqui devido à complexidade da tipagem dinâmica
            }
            return acc;
          }, {} as Record<string, unknown>); 
          break;
        case "main_complaint":
          modelName = 'mainComplaint';
          dataToSave = patientInfo.main_complaint;
          break;
        case "current_disease_history":
           modelName = 'currentDiseaseHistory';
           dataToSave = patientInfo.current_disease_history ? { history: patientInfo.current_disease_history } : null;
           break;
        case "patient_history":
          modelName = 'patientHistory';
          dataToSave = patientInfo.patient_history;
          break;
        case "family_history":
          modelName = 'familyHistory';
          dataToSave = patientInfo.family_history;
          break;
        case "lifestyle":
          modelName = 'lifestyle';
          dataToSave = patientInfo.lifestyle;
          break;
        case "diagnostic_hypothesis":
           modelName = 'diagnosticHypothesis';
           dataToSave = patientInfo.diagnostic_hypothesis ? { hypothesis: patientInfo.diagnostic_hypothesis } : null;
           break;
         // Acessando propriedades OPCIONAIS de PatientInfo
         case "general_vitals":
           modelName = 'generalVitals';
           dataToSave = patientInfo.general_vitals; // Acessa a propriedade opcional diretamente
           break;
         case "general_physical_exam":
           modelName = 'generalPhysicalExam';
           dataToSave = patientInfo.general_physical_exam; // Acessa a propriedade opcional diretamente
           break;
         case "cardiology_specific":
           modelName = 'cardiologySpecifics';
           dataToSave = patientInfo.cardiology_specific; // Acessa a propriedade opcional diretamente
           break;
         case "ophthalmology_specific":
           modelName = 'ophthalmologySpecifics';
           dataToSave = patientInfo.ophthalmology_specific; // Acessa a propriedade opcional diretamente
           break;
         case "neurology_specific":
           modelName = 'neurologySpecifics';
           dataToSave = patientInfo.neurology_specific; // Acessa a propriedade opcional diretamente
           break;
      }

      if (modelName && dataToSave) {
        // Remove `id` caso a AI o inclua indevidamente e seja objeto
        if (typeof dataToSave === 'object' && dataToSave !== null) {
            const mutableData = { ...dataToSave }; // Cria cópia mutável
            delete (mutableData).id; // Usa as any para remover id se existir
            dataToSave = mutableData;
        }
        await createSectionData(tx, consultation.id, modelName, dataToSave);
      }
    }

    // Revalidar o path após a transação ser concluída com sucesso
    revalidatePath('/dashboard/history');

    return consultation; // Retorna a consulta principal criada

  }).catch(error => {
      console.error("Erro ao salvar consulta na transação:", error);
      // Lança um erro mais amigável ou específico se necessário
      throw new Error("Falha ao salvar os detalhes da consulta.");
  });
}


export async function getConsultations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    return [];
  }

  try {
    const consultations = await db.consultation.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      // Inclui todas as relações opcionais
      include: {
        patientIdentification: true,
        mainComplaint: true,
        currentDiseaseHistory: true,
        patientHistory: true,
        familyHistory: true,
        lifestyle: true,
        diagnosticHypothesis: true,
        generalVitals: true,
        generalPhysicalExam: true,
        cardiologySpecifics: true,
        ophthalmologySpecifics: true,
        neurologySpecifics: true,
      },
    });

    return consultations;
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return []; // Retorna array vazio em caso de erro
  }
} 