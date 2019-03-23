import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'password', nullable: true })
  @Length(8, 16)
  password: string | null;

  @Column({ name: 'email', unique: true })
  @IsEmail()
  email: string;

  @Column({ name: 'image', unique: true, nullable: true })
  image: string | null;
}
