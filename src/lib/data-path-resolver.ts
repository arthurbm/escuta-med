/**
 * Resolves a data path within an object
 * @param obj The object to resolve the path in
 * @param path The path to resolve (e.g., 'main_complaint', or 'lifestyle.smoking')
 * @returns The value at the path, or undefined if not found
 */
export function resolveDataPath(obj: unknown, path: string): unknown {
  if (!obj || !path || path === "") return obj;

  return path.split(".").reduce<unknown>((currentObj, key) => {
    if (currentObj === null || currentObj === undefined || typeof currentObj !== "object") {
      return undefined;
    }
    return (currentObj as Record<string, unknown>)[key];
  }, obj);
} 