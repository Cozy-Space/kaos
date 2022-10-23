import { Injectable } from '@nestjs/common';
import {LocationEntity} from "./location.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class LocationService {
    constructor(@InjectRepository(LocationEntity) private locationRepository: Repository<LocationEntity>) {}

    async findAll(): Promise<LocationEntity[]>{
        return this.locationRepository.find()
    }

    async save(location: LocationEntity): Promise<LocationEntity>{
        return this.locationRepository.save(location)
    }

    async remove(location: LocationEntity): Promise<LocationEntity>{
        return this.locationRepository.remove(location)
    }
}
