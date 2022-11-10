import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';
import { ContainerEntity } from 'src/container/container.entity';
import { UpdateResult } from 'typeorm';
import { SmartListEntity } from './smartlist.entity';
import { SmartlistService } from './smartlist.service';

@SkipThrottle()
@Controller('smartlist')
export class SmartlistController {
  constructor(private smartListService: SmartlistService) {}

  @Get()
  async findAll(): Promise<SmartListEntity[]> {
    return this.smartListService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<SmartListEntity> {
    return this.smartListService.findById(id);
  }

  @Get(':id/containers')
  async findContainersForList(
    @Param('id') id: number,
  ): Promise<ContainerEntity[]> {
    return this.smartListService.getContainersForList(id);
  }

  @Post()
  async create(): Promise<SmartListEntity> {
    return this.smartListService.create();
  }

  @Put()
  async update(@Body() body: SmartListEntity): Promise<UpdateResult> {
    return this.smartListService.update(body);
  }

  @Delete()
  async remove(@Body() body: SmartListEntity): Promise<SmartListEntity> {
    return this.smartListService.remove(body);
  }
}
