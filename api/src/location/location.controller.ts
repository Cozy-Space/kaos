import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationEntity } from './location.entity';
import { LoginGuard } from 'src/login.guard';

@Controller('location')
@UseGuards(LoginGuard)
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  async findAll(): Promise<LocationEntity[]> {
    return this.locationService.findAll();
  }

  @Post()
  async save(@Body() location: SaveDto): Promise<LocationEntity> {
    return this.locationService.save(location as LocationEntity);
  }

  @Delete()
  async remove(@Body() location: DeleteDto): Promise<LocationEntity> {
    return this.locationService.remove(location as LocationEntity);
  }
}
