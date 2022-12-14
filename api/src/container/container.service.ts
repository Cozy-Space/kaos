import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
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

  async findById(id: number): Promise<ContainerEntity> {
    return this.containerRepository.findOne({
      where: { id },
      relations: ['location'],
    });
  }

  async findByCode(code: string): Promise<ContainerEntity[]> {
    return this.containerRepository.find({
      where: { code },
      relations: ['location'],
    });
  }

  async update(container: Partial<ContainerEntity>): Promise<UpdateResult> {
    return this.containerRepository.update(container.id, container);
  }

  async remove(container: ContainerEntity): Promise<ContainerEntity> {
    return this.containerRepository.remove(container);
  }

  async updateImageUrl(id: number, imageUrl: string) {
    return this.containerRepository.update(id, { imageUrl });
  }
}
