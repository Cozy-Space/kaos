import { Module } from '@nestjs/common';
import { ContainerService } from './container.service';
import { ContainerController } from './container.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerEntity } from './container.entity';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContainerEntity]), LocationModule],
  providers: [ContainerService],
  controllers: [ContainerController],
  exports: [ContainerService],
})
export class ContainerModule {}
