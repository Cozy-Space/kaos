import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocationEntity } from '../location/location.entity';

@Entity()
export class ContainerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  tags: string;

  @Column({ nullable: true })
  code: string;

  @Column({ nullable: true })
  imageUrl: string;

  @ManyToOne(
    () => LocationEntity,
    (location: LocationEntity) => location.containers,
  )
  location: LocationEntity;
}
