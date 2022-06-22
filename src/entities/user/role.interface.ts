import { User } from "./user.entity"

export interface RoleInterface {
    id: string
    type: string
    users: User[]
    createdAt: Date
    updatedAt: Date
  }