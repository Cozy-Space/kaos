import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ContainerEntity} from "../container/container.entity";

@Entity()
export class LocationEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @OneToMany(() => ContainerEntity, (container: ContainerEntity) => container.location)
    containers: ContainerEntity[]
}