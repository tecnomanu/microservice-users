import { IsEmail, Min } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude, Expose } from 'class-transformer'

import { UserInterface } from './user.interface';
import { RoleType } from 'src/constants/role.enum';
import { Role } from './role.entity';

@Entity()
@Unique(['email'])
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Min(8)
  password: string;

  @Exclude()
  @Column({ nullable: false })
  salt: string

  @CreateDateColumn()
  createdAt: Date;

  @Expose()
  get role(): RoleType[] {
    const rolesName = this?.roles?.map((role) => role.type);
    return rolesName;
  }

  @Exclude()
  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'users_roles',
    joinColumn: {
      name: 'user_id',
    },
    inverseJoinColumn: {
      name: 'role_id',
    },
  })
  roles!: Role[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, this.salt);
  }

  @Exclude()
  @CreateDateColumn({
    name: 'verified_at',
    nullable: true,
    default: null,
  })
  verifiedAt: Date

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date
}
