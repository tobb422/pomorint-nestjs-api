import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password' })
  @Length(8, 16)
  password: string;

  @Column({ name: 'email', unique: true })
  @IsEmail()
  email: string;
}
