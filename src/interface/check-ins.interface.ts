import { CheckIn } from '@prisma/client'

export interface CheckinUserRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

export interface CheckinUserResponse {
  checkIn: CheckIn
}
