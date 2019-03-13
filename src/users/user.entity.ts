import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Length, IsEmail } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  @Length(8, 16)
  password: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;
}
