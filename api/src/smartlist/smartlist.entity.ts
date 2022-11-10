import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SmartListEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'new list' })
  name: string;

  @Column({ nullable: true })
  locations: string;

  @Column({ nullable: true })
  tags: string;
}
