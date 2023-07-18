export interface Register {
  id?: number
  cpfCnpjField: string
  producerName: string
  farmName: string
  state: string
  city?: string
  farmArea: number
  arableArea: number
  vegetationArea: number
  plantedCrops: string[]
}
