import { Injectable } from '@nestjs/common';
import { LocationEntity } from './location.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(LocationEntity)
    private locationRepository: Repository<LocationEntity>,
  ) {}

  async findAll(): Promise<LocationEntity[]> {
    return this.locationRepository
      .createQueryBuilder('location')
      .leftJoin('location.containers', 'container')
      .loadRelationCountAndMap('location.containerCount', 'location.containers')
      .getMany();
  }

  async save(location: LocationEntity): Promise<LocationEntity> {
    return this.locationRepository.save(location);
  }

  async remove(location: LocationEntity): Promise<LocationEntity> {
    return this.locationRepository.remove(location);
  }
}
