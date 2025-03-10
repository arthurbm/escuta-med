import { type LifestyleData } from "@/config/section-types";

/**
 * Formats a lifestyle value based on its key
 * @param key The lifestyle key (smoking, alcohol, drugs)
 * @param lifestyle The lifestyle data
 * @returns The formatted value, or null if the value cannot be formatted
 */
export function formatLifestyleValue(key: string, lifestyle: LifestyleData): string | null {
  if (key === "smoking" && lifestyle.smoking) {
    return lifestyle.smoking.is_smoker
      ? `Fumante${lifestyle.smoking.details ? `: ${lifestyle.smoking.details}` : ""}`
      : "Não Fumante";
  }
  
  if (key === "alcohol" && lifestyle.alcohol) {
    return lifestyle.alcohol.drinks_alcohol
      ? `Consome${lifestyle.alcohol.details ? `: ${lifestyle.alcohol.details}` : ""}`
      : "Não Consome";
  }
  
  if (key === "drugs" && lifestyle.drugs) {
    return lifestyle.drugs.uses_drugs
      ? `Usa${lifestyle.drugs.details ? `: ${lifestyle.drugs.details}` : ""}`
      : "Não Usa";
  }
  
  return null;
}

/**
 * Gets the label for a lifestyle key
 * @param key The lifestyle key (smoking, alcohol, drugs)
 * @returns The label for the key
 */
export function getLifestyleLabel(key: string): string {
  switch (key) {
    case "smoking":
      return "Tabagismo";
    case "alcohol":
      return "Álcool";
    case "drugs":
      return "Drogas";
    default:
      return key;
  }
} 