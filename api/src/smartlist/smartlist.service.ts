import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContainerEntity } from 'src/container/container.entity';
import { ContainerService } from 'src/container/container.service';
import { Repository, UpdateResult } from 'typeorm';
import { SmartListEntity } from './smartlist.entity';

@Injectable()
export class SmartlistService {
  constructor(
    @InjectRepository(SmartListEntity)
    private smartListRepository: Repository<SmartListEntity>,
    private containerService: ContainerService,
  ) {}

  async findAll(): Promise<SmartListEntity[]> {
    return this.smartListRepository.find();
  }

  async findById(id: number): Promise<SmartListEntity> {
    return this.smartListRepository.findOneBy({ id });
  }

  async create(): Promise<SmartListEntity> {
    return this.smartListRepository.save({});
  }

  async update(smartlist: Partial<SmartListEntity>): Promise<UpdateResult> {
    return this.smartListRepository.update(smartlist.id, smartlist);
  }

  async remove(smartlist: Partial<SmartListEntity>): Promise<SmartListEntity> {
    return this.smartListRepository.remove({
      id: smartlist.id,
    } as SmartListEntity);
  }

  async getContainersForList(listId: number): Promise<ContainerEntity[]> {
    const smartList = await this.findById(listId);
    const locations = smartList.locations?.length
      ? smartList.locations?.split(',').map((l) => l.trim())
      : null;
    const tags = smartList.tags?.length
      ? smartList.tags?.split(',').map((t) => t.trim())
      : null;

    return (await this.containerService.findAll())
      .filter(
        (container) =>
          !locations || locations.includes(container.location?.id.toString()),
      )
      .filter(
        (container) =>
          !tags ||
          hasOverlapping(
            tags,
            container.tags?.split(',').map((t) => t.trim()) || [],
          ),
      );
  }
}

function hasOverlapping(targets: string[], compares: string[]): boolean {
  for (let target of targets) {
    console.log(target, compares);
    if (compares.includes(target)) return true;
  }
  return false;
}
