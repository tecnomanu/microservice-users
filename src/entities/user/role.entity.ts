import { RoleType } from 'src/constants/role.enum'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm'
import { RoleInterface } from './role.interface'

import { User } from './user.entity'

@Entity('roles')
export class Role implements RoleInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ nullable: false })
  type: RoleType

  @ManyToMany(() => User, (user) => user.roles)
  users!: User[]

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
