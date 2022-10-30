import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CodeEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
