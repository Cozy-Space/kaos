import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContainerModule } from 'src/container/container.module';
import { SmartlistController } from './smartlist.controller';
import { SmartListEntity } from './smartlist.entity';
import { SmartlistService } from './smartlist.service';

@Module({
  controllers: [SmartlistController],
  providers: [SmartlistService],
  imports: [TypeOrmModule.forFeature([SmartListEntity]), ContainerModule],
})
export class SmartlistModule {}
