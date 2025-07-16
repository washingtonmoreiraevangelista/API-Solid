export interface GymRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

export interface FindManyNearParams {
  latitude: number
  longitude: number
}
