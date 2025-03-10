/**
 * Formats a raw value based on its type and field ID
 * @param rawValue The raw value to format
 * @param fieldId The ID of the field (used for special formatting rules)
 * @returns The formatted value, or null if the value cannot be formatted
 */
export function formatValue(
  rawValue: unknown,
  fieldId: string
): string | boolean | string[] | null {
  if (rawValue === undefined || rawValue === null) {
    return null;
  }

  // Handle different value types
  if (
    typeof rawValue === "string" ||
    typeof rawValue === "boolean" ||
    Array.isArray(rawValue)
  ) {
    return rawValue;
  } else if (typeof rawValue === "number") {
    // Special formatting for age
    if (fieldId === "age") {
      return `${rawValue} anos`;
    }
    return String(rawValue);
  }

  // Cannot format other types
  return null;
} 