import { ObjectId } from "mongodb";

/**
 * Strict ObjectId parse. `ObjectId.isValid` also accepts any 12-character
 * string, which would silently resolve to a different document, so the input
 * must be exactly 24 hex characters.
 */
export function toObjectId(value: unknown): ObjectId | null {
  if (Array.isArray(value)) value = value[0];
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!/^[0-9a-fA-F]{24}$/.test(trimmed)) return null;
  return new ObjectId(trimmed);
}
