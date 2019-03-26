import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import { Length, IsEmail } from 'class-validator'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'name' })
  name: string

  @Column({ name: 'password', nullable: true })
  @Length(8, 16)
  password: string | null

  @Column({ name: 'email', unique: true })
  @IsEmail()
  email: string

  @Column({ name: 'image', unique: true, nullable: true })
  image: string | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
