export const isDefined = (v: unknown) => v !== undefined && v !== null

export function hasText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

export function hasItems<T>(value: T[] | undefined | null): value is T[] {
  return Array.isArray(value) && value.length > 0
}
