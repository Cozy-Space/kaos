import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ContainerEntity } from './container.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LocationService } from '../location/location.service';
import { LocationEntity } from '../location/location.entity';

@Injectable()
export class ContainerService {
  constructor(
    @InjectRepository(ContainerEntity)
    private containerRepository: Repository<ContainerEntity>,
    private locationService: LocationService,
  ) {}

  async save(container: ContainerEntity): Promise<ContainerEntity> {
    return this.containerRepository.save(container);
  }

  async findAll(): Promise<ContainerEntity[]> {
    return this.containerRepository.find({ relations: ['location'] });
  }

  async remove(container: ContainerEntity): Promise<ContainerEntity> {
    return this.containerRepository.remove(container);
  }

  async updateImageUrl(id: number, imageUrl: string) {
    return this.containerRepository.update(id, { imageUrl });
  }
}
