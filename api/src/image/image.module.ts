import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { ContainerModule } from 'src/container/container.module';

@Module({
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
