export function toArray <T = unknown>(data: T): T extends unknown[] ? T : T[] {
  // @ts-ignore
  return Array.isArray(data) ? data : [data]
}
