import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerEntity } from './container.entity';
import { LoginGuard } from 'src/login.guard';
import { SkipThrottle } from '@nestjs/throttler';

//@UseGuards(LoginGuard)
@Controller('container')
@SkipThrottle()
export class ContainerController {
  constructor(private containerService: ContainerService) {}

  @Get()
  async findAll(@Query('code') code: string): Promise<ContainerEntity[]> {
    return code
      ? this.containerService.findByCode(code)
      : this.containerService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<ContainerEntity> {
    return this.containerService.findById(id);
  }

  @Post()
  async save(@Body() container: SaveDto): Promise<ContainerEntity> {
    return this.containerService.save(container as ContainerEntity);
  }

  @Delete()
  async remove(@Body() container: DeleteDto): Promise<ContainerEntity> {
    return this.containerService.remove(container as ContainerEntity);
  }
}
