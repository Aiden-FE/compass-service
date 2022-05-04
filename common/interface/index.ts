export * from './http.interface'

export const OwnerApp: {
  COMMON: 'COMMON',
  BOOKMARK: 'BOOKMARK',
  CLAY: 'CLAY',
  HOURGLASS: 'HOURGLASS'
} = {
  COMMON: 'COMMON',
  BOOKMARK: 'BOOKMARK',
  CLAY: 'CLAY',
  HOURGLASS: 'HOURGLASS'
}

export type OwnerAppType = (typeof OwnerApp)[keyof typeof OwnerApp]
