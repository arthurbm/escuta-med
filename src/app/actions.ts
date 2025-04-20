'use server';

import { type Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { type PatientInfo, type SpecialtyType } from "@/schemas/patient-schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getAllSections } from "@/config/specialtyConfig"; // Precisamos do config para mapear


// Helper function to create section data linked to a consultation
async function createSectionData(
  tx: Prisma.TransactionClient,
  consultationId: string,
  modelName: Prisma.ModelName,
  data: Record<string, unknown> | undefined | null,
) {
  if (!data || Object.keys(data).length === 0) return;

  try {
    // Reverting to @ts-expect-error as dynamic access is complex
    // const modelAccessor = tx[modelName] as any;
    // if (modelAccessor && typeof modelAccessor.create === 'function') {
    // @ts-expect-error - Prisma does not easily support generic types for tx[modelName]
    await tx[modelName].create({
      data: {
        ...data,
        consultationId: consultationId,
      },
    });
    // } else {
    //    console.error(`Model ${modelName} or its create method not found on transaction client.`);
    // }
  } catch (error) {
    console.error(`Error creating data for model ${modelName}:`, error);
    throw new Error(`Failed to save section data for ${modelName}.`);
  }
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
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  // Use a transaction for atomicity
  return await db.$transaction(async (tx) => {
    // 1. Criar a consulta principal
    const consultation = await tx.consultation.create({
      data: {
        userId,
        specialty,
        text: text, // Store the main text here
        rawTranscription: null, // Set rawTranscription to null initially or remove if unused
      },
    });

    // 2. Mapear e criar dados das seções relacionais
    const sections = getAllSections(specialty);

    for (const section of sections) {
      let dataToSave: Record<string, unknown> | undefined | null = null;
      // Map dataPath (from config, camelCase) to the correct Prisma model name (PascalCase)
      let modelName: Prisma.ModelName | null = null;

      switch (section.dataPath) {
        case "patientIdentification":
          modelName = 'PatientIdentification';
          // Extract root-level fields for patient identification
          dataToSave = section.fields?.reduce((acc, field) => {
            const key = field.id as keyof PatientInfo;
            // Check if key exists directly on patientInfo and is NOT a nested section key
            if (patientInfo[key] !== undefined && 
                !['main_complaint', 'patient_history', 'family_history', 'lifestyle', 
                 'diagnostic_hypothesis', 'general_vitals', 'general_physical_exam', 
                 'cardiology_specific', 'ophthalmology_specific', 'neurology_specific'].includes(key)) {
              acc[field.id] = patientInfo[key] as any;
            }
            return acc;
          }, {} as Record<string, unknown>); 
          break;
        case "mainComplaint":
          modelName = 'MainComplaint'; // PascalCase model name
          // Data structure matches the model directly
          dataToSave = patientInfo.main_complaint;
          break;
        case "currentDiseaseHistory":
          modelName = 'CurrentDiseaseHistory'; // PascalCase model name
          // Prisma model expects { history: string }
          dataToSave = patientInfo.current_disease_history 
            ? { history: patientInfo.current_disease_history } 
            : null;
          break;
        case "patientHistory":
          modelName = 'PatientHistory'; // PascalCase model name
          // Data structure matches the model directly
          dataToSave = patientInfo.patient_history;
          break;
        case "familyHistory":
          modelName = 'FamilyHistory'; // PascalCase model name
          // Data structure matches the model directly
          dataToSave = patientInfo.family_history;
          break;
        case "lifestyle":
          modelName = 'Lifestyle'; // PascalCase model name
          // Transform nested AI data to flat Prisma model structure
          if (patientInfo.lifestyle) {
             const transformedData: Record<string, any> = {
              smoking: patientInfo.lifestyle.smoking?.is_smoker,
              // Map details to the 'alcohol' field (String) as it's the available one
              alcohol: patientInfo.lifestyle.smoking?.details ?? 
                       patientInfo.lifestyle.alcohol?.details ?? 
                       patientInfo.lifestyle.drugs?.details,
              // Map other fields if present in AI schema AND Prisma model
              // physical_activity: patientInfo.lifestyle.physical_activity,
              // diet: patientInfo.lifestyle.diet,
              // sleep_pattern: patientInfo.lifestyle.sleep_pattern,
            };
            Object.keys(transformedData).forEach(key => transformedData[key] === undefined && delete transformedData[key]);
            dataToSave = Object.keys(transformedData).length > 0 ? transformedData : null;
          } else {
            dataToSave = null;
          }
          break;
        case "diagnosticHypothesis":
          modelName = 'DiagnosticHypothesis'; // PascalCase model name
           // Prisma model expects { hypothesis: string }
           dataToSave = patientInfo.diagnostic_hypothesis 
             ? { hypothesis: patientInfo.diagnostic_hypothesis } 
             : null;
           break;
        case "generalVitals":
           modelName = 'GeneralVitals'; // PascalCase model name
           dataToSave = patientInfo.general_vitals; // Direct mapping
           break;
        case "generalPhysicalExam":
           modelName = 'GeneralPhysicalExam'; // PascalCase model name
           dataToSave = patientInfo.general_physical_exam; // Direct mapping
           break;
        case "cardiologySpecifics":
           modelName = 'CardiologySpecifics'; // PascalCase model name
           dataToSave = patientInfo.cardiology_specific; // Direct mapping
           break;
        case "ophthalmologySpecifics":
           modelName = 'OphthalmologySpecifics'; // PascalCase model name
           dataToSave = patientInfo.ophthalmology_specific; // Direct mapping
           break;
        case "neurologySpecifics":
           modelName = 'NeurologySpecifics'; // PascalCase model name
           dataToSave = patientInfo.neurology_specific; // Direct mapping
           break;
        default:
          console.warn(`Unknown section dataPath found: ${section.dataPath}`);
          break;
      }

      // Ensure modelName is valid before calling createSectionData
      if (modelName && dataToSave && Object.keys(dataToSave).length > 0) {
        // Remove `id` if AI included it inappropriately
        if (typeof dataToSave === 'object' && dataToSave !== null) {
            const mutableData = { ...dataToSave };
            delete (mutableData as any).id;
            dataToSave = mutableData;
        }
        // Check if dataToSave is not empty after potential ID removal
         if (Object.keys(dataToSave).length > 0) {
          await createSectionData(tx, consultation.id, modelName, dataToSave);
         }
      }
    }

    // Revalidar o path após a transação ser concluída com sucesso
    revalidatePath('/dashboard/history');

    return consultation; // Retorna a consulta principal criada

  }).catch(error => {
      console.error("Error saving consultation transaction:", error);
      // Lança um erro mais amigável ou específico se necessário
      throw new Error("Failed to save consultation details.");
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