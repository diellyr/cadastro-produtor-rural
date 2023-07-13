export interface Register {
  id?: number
  cpfCnpjField: string
  name: string
  farmName: string
  state: string
  city: string
  arableArea: number
  vegetationArea: number
  plantedCrops: [string]
}
